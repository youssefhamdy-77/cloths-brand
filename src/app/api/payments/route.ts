import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { PaymentProof, Order, Product, InventoryMovement } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const proofs = await PaymentProof.find()
      .populate('orderId', 'orderNumber total')
      .sort({ createdAt: -1 });
    return NextResponse.json(proofs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Customer submits payment proof
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { orderId, paymentMethod, transactionReference, senderPhone, amount, screenshotUrl } = body;

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Prevent duplicate payment proof
    const existing = await PaymentProof.findOne({ orderId, status: { $ne: 'Rejected' } });
    if (existing) {
      return NextResponse.json({ error: 'Payment proof already submitted for this order' }, { status: 400 });
    }

    const proof = await PaymentProof.create({
      orderId,
      paymentMethod,
      transactionReference,
      senderPhone,
      amount,
      screenshotUrl,
      status: 'Pending'
    });

    // Update order payment status
    order.paymentStatus = 'Pending Verification';
    await order.save();

    return NextResponse.json(proof, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Admin verifies/rejects payment
export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { proofId, action, reviewedBy } = body;

    const proof = await PaymentProof.findById(proofId);
    if (!proof) {
      return NextResponse.json({ error: 'Payment proof not found' }, { status: 404 });
    }

    if (proof.status !== 'Pending') {
      return NextResponse.json({ error: 'Payment proof already reviewed' }, { status: 400 });
    }

    const order = await Order.findById(proof.orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (action === 'approve') {
      proof.status = 'Approved';
      proof.reviewedBy = reviewedBy;
      proof.reviewedAt = new Date();
      await proof.save();

      order.paymentStatus = 'Paid';
      order.orderStatus = 'Confirmed';
      await order.save();

      // Reduce inventory for each item
      for (const item of order.items) {
        if (item.productId) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.stock = Math.max(0, product.stock - item.quantity);
            await product.save();

            await InventoryMovement.create({
              productId: item.productId,
              type: 'stock_out',
              quantity: item.quantity,
              reason: `Order ${order.orderNumber} confirmed`,
              createdBy: reviewedBy
            });
          }
        }
      }
    } else if (action === 'reject') {
      proof.status = 'Rejected';
      proof.reviewedBy = reviewedBy;
      proof.reviewedAt = new Date();
      await proof.save();

      order.paymentStatus = 'Failed';
      await order.save();
    }

    return NextResponse.json({ success: true, proof, order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

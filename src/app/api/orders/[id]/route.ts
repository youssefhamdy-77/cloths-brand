import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Order, Product, InventoryMovement } from '@/lib/models';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();
    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    const oldStatus = order.orderStatus;

    // Apply updates
    if (body.orderStatus) order.orderStatus = body.orderStatus;
    if (body.paymentStatus) order.paymentStatus = body.paymentStatus;
    if (body.trackingNumber !== undefined) order.trackingNumber = body.trackingNumber;
    if (body.notes !== undefined) order.notes = body.notes;

    // If order confirmed and payment is paid, reduce inventory
    if (body.orderStatus === 'Confirmed' && oldStatus === 'Pending') {
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
              reason: `Order ${order.orderNumber} confirmed`
            });
          }
        }
      }
    }

    // If order cancelled, restore inventory
    if (body.orderStatus === 'Cancelled' && oldStatus !== 'Cancelled') {
      for (const item of order.items) {
        if (item.productId) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.stock += item.quantity;
            await product.save();
            await InventoryMovement.create({
              productId: item.productId,
              type: 'return',
              quantity: item.quantity,
              reason: `Order ${order.orderNumber} cancelled - stock restored`
            });
          }
        }
      }
    }

    await order.save();
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

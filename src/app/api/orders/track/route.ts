import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Order } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const orderNumber = searchParams.get('orderNumber');
    const phone = searchParams.get('phone');

    if (!orderNumber || !phone) {
      return NextResponse.json({ error: 'Order number and phone are required' }, { status: 400 });
    }

    const order = await Order.findOne({
      orderNumber: orderNumber.toUpperCase(),
      'customer.phone': phone
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found. Check your order number and phone.' }, { status: 404 });
    }

    // Build timeline
    const timeline = [];
    timeline.push({ status: 'Order Placed', date: order.createdAt, done: true });

    const statusOrder = ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIdx = statusOrder.indexOf(order.orderStatus);

    if (order.paymentStatus === 'Paid') {
      timeline.push({ status: 'Payment Received', date: order.updatedAt, done: true });
    }

    if (currentIdx >= 1) timeline.push({ status: 'Order Confirmed', date: order.updatedAt, done: true });
    if (currentIdx >= 3) timeline.push({ status: 'Packed', date: order.updatedAt, done: true });
    if (currentIdx >= 4) timeline.push({ status: 'Shipped', date: order.updatedAt, done: true });
    if (currentIdx >= 5) timeline.push({ status: 'Out for Delivery', date: order.updatedAt, done: true });
    if (currentIdx >= 6) timeline.push({ status: 'Delivered', date: order.updatedAt, done: true });

    // Add upcoming steps
    for (let i = Math.max(currentIdx + 1, 1); i < statusOrder.length; i++) {
      if (order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Returned' && order.orderStatus !== 'Refunded') {
        timeline.push({ status: statusOrder[i], done: false });
      }
    }

    if (order.orderStatus === 'Cancelled') {
      timeline.push({ status: 'Cancelled', date: order.updatedAt, done: true });
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      trackingNumber: order.trackingNumber,
      items: order.items,
      total: order.total,
      shippingFee: order.shippingFee,
      timeline,
      createdAt: order.createdAt
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

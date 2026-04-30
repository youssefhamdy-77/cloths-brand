import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Order, InventoryMovement, Product } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    
    let query: any = {};
    if (status) query.orderStatus = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Generate order number
    const count = await Order.countDocuments();
    const orderNumber = `AMB-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;
    
    const newOrder = await Order.create({
      ...body,
      orderNumber,
      orderStatus: 'Pending',
      paymentStatus: 'Pending Verification'
    });

    // We shouldn't reduce inventory immediately for manual payments until verification,
    // but if it's COD or auto-paid, we reduce it.
    // Assuming we do it post-verification for wallets.

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

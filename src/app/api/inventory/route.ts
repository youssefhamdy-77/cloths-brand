import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { InventoryMovement, Product } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const movements = await InventoryMovement.find()
      .populate('productId', 'name sku')
      .sort({ createdAt: -1 })
      .limit(100);
    return NextResponse.json(movements);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { productId, type, quantity, reason, createdBy } = body;

    if (!productId || !type || !quantity) {
      return NextResponse.json({ error: 'productId, type, and quantity are required' }, { status: 400 });
    }

    // Update product stock
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (type === 'stock_in' || type === 'return') {
      product.stock += quantity;
    } else if (type === 'stock_out') {
      if (product.stock < quantity) {
        return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
      }
      product.stock -= quantity;
    } else if (type === 'adjustment') {
      product.stock = quantity; // absolute set
    }

    await product.save();

    const movement = await InventoryMovement.create({
      productId,
      type,
      quantity,
      reason: reason || `${type} operation`,
      createdBy
    });

    return NextResponse.json(movement, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

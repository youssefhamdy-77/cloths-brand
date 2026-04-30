import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { User, Product, Customer, Order, Expense } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    // Check if seed already ran
    const existingUser = await User.findOne({ email: 'admin@amber.com' });
    if (existingUser) {
      return NextResponse.json({ message: 'Seed data already exists. Login: admin@amber.com / Amber@2026' });
    }

    const hashedPassword = await bcrypt.hash('Amber@2026', 12);

    // ── Users ──
    await User.create([
      { name: 'Amber Owner', email: 'admin@amber.com', password: hashedPassword, role: 'Owner' },
      { name: 'Sarah Admin', email: 'sarah@amber.com', password: hashedPassword, role: 'Admin' },
      { name: 'Ahmed Accountant', email: 'ahmed@amber.com', password: hashedPassword, role: 'Accountant' },
      { name: 'Nour Inventory', email: 'nour@amber.com', password: hashedPassword, role: 'Inventory Manager' },
      { name: 'Omar Orders', email: 'omar@amber.com', password: hashedPassword, role: 'Order Manager' },
      { name: 'Viewer Account', email: 'viewer@amber.com', password: hashedPassword, role: 'Viewer' },
    ]);

    // ── Products ──
    const products = await Product.create([
      {
        name: 'Midnight Oversized Hoodie',
        slug: 'midnight-oversized-hoodie',
        category: 'Hoodies',
        description: 'Premium heavyweight cotton oversized hoodie with a relaxed fit.',
        price: 850,
        salePrice: 750,
        costPrice: 320,
        sku: 'AMB-HOD-001',
        images: [],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Navy', 'Charcoal'],
        stock: 45,
        status: 'active'
      },
      {
        name: 'Violet Shadow Jacket',
        slug: 'violet-shadow-jacket',
        category: 'Jackets',
        description: 'Sleek windbreaker jacket with reflective Amber branding.',
        price: 1200,
        costPrice: 480,
        sku: 'AMB-JKT-002',
        images: [],
        sizes: ['M', 'L', 'XL'],
        colors: ['Black', 'Deep Violet'],
        stock: 22,
        status: 'active'
      },
      {
        name: 'Classic Straight Jeans',
        slug: 'classic-straight-jeans',
        category: 'Jeans',
        description: 'Comfort-stretch denim with a straight-leg cut.',
        price: 680,
        costPrice: 250,
        sku: 'AMB-JNS-003',
        images: [],
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Indigo', 'Washed Black'],
        stock: 60,
        status: 'active'
      },
      {
        name: 'Essential Logo Tee',
        slug: 'essential-logo-tee',
        category: 'T-Shirts',
        description: 'Soft-touch cotton tee with embroidered Amber logo.',
        price: 350,
        costPrice: 100,
        sku: 'AMB-TEE-004',
        images: [],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Grey'],
        stock: 120,
        status: 'active'
      },
      {
        name: 'Tech Fleece Sweatpants',
        slug: 'tech-fleece-sweatpants',
        category: 'Sweatpants',
        description: 'Tapered fit fleece joggers with zip pockets.',
        price: 620,
        costPrice: 220,
        sku: 'AMB-SWP-005',
        images: [],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey Marl'],
        stock: 38,
        status: 'active'
      },
      {
        name: 'Neon Edge Cap',
        slug: 'neon-edge-cap',
        category: 'Accessories',
        description: 'Structured cap with neon violet Amber stitching.',
        price: 220,
        costPrice: 65,
        sku: 'AMB-ACC-006',
        images: [],
        sizes: ['One Size'],
        colors: ['Black', 'Navy'],
        stock: 80,
        status: 'active'
      },
      {
        name: 'Urban Cargo Pants',
        slug: 'urban-cargo-pants',
        category: 'Sweatpants',
        description: 'Multi-pocket cargo pants in heavyweight cotton twill.',
        price: 780,
        costPrice: 300,
        sku: 'AMB-CRG-007',
        images: [],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Olive', 'Khaki'],
        stock: 8,
        status: 'active'
      },
      {
        name: 'Phantom Puffer Jacket',
        slug: 'phantom-puffer-jacket',
        category: 'Jackets',
        description: 'Lightweight insulated puffer with matte finish.',
        price: 1450,
        costPrice: 550,
        sku: 'AMB-PUF-008',
        images: [],
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Dark Grey'],
        stock: 0,
        status: 'active'
      }
    ]);

    // ── Customers ──
    const customers = await Customer.create([
      { fullName: 'Ahmed Ali', phone: '01012345678', email: 'ahmed@example.com', addresses: ['Maadi, Cairo'], totalOrders: 3, totalSpent: 2400 },
      { fullName: 'Sara Mohamed', phone: '01098765432', email: 'sara@example.com', addresses: ['Nasr City, Cairo'], totalOrders: 1, totalSpent: 850 },
      { fullName: 'Youssef Hassan', phone: '01155566677', email: 'youssef@example.com', addresses: ['Smouha, Alexandria'], totalOrders: 5, totalSpent: 5200 },
      { fullName: 'Nada Ibrahim', phone: '01200112233', email: 'nada@example.com', addresses: ['Zamalek, Cairo'], totalOrders: 2, totalSpent: 1600 },
    ]);

    // ── Orders ──
    await Order.create([
      {
        orderNumber: 'AMB-2026-0001',
        customer: { fullName: 'Ahmed Ali', phone: '01012345678', email: 'ahmed@example.com', address: 'Maadi, Cairo' },
        customerId: customers[0]._id,
        items: [
          { productId: products[0]._id, name: products[0].name, size: 'L', color: 'Black', price: 750, quantity: 1 },
          { productId: products[3]._id, name: products[3].name, size: 'L', color: 'White', price: 350, quantity: 2 }
        ],
        subtotal: 1450,
        shippingFee: 60,
        discount: 0,
        total: 1510,
        paymentMethod: 'vodafone_cash',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        shippingAddress: 'Maadi, Cairo',
        trackingNumber: 'TRK-EG-88001'
      },
      {
        orderNumber: 'AMB-2026-0002',
        customer: { fullName: 'Sara Mohamed', phone: '01098765432', email: 'sara@example.com', address: 'Nasr City, Cairo' },
        customerId: customers[1]._id,
        items: [
          { productId: products[0]._id, name: products[0].name, size: 'M', color: 'Navy', price: 750, quantity: 1 }
        ],
        subtotal: 750,
        shippingFee: 60,
        discount: 0,
        total: 810,
        paymentMethod: 'instapay',
        paymentStatus: 'Pending Verification',
        orderStatus: 'Pending',
        shippingAddress: 'Nasr City, Cairo'
      },
      {
        orderNumber: 'AMB-2026-0003',
        customer: { fullName: 'Youssef Hassan', phone: '01155566677', email: 'youssef@example.com', address: 'Smouha, Alexandria' },
        customerId: customers[2]._id,
        items: [
          { productId: products[1]._id, name: products[1].name, size: 'L', color: 'Black', price: 1200, quantity: 1 },
          { productId: products[4]._id, name: products[4].name, size: 'L', color: 'Black', price: 620, quantity: 1 }
        ],
        subtotal: 1820,
        shippingFee: 0,
        discount: 100,
        total: 1720,
        paymentMethod: 'vodafone_cash',
        paymentStatus: 'Paid',
        orderStatus: 'Shipped',
        shippingAddress: 'Smouha, Alexandria',
        trackingNumber: 'TRK-EG-88003'
      },
      {
        orderNumber: 'AMB-2026-0004',
        customer: { fullName: 'Nada Ibrahim', phone: '01200112233', email: 'nada@example.com', address: 'Zamalek, Cairo' },
        customerId: customers[3]._id,
        items: [
          { productId: products[5]._id, name: products[5].name, size: 'One Size', color: 'Black', price: 220, quantity: 2 },
          { productId: products[2]._id, name: products[2].name, size: '30', color: 'Indigo', price: 680, quantity: 1 }
        ],
        subtotal: 1120,
        shippingFee: 60,
        discount: 0,
        total: 1180,
        paymentMethod: 'etisalat_cash',
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        shippingAddress: 'Zamalek, Cairo'
      },
      {
        orderNumber: 'AMB-2026-0005',
        customer: { fullName: 'Ahmed Ali', phone: '01012345678', email: 'ahmed@example.com', address: 'Maadi, Cairo' },
        customerId: customers[0]._id,
        items: [
          { productId: products[6]._id, name: products[6].name, size: 'M', color: 'Olive', price: 780, quantity: 1 }
        ],
        subtotal: 780,
        shippingFee: 60,
        discount: 0,
        total: 840,
        paymentMethod: 'cod',
        paymentStatus: 'Unpaid',
        orderStatus: 'Pending',
        shippingAddress: 'Maadi, Cairo'
      }
    ]);

    // ── Expenses ──
    await Expense.create([
      { title: 'Fabric Supplier - March Batch', category: 'Manufacturing', amount: 15000, date: new Date('2026-03-15'), notes: 'Cotton & fleece' },
      { title: 'Shipping Labels & Boxes', category: 'Packaging', amount: 2500, date: new Date('2026-03-20') },
      { title: 'Instagram Ads - March', category: 'Ads', amount: 5000, date: new Date('2026-03-25') },
      { title: 'TikTok Campaign', category: 'Marketing', amount: 3000, date: new Date('2026-04-01') },
      { title: 'Office Rent - April', category: 'Rent', amount: 8000, date: new Date('2026-04-01') },
      { title: 'Shipping Partner Fee', category: 'Shipping', amount: 4200, date: new Date('2026-04-10') },
    ]);

    return NextResponse.json({
      success: true,
      message: 'Seed data created successfully!',
      credentials: {
        email: 'admin@amber.com',
        password: 'Amber@2026'
      },
      summary: {
        users: 6,
        products: 8,
        customers: 4,
        orders: 5,
        expenses: 6
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

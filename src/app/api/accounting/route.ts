import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Order, Expense } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const period = searchParams.get('period') || 'month'; // 'day', 'month', 'year'

    // Get all paid orders
    const paidOrders = await Order.find({ paymentStatus: 'Paid' });
    const allOrders = await Order.find();
    const expenses = await Expense.find();

    const totalRevenue = paidOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
    const totalShipping = paidOrders.reduce((sum: number, o: any) => sum + (o.shippingFee || 0), 0);
    const totalExpenses = expenses.reduce((sum: number, e: any) => sum + (e.amount || 0), 0);
    const totalRefunds = allOrders
      .filter((o: any) => o.paymentStatus === 'Refunded' || o.paymentStatus === 'Partially Refunded')
      .reduce((sum: number, o: any) => sum + (o.total || 0), 0);

    // Revenue by payment method
    const revenueByMethod: Record<string, number> = {};
    for (const order of paidOrders) {
      const method = (order as any).paymentMethod || 'unknown';
      revenueByMethod[method] = (revenueByMethod[method] || 0) + ((order as any).total || 0);
    }

    // Expenses by category
    const expensesByCategory: Record<string, number> = {};
    for (const exp of expenses) {
      const cat = (exp as any).category || 'Other';
      expensesByCategory[cat] = (expensesByCategory[cat] || 0) + ((exp as any).amount || 0);
    }

    // Monthly revenue for chart (last 12 months)
    const monthlyRevenue: { month: string; revenue: number; expenses: number }[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const monthLabel = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

      const monthRev = paidOrders
        .filter((o: any) => new Date(o.createdAt) >= d && new Date(o.createdAt) < nextMonth)
        .reduce((sum: number, o: any) => sum + (o.total || 0), 0);

      const monthExp = expenses
        .filter((e: any) => new Date(e.date) >= d && new Date(e.date) < nextMonth)
        .reduce((sum: number, e: any) => sum + (e.amount || 0), 0);

      monthlyRevenue.push({ month: monthLabel, revenue: monthRev, expenses: monthExp });
    }

    return NextResponse.json({
      totalRevenue,
      totalExpenses,
      grossProfit: totalRevenue - totalExpenses,
      netProfit: totalRevenue - totalExpenses - totalRefunds,
      totalRefunds,
      totalShipping,
      totalOrders: allOrders.length,
      paidOrders: paidOrders.length,
      unpaidOrders: allOrders.filter((o: any) => o.paymentStatus === 'Unpaid' || o.paymentStatus === 'Pending Verification').length,
      revenueByMethod,
      expensesByCategory,
      monthlyRevenue
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

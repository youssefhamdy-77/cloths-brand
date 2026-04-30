import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Expense } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const month = searchParams.get('month');

    let query: any = {};
    if (category) query.category = category;
    if (month) {
      const [year, m] = month.split('-').map(Number);
      query.date = {
        $gte: new Date(year, m - 1, 1),
        $lt: new Date(year, m, 1)
      };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    return NextResponse.json(expenses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const expense = await Expense.create(body);
    return NextResponse.json(expense, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

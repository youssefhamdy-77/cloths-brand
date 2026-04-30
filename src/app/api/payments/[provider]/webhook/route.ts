import { NextRequest, NextResponse } from 'next/server';
import { getPaymentAdapter } from '@/lib/payments/adapters';

// POST /api/payments/instapay/webhook
export async function POST(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  try {
    const { provider } = await params;
    const body = await req.json();

    // Map URL provider name to adapter ID
    const adapterIdMap: Record<string, string> = {
      'instapay': 'instapay',
      'vodafone-cash': 'vodafone_cash',
      'etisalat-cash': 'etisalat_cash',
      'orange-cash': 'orange_cash'
    };

    const adapterId = adapterIdMap[provider];
    if (!adapterId) {
      return NextResponse.json({ error: 'Unknown payment provider' }, { status: 400 });
    }

    const adapter = getPaymentAdapter(adapterId);
    if (!adapter) {
      return NextResponse.json({ error: 'Payment adapter not found' }, { status: 400 });
    }

    // Validate webhook signature (implement per provider when real API keys are available)
    // For now, log the webhook
    console.log(`[WEBHOOK] ${provider}:`, JSON.stringify(body).substring(0, 200));

    const result = await adapter.handleWebhook(body);

    if (result) {
      return NextResponse.json({ success: true, message: 'Webhook processed' });
    } else {
      return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
    }
  } catch (error: any) {
    console.error(`Webhook error:`, error);
    return NextResponse.json({ error: 'Internal webhook error' }, { status: 500 });
  }
}

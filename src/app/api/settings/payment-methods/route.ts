import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const methods = [
    {
      id: 'instapay',
      name: 'InstaPay',
      enabled: true,
      type: 'manual',
      account: process.env.INSTAPAY_MERCHANT || 'amber@instapay',
      instructions: 'Transfer the total amount to our InstaPay IPA. Include your order number in the transfer notes.'
    },
    {
      id: 'vodafone_cash',
      name: 'Vodafone Cash',
      enabled: true,
      type: 'manual',
      account: process.env.VODAFONE_CASH_MERCHANT || '01000000000',
      instructions: 'Send the total amount to our Vodafone Cash number. Take a screenshot as proof of payment.'
    },
    {
      id: 'etisalat_cash',
      name: 'Etisalat Cash',
      enabled: true,
      type: 'manual',
      account: process.env.ETISALAT_CASH_MERCHANT || '01100000000',
      instructions: 'Transfer the total via Etisalat Cash wallet. Upload your receipt as proof.'
    },
    {
      id: 'orange_cash',
      name: 'Orange Cash',
      enabled: true,
      type: 'manual',
      account: process.env.ORANGE_CASH_MERCHANT || '01200000000',
      instructions: 'Send via Orange Cash. Upload your receipt as proof.'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      enabled: true,
      type: 'cod',
      account: '',
      instructions: 'Pay cash when your order arrives at your door.'
    }
  ];

  return NextResponse.json(methods);
}

export interface PaymentProvider {
  id: string;
  name: string;
  type: 'manual' | 'gateway';
  instructions?: string;
  merchantNumber?: string;
  createPayment: (amount: number, orderId: string, phone: string) => Promise<any>;
  verifyPayment: (transactionId: string) => Promise<boolean>;
  handleWebhook: (payload: any) => Promise<boolean>;
}

// Mock Vodafone Cash Adapter
export const vodafoneCashAdapter: PaymentProvider = {
  id: 'vodafone_cash',
  name: 'Vodafone Cash',
  type: 'manual',
  instructions: 'Please transfer the exact order amount to the following Vodafone Cash number. Take a screenshot and upload it as proof.',
  merchantNumber: process.env.VODAFONE_CASH_MERCHANT || '01000000000',
  createPayment: async (amount, orderId, phone) => {
    // In manual mode, we don't call an API. We just return the details for the user.
    return {
      status: 'pending',
      amount,
      phone: process.env.VODAFONE_CASH_MERCHANT || '01000000000',
      message: 'Transfer via Vodafone Cash'
    };
  },
  verifyPayment: async (transactionId) => {
    // For manual mode, this would be done by an admin.
    // If auto gateway, we would call Vodafone API.
    console.log(`Verifying Vodafone Cash tx: ${transactionId}`);
    return true; 
  },
  handleWebhook: async (payload) => {
    // Webhook implementation for Vodafone Cash
    console.log('Received Vodafone Cash webhook:', payload);
    return true;
  }
};

// Mock InstaPay Adapter
export const instapayAdapter: PaymentProvider = {
  id: 'instapay',
  name: 'InstaPay',
  type: 'manual',
  instructions: 'Please transfer the amount to our InstaPay IPA. Include your order number in the transfer notes.',
  merchantNumber: process.env.INSTAPAY_MERCHANT || 'amber@instapay',
  createPayment: async (amount, orderId, phone) => {
    return {
      status: 'pending',
      amount,
      ipa: process.env.INSTAPAY_MERCHANT || 'amber@instapay',
      message: 'Transfer via InstaPay'
    };
  },
  verifyPayment: async (transactionId) => {
    console.log(`Verifying InstaPay tx: ${transactionId}`);
    return true;
  },
  handleWebhook: async (payload) => {
    console.log('Received InstaPay webhook:', payload);
    return true;
  }
};

// Mock Etisalat Cash Adapter
export const etisalatCashAdapter: PaymentProvider = {
  id: 'etisalat_cash',
  name: 'Etisalat Cash',
  type: 'manual',
  instructions: 'Transfer the total amount to our Etisalat Cash number. Upload proof afterwards.',
  merchantNumber: process.env.ETISALAT_CASH_MERCHANT || '01100000000',
  createPayment: async (amount, orderId, phone) => {
    return { status: 'pending', amount };
  },
  verifyPayment: async (transactionId) => true,
  handleWebhook: async (payload) => true
};

// Mock Orange Cash Adapter
export const orangeCashAdapter: PaymentProvider = {
  id: 'orange_cash',
  name: 'Orange Cash',
  type: 'manual',
  instructions: 'Transfer the total amount to our Orange Cash number. Upload proof afterwards.',
  merchantNumber: process.env.ORANGE_CASH_MERCHANT || '01200000000',
  createPayment: async (amount, orderId, phone) => {
    return { status: 'pending', amount };
  },
  verifyPayment: async (transactionId) => true,
  handleWebhook: async (payload) => true
};

export const getPaymentAdapter = (methodId: string): PaymentProvider | null => {
  switch (methodId) {
    case 'vodafone_cash': return vodafoneCashAdapter;
    case 'instapay': return instapayAdapter;
    case 'etisalat_cash': return etisalatCashAdapter;
    case 'orange_cash': return orangeCashAdapter;
    default: return null;
  }
};

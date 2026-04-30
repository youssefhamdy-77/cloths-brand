import mongoose, { Schema } from 'mongoose';

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Owner', 'Admin', 'Accountant', 'Inventory Manager', 'Order Manager', 'Viewer'], default: 'Viewer' }
}, { timestamps: true });

// Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  costPrice: { type: Number, required: true },
  sku: { type: String },
  barcode: { type: String },
  images: [{ type: String }],
  sizes: [{ type: String }], // S, M, L, XL, XXL
  colors: [{ type: String }],
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

// Inventory Movement Schema
const InventoryMovementSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: String },
  type: { type: String, enum: ['stock_in', 'stock_out', 'return', 'adjustment'], required: true },
  quantity: { type: Number, required: true },
  reason: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Customer Schema
const CustomerSchema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  addresses: [{ type: String }],
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastOrderDate: { type: Date },
  notes: { type: String }
}, { timestamps: true });

// Order Schema
const OrderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    fullName: String,
    phone: String,
    email: String,
    address: String
  },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    variantId: String,
    size: String,
    color: String,
    price: Number,
    quantity: Number
  }],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Unpaid', 'Pending Verification', 'Paid', 'Failed', 'Refunded', 'Partially Refunded'], default: 'Unpaid' },
  orderStatus: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned', 'Refunded'], default: 'Pending' },
  shippingAddress: { type: String },
  trackingNumber: { type: String },
  notes: { type: String }
}, { timestamps: true });

// Payment Proof Schema
const PaymentProofSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, required: true },
  transactionReference: { type: String },
  senderPhone: { type: String },
  amount: { type: Number, required: true },
  screenshotUrl: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date }
}, { timestamps: true });

// Expense Schema
const ExpenseSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Manufacturing', 'Shipping', 'Packaging', 'Marketing', 'Ads', 'Salaries', 'Rent', 'Utilities', 'Software', 'Other'], required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String },
  date: { type: Date, default: Date.now },
  notes: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Export Models safely
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const InventoryMovement = mongoose.models.InventoryMovement || mongoose.model('InventoryMovement', InventoryMovementSchema);
export const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export const PaymentProof = mongoose.models.PaymentProof || mongoose.model('PaymentProof', PaymentProofSchema);
export const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

# Amber Management System

Complete business management system for the Amber clothing brand.

## Features

- 🔐 **Auth**: JWT-based login with role-based access (Owner, Admin, Accountant, Inventory Manager, Order Manager, Viewer)
- 👕 **Products**: Full catalog management with categories, sizes, colors, pricing
- 📦 **Inventory**: Stock tracking with movement history and low-stock alerts
- 🛒 **Orders**: Complete order lifecycle management with status tracking
- 👥 **Customers**: Customer database with order history
- 💳 **Payments**: Egyptian payment integration (InstaPay, Vodafone Cash, Etisalat Cash, Orange Cash) with manual verification flow
- 📊 **Accounting**: Revenue, expenses, profit tracking with category breakdowns
- ⚙️ **Settings**: Store config, payment methods, team management
- 📍 **Order Tracking**: Customer-facing tracking page at `/order-tracking`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Auth**: JWT (jose library)
- **UI**: Tailwind CSS 4 + custom dark theme
- **Icons**: Lucide React

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up MongoDB
Make sure MongoDB is running locally on port 27017, or update `MONGODB_URI` in `.env.local`.

### 3. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 4. Start the dev server
```bash
npm run dev
```

### 5. Seed demo data
Open your browser and make a POST request to:
```
POST http://localhost:3000/api/seed
```
Or use curl:
```bash
curl -X POST http://localhost:3000/api/seed
```

### 6. Login
Navigate to `http://localhost:3000/login`

**Demo credentials:**
- Email: `admin@amber.com`
- Password: `Amber@2026`

## Dashboard Pages

| Route | Description |
|-------|-------------|
| `/login` | Admin login |
| `/dashboard` | Overview with stats, charts, alerts |
| `/dashboard/products` | Product catalog management |
| `/dashboard/inventory` | Stock levels & movement history |
| `/dashboard/orders` | Order management |
| `/dashboard/orders/:id` | Single order detail & status control |
| `/dashboard/customers` | Customer database |
| `/dashboard/payments` | Payment proof verification |
| `/dashboard/accounting` | Financial overview & expenses |
| `/dashboard/settings` | Store, payments, users, security config |
| `/order-tracking` | Customer-facing order tracking |

## API Endpoints

### Public (for website integration)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:slug` | Get single product |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/track` | Track order by number + phone |
| POST | `/api/payments` | Submit payment proof |
| GET | `/api/settings/payment-methods` | List payment methods |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET/POST | `/api/products` | List/create products |
| PUT/DELETE | `/api/products/:slug` | Update/delete product |
| GET/POST | `/api/orders` | List/create orders |
| GET/PATCH | `/api/orders/:id` | Get/update order |
| GET/POST | `/api/customers` | List/create customers |
| GET/POST | `/api/inventory` | List movements/add stock |
| GET/POST | `/api/expenses` | List/create expenses |
| GET/PATCH | `/api/payments` | List proofs/verify payment |
| GET | `/api/accounting` | Financial summary |
| POST | `/api/seed` | Seed demo data |

### Webhooks
| Method | Endpoint |
|--------|----------|
| POST | `/api/payments/instapay/webhook` |
| POST | `/api/payments/vodafone-cash/webhook` |
| POST | `/api/payments/etisalat-cash/webhook` |
| POST | `/api/payments/orange-cash/webhook` |

## User Roles

| Role | Access |
|------|--------|
| Owner | Full access to everything |
| Admin | Products, orders, customers, inventory, payments, settings |
| Accountant | Orders (read), payments (read), accounting, expenses, reports |
| Inventory Manager | Products (read), inventory management |
| Order Manager | Orders, customers (read), payments (read) |
| Viewer | Dashboard read-only |

## Payment Flow

1. Customer selects payment method at checkout
2. System shows payment instructions (account number, etc.)
3. Customer sends payment via mobile wallet
4. Customer uploads payment screenshot / enters transaction ref
5. Order created with status: `Pending Verification`
6. Admin reviews payment proof in dashboard
7. Admin approves → Order confirmed, inventory reduced
8. Admin rejects → Payment marked failed

## Design Theme

Dark futuristic SaaS aesthetic:
- Background: `#030306`
- Surface: `#070718`
- Panel: `#10102C`
- Primary: `#5B3CFF`
- Neon: `#6D4CFF`
- Text: `#F5F7FF`
- Muted: `#A5A7C8`

# BridgeStay Analytics

A comprehensive SaaS platform for real estate investment analysis, built with React, TypeScript, Tailwind CSS, Supabase, and Stripe.

## 🚀 Features

### Core Functionality
- **Property Investment Calculator**: Analyze rental property ROI, cash flow, and profitability metrics
- **Interactive Charts**: Visualize amortization schedules and cash flow projections
- **PDF Export**: Generate professional investment reports with print-optimized layouts
- **Data Persistence**: Save and manage property analyses with Supabase

### SaaS Features
- **User Authentication**: Secure sign-up/sign-in with Supabase Auth
- **Subscription Management**: Monthly plans with Stripe integration
- **Dashboard**: Centralized view of all property analyses
- **Data Storage**: Zillow/Census data snapshots for market insights

### Technical Features
- **Modern Stack**: React 19, TypeScript, Tailwind CSS v4, Vite
- **State Management**: Zustand for client-side state
- **Routing**: React Router for SPA navigation
- **API**: Netlify Functions for serverless backend
- **Database**: Supabase with Row Level Security (RLS)
- **Payments**: Stripe Checkout and Customer Portal

## 📁 Project Structure

```
bridgestay-analytics/
├── src/
│   ├── components/           # React components
│   │   ├── AuthForm.tsx      # Authentication UI
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── PropertyCalculator.tsx  # Calculator component
│   │   ├── SubscriptionPlans.tsx   # Pricing plans
│   │   ├── AmortizationChart.tsx   # Charts
│   │   └── PrintExportButton.tsx   # PDF export
│   ├── lib/                  # Utility libraries
│   │   ├── supabase.ts       # Supabase client & types
│   │   ├── stripe.ts         # Stripe configuration
│   │   └── format.ts         # Data formatting utilities
│   ├── stores/               # State management
│   │   └── auth.ts           # Authentication store
│   ├── types/                # TypeScript definitions
│   │   └── results.ts        # Calculator result types
│   ├── utils/                # Business logic
│   │   └── calculations.ts   # ROI calculation engine
│   ├── App.tsx               # Main app component
│   └── main.tsx              # App entry point
├── netlify/
│   └── functions/            # Serverless API endpoints
│       ├── create-checkout-session.ts
│       ├── create-portal-session.ts
│       └── stripe-webhook.ts
├── supabase-schema.sql       # Database schema
├── netlify.toml              # Netlify configuration
└── env.example               # Environment variables template
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 20+
- npm or yarn
- Supabase account
- Stripe account
- Netlify account

### 1. Clone and Install
```bash
git clone <repository-url>
cd bridgestay-analytics
npm install
```

### 2. Environment Setup
```bash
cp env.example .env.local
```

Update `.env.local` with your credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_APP_URL=http://localhost:8888
```

### 3. Database Setup
1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql`
3. Enable Row Level Security (RLS) policies
4. Set up authentication providers

### 4. Stripe Configuration
1. Create Stripe products and prices for subscription plans
2. Update `SUBSCRIPTION_PLANS` in `src/lib/stripe.ts` with your price IDs
3. Set up webhook endpoints for subscription events
4. Configure environment variables in Netlify

### 5. Development
```bash
# Start development server
npm run dev

# Start with Netlify Functions (recommended)
npm run netlify:dev
```

## 🚀 Deployment

### Netlify Deployment
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production
```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_production_stripe_publishable_key
VITE_APP_URL=https://your-domain.netlify.app
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 💳 Subscription Plans

### Basic Plan - $29/month
- Up to 10 property analyses per month
- Basic market data
- PDF report export
- Email support

### Pro Plan - $79/month
- Unlimited property analyses
- Advanced market data & trends
- Zillow integration
- Census data access
- Priority support
- Custom report templates

### Enterprise Plan - $199/month
- Everything in Pro
- Team collaboration
- White-label reports
- API access
- Custom integrations
- Dedicated account manager

## 🔧 API Endpoints

### Netlify Functions
- `POST /.netlify/functions/create-checkout-session` - Create Stripe checkout session
- `POST /.netlify/functions/create-portal-session` - Create Stripe customer portal session
- `POST /.netlify/functions/stripe-webhook` - Handle Stripe webhooks

### Supabase Tables
- `users` - User profiles and subscription status
- `property_snapshots` - Saved property analyses
- `subscriptions` - Stripe subscription data

## 🎨 UI/UX Features

### Print/Export Optimization
- Modern CSS `break-inside: avoid` for clean page breaks
- Print-optimized layouts with A4 sizing
- Comprehensive color normalization for PDF export
- Responsive design for all screen sizes

### Authentication Flow
- Clean sign-in/sign-up forms
- Password reset functionality
- Protected routes with automatic redirects
- Persistent authentication state

### Dashboard Experience
- Property analysis history
- Quick action cards
- Subscription status overview
- Responsive data tables

## 🔒 Security

- Row Level Security (RLS) in Supabase
- Environment variable protection
- Secure authentication with Supabase Auth
- Stripe webhook signature verification
- CORS configuration for API endpoints

## 📊 Analytics & Monitoring

- User subscription tracking
- Property analysis usage metrics
- Stripe payment analytics
- Error logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@bridgestay-analytics.com or join our Discord community.

---

Built with ❤️ using React, TypeScript, Tailwind CSS, Supabase, and Stripe.
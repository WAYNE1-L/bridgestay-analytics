# BridgeStay ROI Calculator

A rental property calculator built with React, TypeScript, Vite, and Tailwind CSS. Quickly evaluate rental property deals with comprehensive KPIs, interactive charts, and PDF export capabilities.

## Features

### ✅ Complete Feature Set
- [x] **Branding & Favicon** - BridgeStay logo, custom favicon, updated title
- [x] **Types & Formatters** - Extracted result types and currency/percent formatters
- [x] **Interactive Charts** - Recharts showing principal, interest, and cash flow trends
- [x] **PDF Export** - Multi-page PDF export with high-quality rendering
- [x] **Input Icons** - Semantic icons for better UX and visual clarity

### Key Calculations
- Monthly cash flow analysis
- Mortgage payment calculations
- Net Operating Income (NOI)
- Cash-on-cash return percentage
- Cap rate analysis
- 5-year annualized return projection
- Complete amortization schedule
- Expense breakdown (fixed vs variable)

### Technical Features
- Responsive design (mobile-first)
- Interactive charts with tooltips
- PDF export with pagination
- Type-safe calculations
- Accessible form inputs with icons
- Tree-shakeable dependencies

## How to Run

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Type Checking & Linting
```bash
npm run check
```

## Manual QA Checklist

### ✅ Layout & Responsiveness
- [x] Header displays BridgeStay logo and title correctly
- [x] Mobile layout (360px width) renders properly
- [x] Input form is responsive on small screens
- [x] Results panel adapts to different screen sizes
- [x] Chart is responsive and maintains aspect ratio

### ✅ Functionality
- [x] All input fields accept numeric values
- [x] Calculations update in real-time as inputs change
- [x] Chart renders with 12 data points (first year)
- [x] Chart shows 3 lines: principal (blue), interest (red), cash flow (green)
- [x] Chart tooltips display formatted currency values
- [x] PDF export button works and shows loading state
- [x] PDF includes header logo, chart, and KPI table
- [x] PDF file size is reasonable (≤ 2-3 MB)
- [x] PDF filename includes current date (YYYYMMDD format)

### ✅ Edge Cases & Validation
- [x] Empty input fields default to 0 (no crashes)
- [x] Invalid numeric inputs are handled gracefully
- [x] Negative values are processed correctly
- [x] Very large numbers don't break the UI
- [x] Chart handles edge cases (zero values, negative cash flow)

### ✅ Accessibility
- [x] Form labels are properly associated with inputs
- [x] Icons are hidden from screen readers (`aria-hidden="true"`)
- [x] Color contrast meets accessibility standards
- [x] Keyboard navigation works for all interactive elements
- [x] Focus states are visible and clear

### ✅ Performance
- [x] Initial page load is fast (< 2 seconds)
- [x] Chart renders smoothly without lag
- [x] PDF generation completes within 5 seconds
- [x] No memory leaks during extended use
- [x] Bundle size remains reasonable

## Known Limitations

- **Node.js Version**: Requires Node.js 20.19+ or 22.12+ (current: 20.17.0)
- **PDF Export**: Limited to visible content in the results section
- **Chart Data**: Shows first 12 months only for clarity
- **Currency**: Hardcoded to USD formatting
- **Validation**: Basic numeric validation only (no business rule validation)

## Technical Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **PDF Export**: jsPDF + html2canvas
- **Icons**: Lucide React
- **Build**: Vite with SWC
- **Linting**: ESLint + TypeScript ESLint

## Project Structure

```
src/
├── components/
│   ├── AmortizationChart.tsx    # Interactive chart component
│   └── PdfExportButton.tsx      # PDF export functionality
├── lib/
│   └── format.ts                # Currency/percent formatters
├── types/
│   └── results.ts               # TypeScript interfaces
├── utils/
│   └── calculations.ts          # Core calculation logic
├── App.tsx                      # Main application component
├── main.tsx                     # React entry point
└── index.css                    # Tailwind CSS imports
```

## Deployment

### Static Hosting
The app uses relative asset paths and is ready for static hosting on:
- Netlify
- Vercel
- GitHub Pages
- Any CDN

### One-line Deploy Commands
```bash
# Netlify
npx netlify-cli deploy --prod --dir=dist

# Vercel
npx vercel --prod

# GitHub Pages (via GitHub Actions)
# See .github/workflows/deploy.yml
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes and test thoroughly
4. Run `npm run check` to ensure no TypeScript/ESLint errors
5. Commit with conventional commits: `feat: add new feature`
6. Push and create a Pull Request

## License

MIT License - see LICENSE file for details.

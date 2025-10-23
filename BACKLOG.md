# BridgeStay Analytics - Development Backlog

## Status: ACTIVE DEVELOPMENT
- **Build**: ✅ Passing
- **Tests**: ✅ 42/42 passing
- **TypeScript**: ❌ 76 errors, 3 warnings
- **Dev Server**: ✅ Running

## Critical Issues (Fix First)
1. **TypeScript Errors**: 76 errors need fixing - mostly `any` types and unused imports
2. **Linting Issues**: Unused variables, missing dependencies, empty interfaces
3. **Error Boundaries**: Need proper error handling throughout app
4. **Type Safety**: Replace all `any` types with proper TypeScript

## Completed Tasks ✅
- [x] Web Worker for ROI calculations (`calcWorker.ts`)
- [x] Pure calculation functions (`calc.ts`)
- [x] Debounced input with memoization (`useCalcWorker.ts`)
- [x] NumberInput component with validation
- [x] Basic test coverage (42 tests passing)
- [x] Build pipeline working

## High Priority Tasks (Next)
1. **T1: Error Boundaries** - Add AppErrorBoundary and ErrorElement
2. **T2: Type Safety** - Fix all TypeScript errors, remove `any` types
3. **T3: Cleanup** - Remove unused imports and dead code
4. **T4: Schema Validation** - Centralize Zod schema with proper types
5. **T5: Export Functionality** - Fix PDF export with proper error handling

## Medium Priority Tasks
6. **T6: Charts & A11y** - Lazy load charts, add reduced motion support
7. **T7: Formatting** - Single source of truth for `usd()` and `pct()`
8. **T8: Share & Persist** - URL encoding and localStorage versioning
9. **T9: Analytics** - Lightweight analytics shim
10. **T10: UX Polish** - Multi-step wizard, sample data, dark mode

## Low Priority Tasks
11. **T11: Tests & CI** - Playwright e2e tests, GitHub Actions
12. **T12: Documentation** - README, keyboard shortcuts, assumptions
13. **T13: Performance** - Bundle analysis, lazy loading optimization
14. **T14: Accessibility** - Full a11y audit, keyboard navigation

## Technical Debt
- Multiple duplicate pages (RoiPage vs RoiPageEnhanced)
- Unused components and imports throughout codebase
- Inconsistent error handling patterns
- Missing proper TypeScript interfaces
- No proper error boundaries

## Architecture Decisions
- ✅ Web Workers for heavy calculations
- ✅ Pure functions for calculations
- ✅ Debounced input with memoization
- ✅ Zod for schema validation
- ✅ Tailwind for styling
- ✅ Recharts for data visualization
- ✅ Vite for build tooling

## Next Actions
1. Fix TypeScript errors (remove `any`, unused imports)
2. Add proper error boundaries
3. Clean up duplicate code
4. Implement proper type safety
5. Add comprehensive error handling

---
*Last Updated: 2024-12-19*
*Status: Active development - focusing on type safety and error handling*

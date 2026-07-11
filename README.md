# Six Jars Calculator

Split your income across the six jars of the classic money-management method
(T. Harv Eker): **Necessities**, **Long Term Savings**, **Financial Freedom**,
**Education**, **Play**, and **Give**. Enter your income, tune the percentages,
and see the allocation per jar with a live summary and pie chart.

Built with [Next.js](https://nextjs.org) (App Router), React Hook Form + Zod,
Tailwind CSS, [shadcn/ui](https://ui.shadcn.com), and Recharts.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tests

End-to-end tests run with [Playwright](https://playwright.dev):

```bash
pnpm exec playwright install chromium   # first time only
pnpm test:e2e
```

## Other Scripts

```bash
pnpm lint    # ESLint
pnpm build   # production build
pnpm start   # serve the production build
```

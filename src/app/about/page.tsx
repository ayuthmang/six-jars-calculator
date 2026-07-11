import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JARS } from "@/components/six-jars/jars";
import { toDisplay, toFixed } from "@/utils/number";
import { Reveal } from "@/components/about/reveal";
import { JarSplitDemo } from "@/components/about/jar-split-demo";
import { GoldenGooseDemo } from "@/components/about/golden-goose-demo";

export const metadata: Metadata = {
  title: "Why Six Jars? — the method behind the calculator",
  description:
    "Why splitting your income into six jars beats budgeting apps you abandon: the story of the six jars method and why this calculator exists.",
};

const enter =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 motion-reduce:animate-none";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-20 sm:gap-24">
        {/* Hero */}
        <section className="flex flex-col items-center gap-6 pt-8 text-center sm:pt-16">
          <div className={enter}>
            <div className="flex items-center justify-center gap-2">
              {JARS.map((jar) => (
                <span
                  key={jar.key}
                  aria-hidden
                  className="size-3 rounded-full"
                  style={{ background: jar.color }}
                />
              ))}
            </div>
          </div>
          <h1
            className={`max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl ${enter} delay-150`}
          >
            It&apos;s not about how much you make.
          </h1>
          <p
            className={`text-muted-foreground max-w-2xl text-lg text-balance ${enter} delay-300`}
          >
            It&apos;s about what you do with it. The six jars method turns that
            cliché into a five-minute habit: before you spend anything, every
            part of your income gets one job.
          </p>
          <div className={`flex flex-wrap justify-center gap-3 ${enter} delay-500`}>
            <Button asChild size="lg">
              <Link href="/">Open the calculator</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#the-jars">Meet the jars ↓</a>
            </Button>
          </div>
        </section>

        {/* The problem */}
        <Reveal>
          <section className="mx-auto flex max-w-2xl flex-col gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              Money without a job leaks
            </h2>
            <p className="text-muted-foreground leading-7">
              Parkinson&apos;s law applies to wallets: spending expands to fill
              the income available. A raise arrives, lifestyle quietly rises to
              meet it, and at the end of the month the balance looks exactly
              like last year&apos;s. Most budgets try to fix this with
              discipline alone — tracking every coffee, feeling guilty about
              every treat — and that&apos;s precisely why they get abandoned by
              February.
            </p>
          </section>
        </Reveal>

        {/* The idea */}
        <Reveal>
          <section className="mx-auto flex max-w-2xl flex-col gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              Six jars, one habit
            </h2>
            <p className="text-muted-foreground leading-7">
              In <em>Secrets of the Millionaire Mind</em>, T. Harv Eker proposed
              something almost insultingly simple: split every income into six
              jars, each with a single purpose. Not because the percentages are
              magic — because the <strong className="text-foreground">split</strong>{" "}
              is a habit you can actually keep. One jar you may never spend,
              and it quietly buys your freedom. One jar you{" "}
              <strong className="text-foreground">must</strong> empty on fun, and
              it keeps the whole system humane.
            </p>
          </section>
        </Reveal>

        {/* The jars */}
        <Reveal>
          <section id="the-jars" className="flex flex-col gap-6 scroll-mt-24">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight">The six jars</h2>
              <p className="text-muted-foreground">
                The classic split — every percentage is yours to tune.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {JARS.map((jar, index) => (
                <Reveal key={jar.key} delay={index * 75}>
                  <div className="flex h-full flex-col gap-2 rounded-xl border p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold">{jar.label}</h3>
                      <span className="bg-muted flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums">
                        <span
                          aria-hidden
                          className="size-2 rounded-full"
                          style={{ background: jar.color }}
                        />
                        {toDisplay(toFixed(jar.share * 100))}%
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-6">
                      {jar.why}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Interactive split */}
        <Reveal>
          <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight">
                See it split
              </h2>
              <p className="text-muted-foreground">
                Drag an income. Watch every part of it find its place.
              </p>
            </div>
            <div className="rounded-xl border p-5 sm:p-6">
              <JarSplitDemo />
            </div>
          </section>
        </Reveal>

        {/* Golden goose */}
        <Reveal>
          <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight">
                The golden goose
              </h2>
              <p className="text-muted-foreground text-balance">
                The Financial Freedom jar is the one you never spend. Invested
                month after month, it stops being savings and starts being a
                machine that pays you.
              </p>
            </div>
            <div className="rounded-xl border p-5 sm:p-6">
              <GoldenGooseDemo />
            </div>
          </section>
        </Reveal>

        {/* Why this app */}
        <Reveal>
          <section className="mx-auto flex max-w-2xl flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold tracking-tight">
                Why this calculator exists
              </h2>
              <p className="text-muted-foreground leading-7">
                The method is simple; the arithmetic is friction. Every payday
                means six multiplications and a &ldquo;wait, did I put 12% on
                education?&rdquo;. This little tool does the boring part: it
                remembers your ratios, recalculates as you type, and tells you
                at a glance when your jars don&apos;t add up to 100%.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              <li className="flex flex-col gap-1 rounded-xl border p-4">
                <span className="font-semibold">Instant</span>
                <span className="text-muted-foreground text-sm">
                  Sliders, live totals, a chart that answers before you finish
                  asking.
                </span>
              </li>
              <li className="flex flex-col gap-1 rounded-xl border p-4">
                <span className="font-semibold">Private</span>
                <span className="text-muted-foreground text-sm">
                  No account, no tracking. Your numbers live in your browser
                  and nowhere else.
                </span>
              </li>
              <li className="flex flex-col gap-1 rounded-xl border p-4">
                <span className="font-semibold">Yours</span>
                <span className="text-muted-foreground text-sm">
                  The classic split is a starting point, not a law. Tune every
                  jar to your life.
                </span>
              </li>
            </ul>
          </section>
        </Reveal>

        {/* Footer CTA */}
        <Reveal>
          <section className="flex flex-col items-center gap-4 pb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-balance">
              Start with the classic 55 / 10 / 10 / 10 / 10 / 5
            </h2>
            <Button asChild size="lg">
              <Link href="/">Open the calculator</Link>
            </Button>
            <p className="text-muted-foreground max-w-md text-xs">
              Percentages from T. Harv Eker&apos;s{" "}
              <em>Secrets of the Millionaire Mind</em>. This site isn&apos;t
              affiliated with or endorsed by him — we just like jars.
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}

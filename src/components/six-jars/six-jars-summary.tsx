"use client";
import { toDisplay } from "@/utils/number";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TypographyP } from "../ui/typography";
import { SixJarsSummaryPieChart } from "./six-jars-summary-pie-chart";
import { useSixJarsContext } from "./six-jars-provider";

export function SixJarsSummary() {
  const { state } = useSixJarsContext();
  const {
    necessities,
    education,
    longTermSavings,
    financialFreedom,
    play,
    give,
    total,
  } = state.summary;

  const chartData = [
    { key: "necessities", value: necessities },
    { key: "longTermSavings", value: longTermSavings },
    { key: "education", value: education },
    { key: "financialFreedom", value: financialFreedom },
    { key: "play", value: play },
    { key: "give", value: give },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Summary</CardTitle>
        <CardDescription>
          This is how you should allocate your income.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 [&>div]:flex-1 lg:flex-col">
            <SixJarsSummaryPieChart chartData={chartData} />
            <div className="container mx-auto flex flex-col gap-4">
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>
                    Necessities: {toDisplay(necessities)}
                  </TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>
                    Long Term Savings: {toDisplay(longTermSavings)}
                  </TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>Education: {toDisplay(education)}</TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>
                    Financial Freedom: {toDisplay(financialFreedom)}
                  </TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>Play: {toDisplay(play)}</TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>Give: {toDisplay(give)}</TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP className="font-bold">
                    Total: {total}
                  </TypographyP>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { formatToNaira } from "@/utils/helper";

const data = [
  { month: "Jan", revenue: 500 },
  { month: "Feb", revenue: 1000 },
  { month: "Mar", revenue: 750 },
  { month: "Apr", revenue: 1200 },
  { month: "May", revenue: 900 },
  { month: "Jun", revenue: 1400 },
  { month: "Jul", revenue: 1100 },
  { month: "Aug", revenue: 789 },
  { month: "Sep", revenue: 1000 },
  { month: "Oct", revenue: 1300 },
  { month: "Nov", revenue: 950 },
  { month: "Dec", revenue: 1050 },
];

const CustomizedDot = (props: any) => {
  const { cx, cy, chartHeight } = props;

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={chartHeight}
        stroke="#E5E7EB"
        strokeDasharray="3 3"
      />
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#6BBF47"
        stroke="#6BBF47"
        strokeWidth={2}
      />
    </g>
  );
};

export default function RevenueChart() {
  const [filter, setFilter] = useState("This Year");
  const chartRef = useRef<any>(null);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    if (chartRef.current) {
      const height = chartRef.current.offsetHeight;
      setChartHeight(height);
    }
  }, []);

  return (
    <div className="col-span-8">
      <Card className="w-full h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold font-satoshi leading-6">
            Monthly revenue
          </CardTitle>
          <Button
            variant="outline"
            className="bg-green-100 rounded-full text-green-900 hover:bg-green-200"
            onClick={() =>
              setFilter(filter === "This Year" ? "Today" : "This Year")
            }
          >
            {filter}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[400px]" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 15, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis width={0} axisLine={false} tickLine={false} tick={false} />
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (
                    active &&
                    payload &&
                    payload.length > 0 &&
                    payload[0].value !== undefined
                  ) {
                    return (
                      <div className="rounded-full bg-lemon py-1 px-4 font-semibold shadow-sm">
                        <span className="text-white">
                          {formatToNaira(+payload[0].value)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={1.5}
                stroke="#000000"
                dot={<CustomizedDot chartHeight={chartHeight} />}
                activeDot={{
                  r: 5,
                  fill: "#6BBF47",
                  stroke: "#6BBF47",
                  strokeWidth: 2,
                }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

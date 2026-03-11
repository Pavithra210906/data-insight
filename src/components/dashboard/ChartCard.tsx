import { useRef } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend,
} from "recharts";
import { Download, X, Sparkles, Code2 } from "lucide-react";
import html2canvas from "html2canvas";
import type { ChartResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const COLORS = [
  "hsl(165, 80%, 48%)",
  "hsl(260, 70%, 60%)",
  "hsl(35, 90%, 55%)",
  "hsl(200, 80%, 55%)",
  "hsl(340, 70%, 55%)",
  "hsl(120, 60%, 45%)",
  "hsl(280, 60%, 50%)",
  "hsl(15, 85%, 55%)",
];

interface ChartCardProps {
  chart: ChartResult;
  onRemove: (id: string) => void;
  index: number;
}

export function ChartCard({ chart, onRemove, index }: ChartCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showSQL, setShowSQL] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "hsl(230, 22%, 10%)",
    });
    const link = document.createElement("a");
    link.download = `${chart.title.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const renderChart = () => {
    const commonProps = {
      data: chart.data,
      margin: { top: 10, right: 20, left: 0, bottom: 0 },
    };

    switch (chart.chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 18%, 18%)" />
            <XAxis dataKey={chart.xKey} tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(230, 22%, 12%)",
                border: "1px solid hsl(230, 18%, 22%)",
                borderRadius: "8px",
                fontSize: 12,
              }}
            />
            <Legend />
            {chart.yKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 18%, 18%)" />
            <XAxis dataKey={chart.xKey} tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(230, 22%, 12%)",
                border: "1px solid hsl(230, 18%, 22%)",
                borderRadius: "8px",
                fontSize: 12,
              }}
            />
            <Legend />
            {chart.yKeys.map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 18%, 18%)" />
            <XAxis dataKey={chart.xKey} tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(220, 15%, 55%)", fontSize: 11 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(230, 22%, 12%)",
                border: "1px solid hsl(230, 18%, 22%)",
                borderRadius: "8px",
                fontSize: 12,
              }}
            />
            <Legend />
            {chart.yKeys.map((key, i) => (
              <Area key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.15} strokeWidth={2} />
            ))}
          </AreaChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={chart.data}
              dataKey={chart.yKeys[0]}
              nameKey={chart.xKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={2}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chart.data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(230, 22%, 12%)",
                border: "1px solid hsl(230, 18%, 22%)",
                borderRadius: "8px",
                fontSize: 12,
              }}
            />
          </PieChart>
        );
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass rounded-xl overflow-hidden shadow-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <h3 className="text-sm font-display font-semibold text-foreground">{chart.title}</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">"{chart.query}"</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => setShowSQL(!showSQL)}
          >
            <Code2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={handleDownload}
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(chart.id)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* SQL */}
      {showSQL && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mx-4 mb-2 p-2 rounded-md bg-background/50 border border-border/50"
        >
          <code className="text-[10px] text-muted-foreground font-mono break-all">{chart.sql}</code>
        </motion.div>
      )}

      {/* Chart */}
      <div className="px-4 pb-2 h-64">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Insight */}
      <div className="px-4 pb-4">
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/10">
          <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">{chart.insight}</p>
        </div>
      </div>
    </motion.div>
  );
}

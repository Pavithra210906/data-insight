import { motion } from "framer-motion";
import { BarChart3, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ChartCard } from "./ChartCard";
import { LoadingOverlay } from "./LoadingOverlay";

export function Dashboard() {
  const { charts, loadingStep, removeChart, dataset } = useAppStore();

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <LoadingOverlay currentStep={loadingStep} />

      {charts.length === 0 && !loadingStep && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
        >
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
            {dataset ? (
              <Sparkles className="h-7 w-7 text-primary-foreground" />
            ) : (
              <BarChart3 className="h-7 w-7 text-primary-foreground" />
            )}
          </div>
          <h2 className="text-xl font-display font-semibold mb-2">
            {dataset ? "Ready to analyze" : "Welcome to AI Dashboard Studio"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            {dataset
              ? "Ask a question about your data to generate interactive charts and insights."
              : "Upload a CSV dataset to get started. Then ask questions in natural language to generate dashboards."}
          </p>
        </motion.div>
      )}

      {charts.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {charts.map((chart, i) => (
            <ChartCard
              key={chart.id}
              chart={chart}
              onRemove={removeChart}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useCallback } from "react";
import { Navbar } from "@/components/dashboard/Navbar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { ChatInput } from "@/components/dashboard/ChatInput";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { useAppStore } from "@/lib/store";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { ChartResult } from "@/lib/types";

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const { dataset, rawData, addChart, addToHistory, setLoadingStep } = useAppStore();

  const handleQuery = useCallback(
    async (query: string) => {
      if (!dataset) return;

      addToHistory(query);
      setLoadingStep("analyzing");

      try {
        await new Promise((r) => setTimeout(r, 600));
        setLoadingStep("generating");

        const { data, error } = await supabase.functions.invoke("analyze-data", {
          body: {
            query,
            columns: dataset.columns,
            sampleRows: dataset.sampleRows,
            rowCount: dataset.rowCount,
          },
        });

        if (error) throw error;

        await new Promise((r) => setTimeout(r, 400));
        setLoadingStep("building");

        if (data.error) {
          toast.error(data.error);
          setLoadingStep(null);
          return;
        }

        await new Promise((r) => setTimeout(r, 500));

        const chart: ChartResult = {
          id: crypto.randomUUID(),
          query,
          sql: data.sql || "N/A",
          chartType: data.chartType || "bar",
          title: data.title || "Chart",
          insight: data.insight || "No insight available.",
          data: data.data || [],
          xKey: data.xKey || "name",
          yKeys: data.yKeys || ["value"],
          timestamp: new Date(),
        };

        addChart(chart);
        setLoadingStep("done");
        setTimeout(() => setLoadingStep(null), 300);
      } catch (err) {
        console.error("Query error:", err);
        toast.error("Failed to process query. Please try again.");
        setLoadingStep(null);
      }
    },
    [dataset, rawData, addChart, addToHistory, setLoadingStep]
  );

  const handleQuerySelect = (query: string) => {
    setInputValue(query);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar onQuerySelect={handleQuerySelect} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Dashboard />
          <ChatInput
            onSubmit={handleQuery}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

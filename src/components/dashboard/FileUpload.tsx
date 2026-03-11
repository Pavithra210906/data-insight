import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { FileUp, CheckCircle2, Database } from "lucide-react";
import Papa from "papaparse";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dataset, setDataset, setRawData, clearCharts } = useAppStore();

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".csv")) {
        toast.error("Please upload a CSV file");
        return;
      }

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as Record<string, string | number>[];
          if (data.length === 0) {
            toast.error("CSV file is empty");
            return;
          }
          const columns = Object.keys(data[0]);
          setRawData(data);
          setDataset({
            name: file.name.replace(".csv", ""),
            columns,
            rowCount: data.length,
            sampleRows: data.slice(0, 5),
          });
          clearCharts();
          toast.success(`Loaded ${data.length} rows with ${columns.length} columns`);
        },
        error: () => {
          toast.error("Failed to parse CSV");
        },
      });
    },
    [setDataset, setRawData, clearCharts]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (dataset) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-lg border border-primary/20 bg-primary/5 p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-primary">{dataset.name}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span><Database className="h-3 w-3 inline mr-1" />{dataset.rowCount} rows</span>
          <span>{dataset.columns.length} columns</span>
        </div>
        <button
          onClick={() => {
            setDataset(null);
            setRawData([]);
            clearCharts();
          }}
          className="text-[10px] text-destructive mt-2 hover:underline"
        >
          Remove dataset
        </button>
      </motion.div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      className="rounded-lg border border-dashed border-border hover:border-primary/50 bg-sidebar-accent/30 p-4 cursor-pointer transition-colors group"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <FileUp className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
        <div>
          <p className="text-xs font-medium text-sidebar-foreground">Upload CSV</p>
          <p className="text-[10px] text-muted-foreground">Drag & drop or click</p>
        </div>
      </div>
    </div>
  );
}

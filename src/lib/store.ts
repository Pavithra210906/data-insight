import { create } from "zustand";
import type { DatasetInfo, ChartResult, QueryHistoryItem, LoadingStep } from "./types";

interface AppState {
  dataset: DatasetInfo | null;
  rawData: Record<string, string | number>[];
  charts: ChartResult[];
  queryHistory: QueryHistoryItem[];
  loadingStep: LoadingStep | null;
  sidebarOpen: boolean;

  setDataset: (dataset: DatasetInfo | null) => void;
  setRawData: (data: Record<string, string | number>[]) => void;
  addChart: (chart: ChartResult) => void;
  removeChart: (id: string) => void;
  clearCharts: () => void;
  addToHistory: (query: string) => void;
  setLoadingStep: (step: LoadingStep | null) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  dataset: null,
  rawData: [],
  charts: [],
  queryHistory: [],
  loadingStep: null,
  sidebarOpen: true,

  setDataset: (dataset) => set({ dataset }),
  setRawData: (rawData) => set({ rawData }),
  addChart: (chart) =>
    set((state) => ({ charts: [chart, ...state.charts] })),
  removeChart: (id) =>
    set((state) => ({ charts: state.charts.filter((c) => c.id !== id) })),
  clearCharts: () => set({ charts: [] }),
  addToHistory: (query) =>
    set((state) => ({
      queryHistory: [
        { id: crypto.randomUUID(), query, timestamp: new Date() },
        ...state.queryHistory,
      ].slice(0, 20),
    })),
  setLoadingStep: (loadingStep) => set({ loadingStep }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));

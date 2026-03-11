export interface DatasetInfo {
  name: string;
  columns: string[];
  rowCount: number;
  sampleRows: Record<string, string | number>[];
}

export interface ChartResult {
  id: string;
  query: string;
  sql: string;
  chartType: "bar" | "line" | "pie" | "area";
  title: string;
  insight: string;
  data: Record<string, string | number>[];
  xKey: string;
  yKeys: string[];
  timestamp: Date;
}

export interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
}

export type LoadingStep = 
  | "analyzing"
  | "generating"
  | "building"
  | "done";

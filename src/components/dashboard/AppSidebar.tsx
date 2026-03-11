import { motion, AnimatePresence } from "framer-motion";
import { Upload, MessageSquare, History, Lightbulb, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { FileUpload } from "./FileUpload";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const EXAMPLE_QUERIES = [
  "Show total revenue by region",
  "Monthly sales trend over time",
  "Top 5 products by revenue",
  "Compare categories by performance",
  "Distribution of order values",
  "Year-over-year growth rate",
];

interface AppSidebarProps {
  onQuerySelect: (query: string) => void;
}

export function AppSidebar({ onQuerySelect }: AppSidebarProps) {
  const { sidebarOpen, setSidebarOpen, queryHistory, dataset } = useAppStore();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="border-r border-border/50 bg-sidebar flex flex-col overflow-hidden shrink-0"
        >
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <span className="text-sm font-display font-semibold text-sidebar-foreground">
              Workspace
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-sidebar-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Upload Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
                    Dataset
                  </span>
                </div>
                <FileUpload />
              </section>

              {/* Example Queries */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
                    Example Queries
                  </span>
                </div>
                <div className="space-y-1.5">
                  {EXAMPLE_QUERIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => onQuerySelect(q)}
                      disabled={!dataset}
                      className="w-full text-left text-xs px-3 py-2 rounded-md bg-sidebar-accent/50 hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </section>

              {/* Query History */}
              {queryHistory.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <History className="h-4 w-4 text-chart-3" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
                      History
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {queryHistory.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onQuerySelect(item.query)}
                        className="w-full text-left text-xs px-3 py-2 rounded-md hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground transition-colors truncate"
                      >
                        <MessageSquare className="h-3 w-3 inline mr-1.5 opacity-50" />
                        {item.query}
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </ScrollArea>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

import { motion } from "framer-motion";
import { BarChart3, Menu, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { dataset, sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-14 border-b border-border/50 glass flex items-center justify-between px-4 z-50 sticky top-0"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-display font-semibold tracking-tight">
            AI Dashboard Studio
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {dataset && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              {dataset.name} · {dataset.rowCount} rows
            </span>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

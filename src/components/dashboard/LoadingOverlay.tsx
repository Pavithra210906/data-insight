import { motion, AnimatePresence } from "framer-motion";
import { Brain, Database, BarChart3, Check } from "lucide-react";
import type { LoadingStep } from "@/lib/types";

const STEPS: { key: LoadingStep; label: string; icon: typeof Brain }[] = [
  { key: "analyzing", label: "Analyzing dataset", icon: Database },
  { key: "generating", label: "Generating SQL query", icon: Brain },
  { key: "building", label: "Building dashboard", icon: BarChart3 },
];

interface LoadingOverlayProps {
  currentStep: LoadingStep | null;
}

export function LoadingOverlay({ currentStep }: LoadingOverlayProps) {
  if (!currentStep || currentStep === "done") return null;

  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="max-w-md mx-auto mb-6"
      >
        <div className="glass rounded-xl p-5">
          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const isActive = i === currentIndex;
              const isDone = i < currentIndex;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center transition-colors ${
                      isDone
                        ? "bg-primary/20 text-primary"
                        : isActive
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Icon className={`h-3.5 w-3.5 ${isActive ? "animate-pulse" : ""}`} />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isActive
                        ? "text-foreground font-medium"
                        : isDone
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-1"
                      >
                        ...
                      </motion.span>
                    )}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

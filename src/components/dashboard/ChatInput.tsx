import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSubmit: (query: string) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
}

export function ChatInput({ onSubmit, inputValue, setInputValue }: ChatInputProps) {
  const { dataset, loadingStep } = useAppStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || !dataset || loadingStep) return;
    onSubmit(trimmed);
    setInputValue("");
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [inputValue]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="p-4"
    >
      <div className="max-w-3xl mx-auto relative">
        <div className="glass rounded-xl p-1 shadow-card">
          <div className="flex items-end gap-2 p-2">
            <Sparkles className="h-4 w-4 text-primary mb-2.5 shrink-0" />
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={
                dataset
                  ? "Ask about your data... e.g. 'Show revenue by region'"
                  : "Upload a dataset first to start querying..."
              }
              disabled={!dataset || !!loadingStep}
              rows={1}
              className="flex-1 bg-transparent border-0 outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-40"
            />
            <Button
              size="icon"
              onClick={handleSubmit}
              disabled={!dataset || !inputValue.trim() || !!loadingStep}
              className="h-9 w-9 rounded-lg gradient-primary text-primary-foreground shrink-0 disabled:opacity-30"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          AI analyzes your data and generates interactive charts
        </p>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

type Props = {
  value: number;
  max?: number;
  size?: "sm" | "md";
  showLabel?: boolean;
  label?: string;
};

const sizeClasses = {
  sm: "h-2",
  md: "h-3",
};

export default function ProgressBar({ value, max = 100, size = "md", showLabel = false, label }: Props) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-2">
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">{label ?? "Progress"}</span>
          <span className="text-zinc-900 dark:text-zinc-50">{Math.round(percent)}%</span>
        </div>
      )}
      <div className={`w-full rounded-full bg-zinc-100 dark:bg-zinc-900 ${sizeClasses[size]}`}>
        <motion.div
          className="h-full rounded-full bg-zinc-900 dark:bg-zinc-50"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

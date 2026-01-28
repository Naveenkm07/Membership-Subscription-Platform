"use client";

import { motion } from "framer-motion";

type Props = {
  status: "locked" | "unlocked" | "premium";
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

const variants = {
  locked: {
    bg: "bg-zinc-100 dark:bg-zinc-900",
    text: "text-zinc-600 dark:text-zinc-400",
    border: "border-zinc-200 dark:border-zinc-800",
  },
  unlocked: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
  },
  premium: {
    bg: "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
};

export default function AccessBadge({ status, size = "md" }: Props) {
  const classes = variants[status];
  const sizeClass = sizeClasses[size];

  return (
    <motion.span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border ${sizeClass} ${classes.bg} ${classes.text} ${classes.border}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {status === "locked" && <LockIcon />}
      {status === "unlocked" && <UnlockedIcon />}
      {status === "premium" && <PremiumIcon />}
      {status === "locked" && "Locked"}
      {status === "unlocked" && "Unlocked"}
      {status === "premium" && "Premium"}
    </motion.span>
  );
}

function LockIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UnlockedIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 018 0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PremiumIcon() {
  return (
    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

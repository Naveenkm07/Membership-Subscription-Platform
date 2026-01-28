"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200",
  secondary: "border border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950",
};

export default function UpgradeButton({ href, label, variant = "primary" }: Props) {
  const isSubmitButton = href === "#";

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      {isSubmitButton ? (
        <button
          type="submit"
          className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${variants[variant]}`}
        >
          {label}
        </button>
      ) : (
        <Link
          href={href}
          className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${variants[variant]}`}
        >
          {label}
        </Link>
      )}
    </motion.div>
  );
}

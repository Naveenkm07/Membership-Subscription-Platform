"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  steps: { id: string; label: string; done: boolean; href?: string }[];
};

export default function OnboardingModal({ isOpen, onClose, onComplete, steps }: Props) {
  if (!isOpen) return null;

  const allDone = steps.every((s) => s.done);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="mx-4 max-w-md rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="space-y-2">
          <h2 className="text-xl font-semibold">Welcome to MemberStack!</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Complete these quick steps to get the most out of your membership.
          </p>
        </header>

        <ul className="mt-6 space-y-3">
          {steps.map((step) => (
            <li key={step.id} className="flex items-center gap-3">
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  step.done
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {step.done && (
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-zinc-900 dark:text-zinc-50">{step.label}</span>
              {step.href && !step.done && (
                <Link
                  href={step.href}
                  className="ml-auto rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
                >
                  Do it
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
          >
            Skip for now
          </button>
          {allDone && (
            <button
              onClick={() => {
                onComplete();
                onClose();
              }}
              className="flex-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              Get started
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

import { canAccessContent } from "./plans";

export type RequiredPlan = "free" | "basic" | "pro";

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  transcript?: string;
  resources?: string[];
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  summary: string; // Add summary to Course type
  requiredPlan: RequiredPlan;
  lessons: Lesson[];
  progress: number;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  requiredPlan: RequiredPlan;
  readTime: string;
  content?: string;
};

export type ContentItem = (Course | Article) & {
  type: "course" | "article";
};

export const COURSES: Course[] = [
  {
    slug: "getting-started",
    title: "Getting Started: Your Member Dashboard",
    description: "Learn how to navigate your dashboard, track progress, and save resources.",
    summary: "Learn how to navigate your dashboard, track progress, and save resources.",
    requiredPlan: "free",
    lessons: [
      { id: "1", title: "Tour the dashboard", description: "Overview of key sections", duration: "3m" },
      { id: "2", title: "Track your progress", description: "How progress is calculated", duration: "4m" },
      { id: "3", title: "Save and bookmark", description: "Organize your learning", duration: "2m" },
    ],
    progress: 0,
  },
  {
    slug: "content-systems",
    title: "Content Systems 101",
    description: "A practical framework for publishing consistent, high-quality member content.",
    summary: "A practical framework for publishing consistent, high-quality member content.",
    requiredPlan: "basic",
    lessons: [
      { id: "1", title: "Why systems matter", description: "Consistency beats intensity", duration: "5m" },
      { id: "2", title: "Content pillars", description: "Define your core topics", duration: "6m" },
      { id: "3", title: "Publishing cadence", description: "Build sustainable habits", duration: "4m" },
      { id: "4", title: "Repurposing workflow", description: "Maximize reach without burnout", duration: "7m" },
    ],
    progress: 0,
  },
  {
    slug: "pro-growth-playbook",
    title: "Pro: Growth Playbook",
    description: "Advanced acquisition loops, retention tactics, and member segmentation strategies.",
    summary: "Advanced acquisition loops, retention tactics, and member segmentation strategies.",
    requiredPlan: "pro",
    lessons: [
      { id: "1", title: "Acquisition loops", description: "Self-sustaining growth", duration: "8m" },
      { id: "2", title: "Retention cohorts", description: "Data-driven member journeys", duration: "9m" },
      { id: "3", title: "Segmentation basics", description: "Personalize at scale", duration: "6m" },
      { id: "4", title: "Referral mechanics", description: "Turn members into advocates", duration: "7m" },
    ],
    progress: 0,
  },
];

export const ARTICLES: Article[] = [
  {
    slug: "onboarding-checklist",
    title: "Onboarding Checklist for New Members",
    summary: "A quick checklist to ensure every new member gets value from day one.",
    requiredPlan: "free",
    readTime: "3 min",
  },
  {
    slug: "pricing-psychology",
    title: "Pricing Psychology for Membership Sites",
    summary: "How to structure tiers and anchor value without alienating free users.",
    requiredPlan: "basic",
    readTime: "5 min",
  },
  {
    slug: "pro-templates",
    title: "Pro: Templates & Swipe File",
    summary: "Reusable checklists and copy templates for launches, onboarding, and renewals.",
    requiredPlan: "pro",
    readTime: "8 min",
  },
];

export const CONTENT: ContentItem[] = [
  ...COURSES.map((c) => ({ ...c, type: "course" as const })),
  ...ARTICLES.map((a) => ({ ...a, type: "article" as const })),
];

export function getContentBySlug(slug: string) {
  return CONTENT.find((c) => c.slug === slug) ?? null;
}

export function getCourseBySlug(slug: string): Course | null {
  return COURSES.find((c) => c.slug === slug) ?? null;
}

export function getArticleBySlug(slug: string): Article | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function canAccess(requiredPlan: RequiredPlan, userPlan: string): boolean {
  const planLevels: Record<string, number> = { free: 0, basic: 1, pro: 2 };
  const requiredLevel = planLevels[requiredPlan] ?? 0;
  const userLevel = planLevels[userPlan] ?? 0;
  return userLevel >= requiredLevel;
}

export type PlanId = "free" | "basic" | "pro";

export type Plan = {
  id: PlanId;
  name: string;
  priceMonthly: number;
  description: string;
  features: string[];
  accessLevel: number;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    description: "Explore the platform with limited access.",
    features: ["Browse free articles", "Basic profile", "Community forum"],
    accessLevel: 0,
  },
  {
    id: "basic",
    name: "Basic",
    priceMonthly: 19,
    description: "Unlock the full content library and member dashboard.",
    features: ["Member dashboard", "Full content library", "Email support", "Downloadable resources"],
    accessLevel: 1,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 49,
    description: "Everything in Basic, plus premium tracks and priority support.",
    features: [
      "Everything in Basic",
      "Premium learning tracks",
      "Priority support",
      "Early access to new drops",
      "Live Q&A sessions",
    ],
    accessLevel: 2,
  },
];

export function getPlanById(planId: string | null | undefined) {
  return PLANS.find((p) => p.id === planId) ?? null;
}

export function getPlanByAccessLevel(level: number) {
  return PLANS.find((p) => p.accessLevel === level) ?? null;
}

export function canAccessContent(requiredLevel: number, userPlan: PlanId) {
  const plan = getPlanById(userPlan);
  return plan ? plan.accessLevel >= requiredLevel : false;
}

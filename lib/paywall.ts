import { PlanId, canAccessContent } from "./plans";

export type AccessStatus = "locked" | "unlocked" | "premium";

export function getAccessStatus(requiredLevel: number, userPlan: PlanId): AccessStatus {
  if (!userPlan || userPlan === "free") {
    return requiredLevel === 0 ? "unlocked" : "locked";
  }
  if (canAccessContent(requiredLevel, userPlan)) {
    return requiredLevel >= 2 ? "premium" : "unlocked";
  }
  return "locked";
}

export function getUpgradeCTA(requiredLevel: number, userPlan: PlanId): {
  label: string;
  href: string;
} {
  if (!userPlan || userPlan === "free") {
    return {
      label: requiredLevel === 0 ? "Sign up for free" : "Upgrade to Basic",
      href: requiredLevel === 0 ? "/signup" : "/pricing",
    };
  }
  if (userPlan === "basic" && requiredLevel >= 2) {
    return { label: "Upgrade to Pro", href: "/pricing" };
  }
  return { label: "View plans", href: "/pricing" };
}

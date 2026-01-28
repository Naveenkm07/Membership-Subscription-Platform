"use client";

import { useEffect, useState } from "react";
import OnboardingModal from "./OnboardingModal";

type Props = {
  userOnboarded: boolean;
  steps: { id: string; label: string; done: boolean; href?: string }[];
};

export default function OnboardingWrapper({ userOnboarded, steps }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!userOnboarded) {
      setIsOpen(true);
    }
  }, [userOnboarded]);

  const handleClose = () => setIsOpen(false);
  const handleComplete = () => setIsOpen(false);

  return (
    <OnboardingModal
      isOpen={isOpen}
      onClose={handleClose}
      onComplete={handleComplete}
      steps={steps}
    />
  );
}

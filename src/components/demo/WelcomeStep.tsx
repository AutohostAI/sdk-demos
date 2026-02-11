/**
 * WelcomeStep — Branded Welcome Screen
 *
 * Shown as the first step after SDK initialization. Displays a warm
 * hospitality welcome when a brand theme is active, or a simpler
 * generic welcome when no theme is selected.
 *
 * @demo This component is for demonstration purposes only.
 */
"use client";

import { useBrandTheme } from "@/context/BrandThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, UserCheck, Shield, ArrowRight } from "lucide-react";

interface WelcomeStepProps {
  /** Callback invoked when the user clicks the continue button. */
  onContinue: () => void;
}

export const WelcomeStep = ({ onContinue }: WelcomeStepProps) => {
  const { theme } = useBrandTheme();
  const isBranded = theme && theme.id !== "none";

  const title = isBranded
    ? `Welcome to ${theme.propertyName}`
    : "Welcome";

  const subtitle = isBranded
    ? "Complete your pre-arrival check-in to ensure a smooth experience."
    : "Complete your guest registration to get started.";

  const buttonLabel = isBranded ? "Begin Check-In" : "Get Started";

  const steps = [
    {
      icon: ClipboardCheck,
      label: "Personal Information",
      description: "Provide your guest details",
    },
    {
      icon: UserCheck,
      label: "Usage Agreement",
      description: "Review and sign the terms",
    },
    {
      icon: Shield,
      label: "Identity Verification",
      description: "Quick ID and selfie check",
    },
  ];

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground pt-2">{subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {steps.map(({ icon: Icon, label, description }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={onContinue} className="w-full" size="lg">
            {buttonLabel} <ArrowRight className="inline h-4 w-4 ml-1 align-text-bottom" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

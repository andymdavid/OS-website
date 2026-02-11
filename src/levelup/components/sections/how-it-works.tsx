import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/levelup/components/ui/card";
import * as LucideIcons from "lucide-react";
import { LucideIcon, ArrowRight } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon?: string;
  bullets?: string[];
}

interface HowItWorksProps {
  title: string;
  subtitle?: string;
  steps: Step[];
  note?: string;
}

// Helper to get icon component from string name
function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) {
    return LucideIcons.ArrowRightCircle;
  }

  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.ArrowRightCircle;
}

export function HowItWorks({ title, subtitle, steps, note }: HowItWorksProps) {
  // Determine grid columns based on step count
  const getGridCols = (count: number) => {
    if (count === 2) return "lg:grid-cols-2";
    if (count === 4) return "lg:grid-cols-4";
    if (count === 5) return "lg:grid-cols-5";
    return "lg:grid-cols-3"; // default for 3 steps
  };

  return (
    <Section>
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight leading-tight sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Steps Grid with Arrows */}
          <div className="relative">
            <div
              className={`grid gap-8 sm:grid-cols-2 ${getGridCols(
                steps.length
              )}`}
            >
              {steps.map((step, index) => {
                const Icon = getIconComponent(step.icon);
                const stepNumber = String(index + 1).padStart(2, "0");

                return (
                  <div key={`${step.title}-${index}`} className="relative">
                    <Card className="h-full">
                      <CardHeader>
                        {/* Step Number Badge */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                            {stepNumber}
                          </div>
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </CardHeader>
                      {step.bullets && step.bullets.length > 0 && (
                        <CardContent>
                          <ul className="space-y-2">
                            {step.bullets.map((bullet, bulletIndex) => (
                              <li
                                key={bulletIndex}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="text-primary mt-0.5">→</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>

                    {/* Connecting Arrow (Desktop only, not on last item) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional Note */}
          {note && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{note}</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

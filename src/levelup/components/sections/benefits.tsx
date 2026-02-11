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
import { LucideIcon } from "lucide-react";

interface BenefitItem {
  title: string;
  description: string;
  icon?: string;
  highlight?: boolean;
  bullets?: string[];
}

interface BenefitsProps {
  title: string;
  subtitle?: string;
  items: BenefitItem[];
}

// Helper to get icon component from string name
function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) {
    return LucideIcons.Sparkles;
  }

  // Try to find the icon in lucide-react
  const IconComponent = (LucideIcons as any)[iconName];

  // Return the icon if found, otherwise return a default
  return IconComponent || LucideIcons.Sparkles;
}

export function Benefits({ title, subtitle, items }: BenefitsProps) {
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

          {/* Bento Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const Icon = getIconComponent(item.icon);

              return (
                <Card
                  key={`${item.title}-${index}`}
                  className={`transition-all hover:shadow-lg hover:-translate-y-1 ${
                    item.highlight ? "bg-muted/50 border-primary/50" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="mb-3">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${
                          item.highlight
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  {item.bullets && item.bullets.length > 0 && (
                    <CardContent>
                      <ul className="space-y-2">
                        {item.bullets.map((bullet, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-primary mt-0.5">✓</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

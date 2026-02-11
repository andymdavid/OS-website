import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";

interface PricingProps {
  title: string;
  subtitle: string;
  plans: Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
  }>;
}

export function Pricing({ title, subtitle, plans }: PricingProps) {
  return (
    <Section>
      <Container>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Pricing (stub)</h2>
          <p className="text-muted-foreground">Title: {title}</p>
          <p className="text-muted-foreground">Subtitle: {subtitle}</p>
          <p className="text-sm text-muted-foreground">
            {plans.length} pricing plans (
            {plans.find((p) => p.highlighted)?.name} highlighted)
          </p>
        </div>
      </Container>
    </Section>
  );
}

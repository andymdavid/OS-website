import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";

interface TestimonialsProps {
  title: string;
  subtitle: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    avatar: string;
  }>;
}

export function Testimonials({
  title,
  subtitle,
  testimonials,
}: TestimonialsProps) {
  return (
    <Section>
      <Container>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Testimonials (stub)</h2>
          <p className="text-muted-foreground">Title: {title}</p>
          <p className="text-muted-foreground">Subtitle: {subtitle}</p>
          <p className="text-sm text-muted-foreground">
            {testimonials.length} customer testimonials
          </p>
        </div>
      </Container>
    </Section>
  );
}

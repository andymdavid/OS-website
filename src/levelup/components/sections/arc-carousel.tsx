
import { useAnimationFrame } from "framer-motion";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/levelup/components/ui/card";
import { cn } from "@/levelup/lib/utils";

interface ArcCarouselCard {
  id: string;
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  href?: string;
}

interface ArcCarouselProps {
  cards: ArcCarouselCard[];
  speed?: number;
  pauseOnHover?: boolean;
  hoverSpeedMultiplier?: number;
  arcDepth?: number;
  overlapTop?: string;
  overlapBottom?: string;
  className?: string;
}

function calculateArcTransform(
  normalizedX: number,
  arcDepth: number,
  centerScale: number = 1.1,
  edgeScale: number = 0.75
) {
  const yOffset = arcDepth * Math.pow(normalizedX, 2);
  const scale = centerScale - (centerScale - edgeScale) * Math.pow(normalizedX, 2);
  const rotateY = normalizedX * 25;
  const zIndex = Math.round((1 - Math.abs(normalizedX)) * 100);

  return { yOffset, scale, rotateY, zIndex };
}

export function ArcCarousel({
  cards,
  speed = 60,
  pauseOnHover = true,
  hoverSpeedMultiplier = 0.15,
  arcDepth: baseArcDepth = 80,
  overlapTop = "-120px",
  overlapBottom = "-60px",
  className,
}: ArcCarouselProps) {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 1200,
    cardWidth: 260,
    arcDepth: baseArcDepth
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let cardWidth: number;
      let arcDepth: number;

      if (width < 640) {
        cardWidth = 160;
        arcDepth = 40;
      } else if (width < 1024) {
        cardWidth = 200;
        arcDepth = 60;
      } else {
        cardWidth = 260;
        arcDepth = baseArcDepth;
      }

      setDimensions({ width, cardWidth, arcDepth });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [baseArcDepth]);

  // Double cards for seamless loop
  const displayCards = useMemo(() => [...cards, ...cards], [cards]);
  const cardGap = 60;
  const totalWidth = displayCards.length * (dimensions.cardWidth + cardGap);

  // Animation loop
  useAnimationFrame((time, delta) => {
    const currentSpeed = isHovered && pauseOnHover
      ? speed * hoverSpeedMultiplier
      : speed;
    setProgress((prev) => (prev + (delta / 1000) * currentSpeed) % totalWidth);
  });

  // Calculate card positions
  const getCardTransform = useCallback(
    (index: number) => {
      const cardSpacing = dimensions.cardWidth + cardGap;
      const centerX = dimensions.width / 2;

      // Raw position
      let x = index * cardSpacing - progress;

      // Wrap around
      while (x < -cardSpacing * 2) x += totalWidth;
      while (x > dimensions.width + cardSpacing) x -= totalWidth;

      // Normalized position (-1 to 1)
      const normalizedX =
        (x + dimensions.cardWidth / 2 - centerX) / (dimensions.width / 2);
      const clampedNormalizedX = Math.max(-1.2, Math.min(1.2, normalizedX));

      const { yOffset, scale, rotateY, zIndex } = calculateArcTransform(
        clampedNormalizedX,
        dimensions.arcDepth
      );

      return { x, yOffset, scale, rotateY, zIndex };
    },
    [progress, dimensions, totalWidth]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{
        marginTop: overlapTop,
        marginBottom: overlapBottom,
        zIndex: 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center center",
          height: "320px",
        }}
      >
        {displayCards.map((card, index) => {
          const transform = getCardTransform(index);

          // Skip cards that are too far off screen
          if (transform.x < -dimensions.cardWidth * 2 || transform.x > dimensions.width + dimensions.cardWidth) {
            return null;
          }

          return (
            <div
              key={`${card.id}-${index}`}
              className="absolute top-1/2 will-change-transform"
              style={{
                transform: `
                  translateX(${transform.x}px)
                  translateY(calc(-50% + ${transform.yOffset}px))
                  scale(${transform.scale})
                  rotateY(${transform.rotateY}deg)
                `,
                transformStyle: "preserve-3d",
                width: dimensions.cardWidth,
                zIndex: transform.zIndex,
              }}
            >
              <Card className="overflow-hidden bg-neutral-900 border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-1.5">
                {card.href ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={card.title}
                  >
                {card.image ? (
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    {card.badge && (
                      <span className="absolute top-2 left-2 px-2 py-1 text-xs bg-[#a1ff62] text-black rounded font-medium">
                        {card.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                    <span className="text-4xl">🎮</span>
                    {card.badge && (
                      <span className="absolute top-2 left-2 px-2 py-1 text-xs bg-[#a1ff62] text-black rounded font-medium">
                        {card.badge}
                      </span>
                    )}
                  </div>
                )}
                <CardContent className="px-2 pt-2 pb-0 bg-neutral-900">
                  <h3 className="font-semibold text-sm text-white">{card.title}</h3>
                  {card.description && (
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {card.description}
                    </p>
                  )}
                </CardContent>
                  </a>
                ) : (
                  <>
                    {card.image ? (
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {card.badge && (
                          <span className="absolute top-2 left-2 px-2 py-1 text-xs bg-[#a1ff62] text-black rounded font-medium">
                            {card.badge}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                        <span className="text-4xl">🎮</span>
                        {card.badge && (
                          <span className="absolute top-2 left-2 px-2 py-1 text-xs bg-[#a1ff62] text-black rounded font-medium">
                            {card.badge}
                          </span>
                        )}
                      </div>
                    )}
                    <CardContent className="px-2 pt-2 pb-0 bg-neutral-900">
                      <h3 className="font-semibold text-sm text-white">{card.title}</h3>
                      {card.description && (
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                          {card.description}
                        </p>
                      )}
                    </CardContent>
                  </>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

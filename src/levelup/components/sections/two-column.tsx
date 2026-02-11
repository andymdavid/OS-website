
import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LevelUpCard {
  id: string;
  number: string;
  title: string;
  description: string;
  primaryTag: string;
  secondaryTag?: string;
  summaryItems: Array<{
    number: string;
    text: string;
  }>;
}

interface TwoColumnProps {
  id?: string;
  title: string;
  body: string;
  bodyLinks?: Array<{
    text: string;
    href: string;
    newTab?: boolean;
  }>;
  bodyMobileSplitOn?: string;
  bodyMobileSplitParas?: string[];
  anchorId?: string;
  profileLogo?: string;
  singleColumn?: boolean;
  fullHeight?: boolean;
  layout?: "default" | "split";
  splitReverse?: boolean;
  splitImage?: string;
  splitImageAlt?: string;
  splitVideo?: string;
  splitBlocks?: Array<{
    title: string;
    body: string;
  }>;
  blocks?: Array<{
    number?: string;
    title: string;
    body: string;
    role?: string;
    image?: string;
    imageAlt?: string;
    video?: string;
  }>;
  levelUpCards?: LevelUpCard[];
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  hideTitle?: boolean;
  bodyVariant?: "default" | "display";
  blocksVariant?: "numbered" | "feature" | "profile";
}

export function TwoColumn({
  id,
  title,
  body,
  singleColumn = false,
  fullHeight = false,
  layout = "default",
  splitReverse = false,
  splitImage,
  splitImageAlt,
  splitVideo,
  splitBlocks,
  blocks,
  levelUpCards,
  faqItems,
  bodyLinks,
  bodyMobileSplitOn,
  bodyMobileSplitParas,
  anchorId,
  profileLogo,
  hideTitle = false,
  bodyVariant = "default",
  blocksVariant = "numbered",
}: TwoColumnProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const bodyClassName =
    bodyVariant === "display"
      ? "mt-4 text-2xl sm:text-3xl md:text-4xl leading-snug text-[#201d1d] text-center"
      : `mt-8 text-sm md:text-base text-[#201d1d]${singleColumn ? " text-center mb-8" : " mb-8"}`;

  const renderBody = () => {
    if (!bodyLinks || bodyLinks.length === 0) {
      return body;
    }

    let parts: React.ReactNode[] = [body];

    bodyLinks.forEach((link, linkIndex) => {
      const nextParts: React.ReactNode[] = [];
      parts.forEach((part, partIndex) => {
        if (typeof part !== "string") {
          nextParts.push(part);
          return;
        }

        const segments = part.split(link.text);
        segments.forEach((segment, segmentIndex) => {
          if (segment) {
            nextParts.push(segment);
          }
          if (segmentIndex < segments.length - 1) {
            nextParts.push(
              <a
                key={`body-link-${linkIndex}-${partIndex}-${segmentIndex}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-500"
              >
                {link.text}
              </a>
            );
          }
        });
      });
      parts = nextParts;
    });

    return parts;
  };

  const renderMobileParagraphs = (text: string, splitOn: string) => {
    const splitIndex = text.indexOf(splitOn);
    if (splitIndex === -1) {
      return <p className="md:hidden mt-6 text-sm md:text-base text-[#201d1d]">{text}</p>;
    }

    const first = text.slice(0, splitIndex).trim();
    const second = text.slice(splitIndex).trim();

    return (
      <div className="md:hidden mt-6 space-y-4 text-sm md:text-base text-[#201d1d]">
        <p>{first}</p>
        <p>{second}</p>
      </div>
    );
  };

  const renderDefaultBody = (className: string) => {
    if (bodyMobileSplitParas && bodyMobileSplitParas.length > 0) {
      const text = body;
      const sortedSplits = [...bodyMobileSplitParas].sort(
        (a, b) => text.indexOf(a) - text.indexOf(b)
      );
      const indices = sortedSplits
        .map((marker) => ({ marker, index: text.indexOf(marker) }))
        .filter((item) => item.index !== -1)
        .sort((a, b) => a.index - b.index);

      if (indices.length > 0) {
        const parts: string[] = [];
        let start = 0;
        indices.forEach((item) => {
          const segment = text.slice(start, item.index).trim();
          if (segment) {
            parts.push(segment);
          }
          start = item.index;
        });
        const last = text.slice(start).trim();
        if (last) {
          parts.push(last);
        }

        return (
          <>
            <div className="md:hidden mt-6 space-y-4 text-sm md:text-base text-[#201d1d]">
              {parts.map((part, index) => (
                <p key={index}>{part}</p>
              ))}
            </div>
            <p className={`hidden md:block ${className}`}>{renderBody()}</p>
          </>
        );
      }
    }

    if (bodyMobileSplitOn) {
      return (
        <>
          {renderMobileParagraphs(body, bodyMobileSplitOn)}
          <p className={`hidden md:block ${className}`}>{renderBody()}</p>
        </>
      );
    }

    return <p className={className}>{renderBody()}</p>;
  };

  // Split layout: 50/50 with content left, image right
  if (layout === "split") {
    return (
      <Section id={anchorId || id} className="min-h-[75vh]">
        <div className="grid md:grid-cols-2 min-h-[75vh]">
          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: splitReverse ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 ${splitReverse ? "md:order-2" : "md:order-1"}`}
          >
            <h2 className="font-anton text-[40px] tracking-tight leading-tight uppercase">
              {title}
            </h2>
            {renderMobileParagraphs(body, "The workshop is facilitated")}
            <p className="hidden md:block mt-6 text-sm md:text-base text-[#201d1d]">
              {renderBody()}
            </p>

            {/* Split blocks */}
            {splitBlocks && splitBlocks.length > 0 && (
              <div className="mt-10">
                {splitBlocks.map((block, index) => (
                  <div key={index} className="border-t border-neutral-300 pt-6 pb-8">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      <h3 className="text-base font-semibold text-[#201d1d]">
                        {block.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {block.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: splitReverse ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`flex items-center p-8 md:p-12 lg:p-16 ${splitReverse ? "md:order-1" : "md:order-2"}`}
          >
            <div className="relative w-full aspect-[4/3] bg-neutral-300 rounded-2xl overflow-hidden">
              {splitVideo ? (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={splitVideo} type="video/mp4" />
                </video>
              ) : splitImage ? (
                <img
                  src={splitImage}
                  alt={splitImageAlt || title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-500 text-sm">Image placeholder</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Section>
    );
  }

  return (
    <Section id={anchorId || id} className={`${fullHeight ? "min-h-screen" : "min-h-[75vh]"} flex items-center`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {!hideTitle ? (
            <h2 className="font-anton text-[40px] tracking-tight leading-tight uppercase text-center">
              {title}
            </h2>
          ) : null}
          {renderDefaultBody(
            `${bodyClassName} ${
              singleColumn
                ? bodyVariant === "display"
                  ? "max-w-3xl mx-auto"
                  : "max-w-[40rem] mx-auto"
                : "md:columns-2 md:gap-10"
            }`
          )}
          {faqItems && faqItems.length > 0 && (
            <div className="mt-10 max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="border-t border-neutral-300">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full py-6 flex items-center justify-between text-left"
                  >
                    <h3 className="text-base font-semibold text-[#201d1d] pr-4">
                      {item.question}
                    </h3>
                    <span className="text-2xl text-neutral-400 shrink-0">
                      {openFaqIndex === index ? "×" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm md:text-base text-[#201d1d] leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="border-t border-neutral-300" />
            </div>
          )}
          {blocks && blocks.length > 0 ? (
            blocksVariant === "feature" ? (
              <div className="mt-10 pt-6 grid gap-x-10 gap-y-12 md:grid-cols-3">
                {blocks.map((block) => (
                  <div key={block.number ?? block.title} className="border-t border-neutral-300/70 pt-4">
                    <div className="mt-4 overflow-hidden rounded-xl bg-neutral-200/70">
                      {block.video ? (
                        <video
                          className="aspect-[16/10] w-full object-contain bg-white"
                          src={block.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : block.image ? (
                        <div className="relative aspect-[16/10] w-full bg-white p-10">
                          <img
                            src={block.image}
                            alt={block.imageAlt || block.title}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] w-full bg-neutral-300/70" />
                      )}
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-[#201d1d]">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">{block.body}</p>
                  </div>
                ))}
              </div>
            ) : blocksVariant === "profile" ? (
              <div className="mt-10 pt-6 grid gap-8 md:grid-cols-2">
                {blocks.map((block, index) => (
                  <div
                    key={block.number ?? block.title}
                    className={`border-t border-neutral-300/70 py-8 last:border-b md:border-b ${
                      index < 2 ? "md:border-t" : "md:border-t-0"
                    }`}
                  >
                    <div className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-10">
                      <div className="flex items-start gap-4">
                        {block.image ? (
                          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-neutral-200">
                            <img
                              src={block.image}
                              alt={block.imageAlt || block.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 text-[11px] font-medium text-neutral-500">
                            Photo
                          </div>
                        )}
                      <div>
                        <h3 className="font-anton text-2xl uppercase text-[#201d1d]">
                          {block.title}
                        </h3>
                        {block.role || profileLogo ? (
                          <div className="mt-2 flex items-center gap-2">
                            {block.role ? (
                              <span className="inline-flex px-2.5 py-1 text-xs font-semibold bg-[#a1ff62] text-black rounded uppercase tracking-wide">
                                {block.role}
                              </span>
                            ) : null}
                            {profileLogo ? (
                              <a
                                href="https://otherstuff.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-5 h-5 rounded border-[0.1px] border-neutral-700 bg-neutral-900 overflow-hidden flex items-center justify-center p-[0.5px]"
                                aria-label="Other Stuff"
                              >
                                <img
                                  src={profileLogo}
                                  alt="Logo"
                                  width={16}
                                  height={16}
                                  className="object-contain rounded-[3px]"
                                  loading="lazy"
                                />
                              </a>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                      </div>
                      <p className="text-sm md:text-sm text-neutral-600 leading-relaxed">
                        {block.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
                {blocks.map((block, index) => (
                  <div
                    key={block.number ?? block.title}
                    className={`border-t border-neutral-300/70 py-6 last:border-b md:border-b ${
                      index < 2 ? "md:border-t" : "md:border-t-0"
                    }`}
                  >
                    <div className="flex gap-6">
                      {block.number ? (
                        <span className="text-sm text-neutral-500 font-jersey">{block.number}</span>
                      ) : null}
                      <div>
                        <h3 className="text-base font-semibold text-[#201d1d]">
                          {block.title}
                        </h3>
                        <p className="mt-2 text-sm text-neutral-600">{block.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : null}
          {levelUpCards && levelUpCards.length > 0 && (
            <div className="mt-10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-4 sm:px-6 md:px-16 lg:px-24">
              <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 md:overflow-visible md:grid md:grid-cols-4 md:gap-5 max-w-7xl mx-auto items-end md:items-end">
                {levelUpCards.map((card, index) => {
                  // Progressive step-up: cards are same height but offset vertically
                  const stepOffset = index * 32;

                  return (
                    <div
                      key={card.id}
                      className="rounded-2xl bg-[#2a2a2a] p-5 h-[420px] w-[260px] sm:w-[280px] flex-shrink-0 md:flex-shrink md:w-auto flex flex-col transition-all duration-300 ease-out md:hover:-translate-y-1.5 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(161,255,98,0.1)]"
                      style={{ marginBottom: `${stepOffset}px` }}
                    >
                      {/* Top section */}
                      <div className="shrink-0">
                        <span className="text-neutral-500 text-sm font-medium font-jersey">
                          {card.number}
                        </span>
                        <h3 className="text-white text-xl font-semibold mt-3 leading-tight">{card.title}</h3>
                        <p className="text-neutral-400 text-xs mt-3 leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-neutral-700 my-5 shrink-0" />

                      {/* Tags */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2.5 py-1 text-xs font-semibold bg-[#a1ff62] text-black rounded uppercase tracking-wide">
                          {card.primaryTag}
                        </span>
                        {card.secondaryTag && (
                          <span className="px-2.5 py-1 text-xs font-medium text-neutral-400 border border-neutral-600 rounded flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <circle cx="12" cy="12" r="10" strokeWidth="2" />
                              <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
                            </svg>
                            {card.secondaryTag}
                          </span>
                        )}
                      </div>

                      {/* Summary box */}
                      <div className="mt-4 flex-1 rounded-xl bg-[#1a1a1a] px-4 flex flex-col">
                        {card.summaryItems.map((item, itemIndex) => (
                          <div key={item.number} className="flex-1 flex items-center border-b border-neutral-800 last:border-b-0">
                            <div className="flex items-baseline gap-3">
                              <span className="text-[#a1ff62] text-xs font-medium font-jersey shrink-0">
                                {item.number}
                              </span>
                              <span className="text-white text-xs">{item.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}

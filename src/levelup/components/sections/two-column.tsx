
import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";
import { Button } from "@/levelup/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

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
  layout?: "default" | "split" | "dualFocus";
  splitReverse?: boolean;
  splitImage?: string;
  splitImageAlt?: string;
  splitVideo?: string;
  splitBlocks?: Array<{
    title: string;
    body: string;
  }>;
  dualColumns?: Array<{
    title: string;
    metaTags?: string[];
    introBody?: string;
    buildBody?: string;
    leaveWith?: string;
    label?: string;
    emphasis?: boolean;
    cta?: {
      label: string;
      href: string;
    };
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
  levelUpCardsLayout?: "staggered" | "flat";
  levelUpCardsMaxWidth?: "default" | "wide";
  levelUpCardsSize?: "default" | "uniform";
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  hideTitle?: boolean;
  bodyVariant?: "default" | "display";
  blocksVariant?: "numbered" | "feature" | "profile" | "expandable";
  textAlign?: "center" | "left";
  maxWidth?: "default" | "wide";
  expandableCardSize?: "default" | "large" | "uniform";
  expandableCardsLayout?: "container" | "fullBleed";
  expandableCardsMaxWidth?: "default" | "wide";
  bodyMaxWidth?: string;
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
  dualColumns,
  blocks,
  levelUpCards,
  levelUpCardsLayout = "staggered",
  levelUpCardsMaxWidth = "default",
  levelUpCardsSize = "default",
  faqItems,
  bodyLinks,
  bodyMobileSplitOn,
  bodyMobileSplitParas,
  anchorId,
  profileLogo,
  hideTitle = false,
  bodyVariant = "default",
  blocksVariant = "numbered",
  textAlign = "center",
  maxWidth = "default",
  expandableCardSize = "default",
  expandableCardsLayout = "container",
  expandableCardsMaxWidth = "default",
  bodyMaxWidth,
}: TwoColumnProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const isCentered = textAlign === "center";
  const isWide = maxWidth === "wide";
  const isLargeCards = expandableCardSize === "large";
  const isUniformExpandable = expandableCardSize === "uniform";
  const isFullBleedExpandable = expandableCardsLayout === "fullBleed";
  const expandableMaxWidth =
    expandableCardsMaxWidth === "wide" ? "max-w-[90rem]" : "max-w-7xl";
  const isFlatCards = levelUpCardsLayout === "flat";
  const cardsMaxWidth = levelUpCardsMaxWidth === "wide" ? "max-w-[90rem]" : "max-w-7xl";
  const isUniformCards = levelUpCardsSize === "uniform";

  const bodyClassName =
    bodyVariant === "display"
      ? `mt-4 text-2xl sm:text-3xl md:text-4xl leading-snug text-[#201d1d] ${isCentered ? "text-center" : "text-left"}`
      : `mt-8 text-sm md:text-base text-[#201d1d]${singleColumn ? ` ${isCentered ? "text-center" : "text-left"} mb-8` : " mb-8"}`;

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

    return <p className={className} style={{ whiteSpace: "pre-line" }}>{renderBody()}</p>;
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

  if (layout === "dualFocus") {
    return (
      <Section id={anchorId || id} className="min-h-[75vh]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto py-16 md:py-20"
          >
            {!hideTitle ? (
              <h2 className={`font-anton text-[40px] tracking-tight leading-tight uppercase ${isCentered ? "text-center" : "text-left"}`}>
                {title}
              </h2>
            ) : null}
            <p
              className={`mt-6 text-sm md:text-base text-[#201d1d] ${isCentered ? "text-center mx-auto" : "text-left"}`}
              style={{ whiteSpace: "pre-line", paddingBottom: "4.5rem", maxWidth: "46rem" }}
            >
              {renderBody()}
            </p>

            {dualColumns && dualColumns.length > 0 ? (
              <div
                className="mt-10 relative grid gap-y-12 lg:grid-cols-2 gap-x-12 px-8"
              >
                {dualColumns.map((column, index) => {
                  const isEmphasis = column.emphasis;
                  const isPrimaryColumn = index === 0;
                  return (
                    <article
                      key={`${column.title}-${index}`}
                      className={`w-full text-center flex flex-col items-center${isPrimaryColumn ? " border border-neutral-200" : ""}`}
                      style={{
                        maxWidth: "30rem",
                        justifySelf: index === 0 ? "end" : "start",
                        borderRadius: isPrimaryColumn ? "20px" : undefined,
                        boxShadow: isPrimaryColumn
                          ? "0 18px 40px rgba(15, 15, 15, 0.12)"
                          : undefined,
                      }}
                    >
                      <div style={{ padding: "2.5rem 2.25rem" }}>
                        {column.label ? (
                          <span
                            className={`inline-flex px-2.5 py-1 text-[11px] font-semibold rounded uppercase tracking-wide ${
                              isEmphasis
                                ? "bg-[#a1ff62] text-black"
                                : "bg-neutral-100 text-[#201d1d] border border-neutral-300"
                            }`}
                          >
                            {column.label}
                          </span>
                        ) : null}
                        <h3 className="mt-6 font-anton text-[34px] leading-tight uppercase text-[#201d1d]">
                          {column.title}
                        </h3>
                        <div className="mt-8 space-y-8" style={{ maxWidth: "26rem" }}>
                          {column.metaTags && column.metaTags.length > 0 ? (
                            <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
                              {column.metaTags.map((tag, tagIndex) => (
                                <span
                                  key={`${tag}-${tagIndex}`}
                                  className="inline-flex px-2.5 py-1 text-[11px] font-semibold rounded uppercase tracking-wide bg-neutral-100 text-[#201d1d] border border-neutral-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          {column.introBody ? (
                            <div className="pb-1">
                              <p className="text-sm leading-relaxed text-neutral-700">{column.introBody}</p>
                            </div>
                          ) : null}

                          {column.cta ? (
                            <Button size="lg" asChild className="group hover:bg-[#a1ff62] hover:text-black">
                              <a href={column.cta.href} target="_blank" rel="noopener noreferrer">
                                {column.cta.label}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </a>
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : null}
          </motion.div>
        </Container>
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
          className={isWide ? "max-w-6xl mx-auto" : "max-w-5xl mx-auto"}
        >
          {!hideTitle ? (
            <h2
              className={`font-anton text-[40px] tracking-tight leading-tight uppercase ${
                isCentered ? "text-center" : "text-left"
              }`}
            >
              {title}
            </h2>
          ) : null}
          {(() => {
            const bodyWidthClass = singleColumn
              ? bodyVariant === "display"
                ? `${isCentered ? "max-w-3xl mx-auto" : "max-w-3xl mr-auto"}`
                : `${isCentered ? "max-w-[40rem] mx-auto" : "max-w-[40rem] mr-auto"}`
              : "md:columns-2 md:gap-10";
            const bodyElement = renderDefaultBody(`${bodyClassName} ${bodyWidthClass}`);

            if (bodyMaxWidth && React.isValidElement(bodyElement)) {
              return React.cloneElement(bodyElement, {
                style: { ...(bodyElement.props.style || {}), maxWidth: bodyMaxWidth },
              });
            }

            return bodyElement;
          })()}
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
            ) : blocksVariant === "expandable" ? (
              <div
                className={
                  isFullBleedExpandable
                    ? "mt-6 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-4 sm:px-6 md:px-16 lg:px-24"
                    : "mt-6"
                }
              >
                <div
                  className={`grid gap-6 md:grid-cols-4 ${isUniformExpandable ? "md:gap-6" : ""} ${
                    isFullBleedExpandable ? `${expandableMaxWidth} mx-auto` : ""
                  }`}
                >
                  {blocks.map((block) => (
                    <div
                      key={block.number ?? block.title}
                      className={`rounded-2xl bg-[#2a2a2a] shadow-xl transition-all duration-300 ease-out md:hover:-translate-y-1.5 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(161,255,98,0.1)] ${
                        isUniformExpandable
                          ? "p-6 h-[440px] w-[280px] sm:w-[300px] md:w-full"
                          : isLargeCards
                            ? "p-4 md:p-5"
                            : "p-3"
                      }`}
                    >
                    <div
                      className="rounded-xl overflow-hidden bg-white"
                      style={
                        isUniformExpandable
                          ? { marginLeft: "-12px", marginRight: "-12px", marginTop: "-12px", marginBottom: "16px" }
                          : undefined
                      }
                    >
                        {block.image ? (
                          <img
                            src={block.image}
                            alt={block.title}
                            className={`w-full object-cover ${
                              isUniformExpandable
                                ? "h-[190px] md:h-[200px]"
                                : isLargeCards
                                  ? "h-[175px] md:h-[185px]"
                                  : "h-[150px]"
                            }`}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className={`w-full bg-neutral-200 ${
                              isUniformExpandable
                                ? "h-[190px] md:h-[200px]"
                                : isLargeCards
                                  ? "h-[175px] md:h-[185px]"
                                  : "h-[150px]"
                            }`}
                          />
                        )}
                      </div>
                      <div
                        className={
                          isUniformExpandable
                            ? "pt-4"
                            : isLargeCards
                              ? "px-3 pt-4 pb-3"
                              : "px-2 pt-3 pb-2"
                        }
                      >
                        <span className="text-sm font-medium font-jersey text-neutral-400">
                          {block.number}
                        </span>
                        <h3 className="mt-2 text-xl font-semibold leading-tight text-white">
                          {block.title}
                        </h3>
                        {block.body ? (
                          <p className="mt-2 text-sm leading-relaxed text-white/70">
                            {block.body}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
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
              <div
                className={`flex gap-4 overflow-x-auto pb-4 md:pb-0 md:overflow-visible md:grid md:grid-cols-4 md:gap-6 ${cardsMaxWidth} mx-auto ${
                  isFlatCards ? "items-start md:items-stretch" : "items-end md:items-end"
                }`}
              >
                {levelUpCards.map((card, index) => {
                  // Progressive step-up: cards are same height but offset vertically
                  const stepOffset = isFlatCards ? 0 : index * 32;

                  return (
                    <div
                      key={card.id}
                      className={`rounded-2xl bg-[#2a2a2a] flex-shrink-0 md:flex-shrink flex flex-col transition-all duration-300 ease-out md:hover:-translate-y-1.5 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(161,255,98,0.1)] ${
                        isUniformCards
                          ? "p-6 h-auto w-[280px] sm:w-[300px] md:w-full"
                          : "p-5 h-[420px] w-[260px] sm:w-[280px] md:w-full"
                      }`}
                      style={stepOffset ? { marginBottom: `${stepOffset}px` } : undefined}
                    >
                      <div className="mt-auto">
                        <span className="text-neutral-500 text-sm font-medium font-jersey">
                          {card.number}
                        </span>
                        <h3 className="text-white text-xl font-semibold mt-3 leading-tight">{card.title}</h3>
                        <p className="text-white/70 text-sm mt-3 leading-relaxed">
                          {card.description}
                        </p>

                        {/* Divider */}
                        <div className="border-t border-neutral-700 my-5" />

                        {/* Tags */}
                        <div className="flex items-center gap-2">
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
                      </div>

                      {/* Summary box */}
                      {card.summaryItems.length > 0 ? (
                        <div className="mt-4 flex-1 rounded-xl bg-[#1a1a1a] px-4 flex flex-col">
                          {card.summaryItems.map((item) => (
                            <div
                              key={item.number}
                              className="flex-1 flex items-center border-b border-neutral-800 last:border-b-0"
                            >
                              <div className="flex items-baseline gap-3">
                                <span className="text-[#a1ff62] text-xs font-medium font-jersey shrink-0">
                                  {item.number}
                                </span>
                                <span className="text-white text-xs">{item.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
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

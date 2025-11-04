"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

import { TextEffect } from "@/components/motion-primitives/text-effect";

import { FaUser } from "react-icons/fa6";

const DURATION = 5000;
const BAR_WIDTH = 50;
const CIRCLE_SIZE = 12;

interface TestimonialsProps {
  testimonials: TestimonialsType | null;
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonialsList = testimonials?.testimonials;

  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (testimonialsList) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonialsList.length);
      }, DURATION);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [index, testimonialsList]);

  if (!testimonialsList || testimonialsList?.length === 0) return;

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-linear-to-t from-zinc-900 lg:min-h-180 relative flex flex-col justify-center items-center py-16"
    >
      {/* Copper Forge Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%)",
        }}
      />
      {/* Your Content/Components */}

      <TextEffect
        per="word"
        preset="blur"
        as="h2"
        speedReveal={0.3}
        speedSegment={0.3}
        trigger={inView}
        className="text-5xl lg:text-7xl font-semibold mb-14 text-primary-5"
      >
        آراء النزلاء
      </TextEffect>

      <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
        <div className="min-h-[120px] w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-foreground mb-8 text-center text-2xl leading-tight font-semibold md:text-4xl"
            >
              “{testimonialsList[index].content}”
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="flex w-full max-w-lg items-center justify-center gap-8 pt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="bg-foreground/10 h-12 w-12 rounded-full border flex items-center justify-center">
                <FaUser className="text-muted-foreground size-6" />
              </div>

              <div className="border-muted-foreground/30 mx-4 h-8 border-l" />
              <div className="text-left">
                <div className="text-foreground text-lg font-medium">
                  {testimonialsList[index].name}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Progress Bar & Circles Indicator */}
        <div className="mx-auto mt-8 flex w-full max-w-lg justify-center gap-3">
          {testimonialsList.map((testimonial, i) => {
            const isActive = i === index;
            return (
              <motion.span
                key={`testimonial-${testimonial.name}-${i}`}
                layout
                initial={false}
                animate={{
                  width: isActive ? BAR_WIDTH : CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  borderRadius: isActive ? 8 : 999,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4,
                }}
                className="bg-foreground/10 relative block overflow-hidden"
                style={{
                  minWidth: CIRCLE_SIZE,
                  maxWidth: BAR_WIDTH,
                  border: "none",
                }}
              >
                {isActive && (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    className="bg-brand absolute top-0 left-0 rtl:right-0 h-full rounded-lg bg-primary-5"
                  />
                )}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@/components/ui/accordion";
import { Carousel } from "@/components/ui/skiper-ui/skiper51";
import { TimelineContent } from "@/components/ui/timeline-animation";
import VerticalCutReveal from "@/components/ui/vertical-cut-reveal";
import { TextEffect } from "@/components/motion-primitives/text-effect";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRef } from "react";

interface FacilitiesProps {
  facilities: FacilitiesType | null;
  className?: string;
}

const Facilities = ({ facilities, className }: FacilitiesProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(20px)",
      y: 40,
      opacity: 0,
    },
  };

  return (
    <section
      id="facilities"
      className={cn(
        className,
        "bg-linear-to-t from-background/70 via-background/0 to-background/0"
      )}
    >
      <div className="sm:p-10 p-4 mx-auto min-h-screen w-full shadow-sm">
        <div className="max-w-7xl mx-auto sm:flex justify-between items-end">
          <h2 className="xl:text-[10rem] lg:text-8xl md:text-7xl text-6xl text-primary-1 pt-4 lg:-space-y-10 -space-y-4 leading-normal">
            <VerticalCutReveal
              splitBy="word"
              staggerDuration={0.05}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              المرافق
            </VerticalCutReveal>
            <VerticalCutReveal
              splitBy="word"
              staggerDuration={0.05}
              containerClassName="lg:pl-32 md:pl-16 pl-6 leading-[140%]"
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              والأنشطة
            </VerticalCutReveal>
          </h2>
          <div className="sm:w-96 space-y-5 sm:pt-0 pt-4 text-zinc-300">
            <p className="text-lg font-light text-end text-zinc-50">
              في روز الحديقة الشفا نؤمن أن الهدوء رفاهية.
            </p>
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              reverse={true}
              wordLevelClassName="text-sm text-light text-justify"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 30,
                delay: 0,
              }}
            >
              أنشأنا هذا المكان ليكون وجهتك بين الغيوم، حيث يجتمع جمال الطبيعة
              مع راحة الإقامة.
            </VerticalCutReveal>
          </div>
        </div>
        <div className="mt-3 max-w-7xl mx-auto py-10" ref={heroRef}>
          <Accordion defaultValue="item-0">
            {facilities?.accordions.map(({ title, items, images }, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="mb-0 rounded-none bg-transparent w-full"
              >
                <TimelineContent
                  key={i}
                  animationNum={i}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className=" border-t border-neutral-800 py-2"
                >
                  <AccordionHeader
                    customIcon
                    className="hover:no-underline p-0  py-2 relative data-active:bg-transparent hover:bg-transparent text-black sm:text-base text-sm"
                  >
                    <div className="lg:w-160 md:w-120 sm:w-96 flex items-center justify-between">
                      <span className="relative group-data-active:rotate-90 text-neutral-600 p-2 -translate-x-1 rounded-xl">
                        <Plus className="group-data-active:rotate-90 transition-all duration-300" />
                      </span>

                      <h1 className="font-medium md:text-6xl sm:text-5xl text-3xl uppercase text-zinc-400 group-data-active:text-primary-1">
                        {title}
                      </h1>
                    </div>

                    <p className="pe-2 md:text-8xl sm:text-6xl text-3xl sm:font-extralight font-normal text-zinc-400 group-data-active:text-primary-1 uppercase">
                      0{i + 1}
                    </p>
                  </AccordionHeader>
                </TimelineContent>
                <TimelineContent
                  animationNum={i}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                >
                  <AccordionPanel
                    className="space-y-4 w-full mx-auto bg-transparent data-active:bg-transparent px-0 text-zinc-50"
                    galleryClassName="px-0 bg-transparent ml-auto"
                  >
                    {items && (
                      <ul className="text-sm sm:text-xl px-5">
                        <TextEffect
                          per="line"
                          as="p"
                          segmentWrapperClassName="overflow-hidden block"
                          variants={{
                            container: {
                              hidden: { opacity: 0 },
                              visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 },
                              },
                            },
                            item: {
                              hidden: {
                                opacity: 0,
                                y: 40,
                              },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  duration: 0.4,
                                },
                              },
                            },
                          }}
                        >
                          {items?.map((item) => item).join("\n")}
                        </TextEffect>
                      </ul>
                    )}

                    {images && (
                      <div className="relative w-full h-fit" dir="ltr">
                        <Carousel
                          className="flex h-full w-full items-center justify-center overflow-hidden"
                          images={images}
                          showPagination={true}
                          loop={true}
                          autoplay={true}
                          spaceBetween={0}
                        />
                      </div>
                    )}
                  </AccordionPanel>
                </TimelineContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Facilities;

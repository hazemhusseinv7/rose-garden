import { getHeroData } from "@/lib/sanity/queries";
import { TextEffect } from "./motion-primitives/text-effect";
import BackgroundMedia from "./ui/bg-media";
import { cn } from "@/lib/utils";

const Hero = async () => {
  const data: HeroType | null = await getHeroData();

  if (!data) return;

  const title = data.title.split("\n") || [];
  const desktopVideo = data.backgroundVideo.asset.url;
  const mobileVideo = data.backgroundVideoMobile?.asset.url;
  const altText = data.videoAltText || "Background video";

  return (
    <section id="hero" className="relative h-screen">
      <div className="w-full">
        <div className="md:min-w-[20rem]">
          <div className="hidden md:block">
            <BackgroundMedia
              type="video"
              variant="dark"
              src={desktopVideo}
              alt={altText}
            />
          </div>
          <div className="md:hidden">
            <BackgroundMedia
              type="video"
              variant="dark"
              src={mobileVideo ? mobileVideo : desktopVideo}
              alt={altText}
            />
          </div>
        </div>
      </div>

      <div
        dir="ltr"
        className="absolute inset-0 z-10 size-full flex flex-col justify-center text-center text-white font-lora uppercase"
      >
        {title.map((line, i) => (
          <TextEffect
            key={i}
            per="char"
            preset="fade"
            delay={0.5 + i * 1}
            as={i === 0 ? "h1" : "div"}
            className={cn(
              i === 0
                ? "text-xl lg:text-3xl font-light"
                : "text-4xl lg:text-8xl font-medium"
            )}
          >
            {line}
          </TextEffect>
        ))}
      </div>
    </section>
  );
};

export default Hero;

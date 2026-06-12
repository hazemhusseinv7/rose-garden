import { Link } from "@/i18n/navigation";
import { GoArrowUpRight } from "react-icons/go";
import { cn } from "@/lib/utils";

interface BlogCTAProps {
  cta: BlogCTA;
  className?: string;
}

const BlogCTA = ({ cta, className }: BlogCTAProps) => {
  const isPrimary = cta.ctaVariant !== "secondary";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 sm:p-10 mt-12",
        isPrimary
          ? "bg-gradient-to-br from-primary-1 to-primary-1/20 text-white"
          : "bg-white/5 border border-white/10 dark:bg-white/5",
        className,
      )}
    >
      {isPrimary && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(221, 161, 94, 0.5), transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex-1">
          <h3
            className={cn(
              "text-xl sm:text-2xl font-bold mb-2",
              isPrimary ? "text-white" : "text-gray-900 dark:text-white",
            )}
          >
            {cta.ctaTitle}
          </h3>
          {cta.ctaDescription && (
            <p
              className={cn(
                "text-sm sm:text-base leading-relaxed",
                isPrimary
                  ? "text-white/80"
                  : "text-gray-600 dark:text-neutral-400",
              )}
            >
              {cta.ctaDescription}
            </p>
          )}
        </div>

        <Link
          href={cta.ctaButtonUrl}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out shrink-0",
            isPrimary
              ? "bg-white text-primary-2 hover:bg-primary-3 hover:gap-3"
              : "bg-primary-1 hover:bg-primary-2 text-white shadow-lg shadow-primary-1/20 hover:shadow-primary-1/40 hover:gap-3",
          )}
        >
          {cta.ctaButtonText}
          <GoArrowUpRight className="rtl:rotate-270 size-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCTA;

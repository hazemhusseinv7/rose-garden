"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/react";

interface BlogPaginationClientProps {
  currentPage: number;
  totalPages: number;
}

const BlogPaginationClient = ({
  currentPage,
  totalPages,
}: BlogPaginationClientProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center">
      <Pagination
        page={currentPage}
        total={totalPages}
        showControls
        showShadow
        color="primary"
        size="lg"
        classNames={{
          prev: "rotate-180",
          next: "rotate-180",
        }}
        onChange={(page) => {
          const params = new URLSearchParams(searchParams.toString());
          if (page > 1) {
            params.set("page", String(page));
          } else {
            params.delete("page");
          }
          const search = params.toString();
          router.push(`${pathname}${search ? `?${search}` : ""}`);
        }}
      />
    </div>
  );
};

export default BlogPaginationClient;

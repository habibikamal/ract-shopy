"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const pagesToShow = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).slice(0, 10); // محدودیت برای جلوگیری از زیاد شدن صفحات

  return (
    <div className="flex justify-center items-center gap-2 py-6">

      {/* Previous */}
      <button
        disabled={currentPage <= 1}
        onClick={() => goTo(currentPage - 1)}
        className="px-3 py-1 border rounded-lg disabled:opacity-40"
      >
        قبلی
      </button>

      {/* Page Numbers */}
      {pagesToShow.map((num) => (
        <button
          key={num}
          onClick={() => goTo(num)}
          className={`px-3 py-1 rounded-lg border text-sm 
            ${num === currentPage ? "bg-indigo-600 text-white" : "bg-white"}`}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage >= totalPages}
        onClick={() => goTo(currentPage + 1)}
        className="px-3 py-1 border rounded-lg disabled:opacity-40"
      >
        بعدی
      </button>
    </div>
  );
}

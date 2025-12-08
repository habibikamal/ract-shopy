'use client';
// ProductsTable.tsx
import React, { useMemo, useState } from "react";

type ProductStatus = "active" | "inactive" | "draft";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  createdAt: string;
}

interface ProductsTableProps {
  products?: Product[];          // اگر دادی از این استفاده می‌کنه
  onAddProduct?: () => void;     // هندلر دکمه افزودن محصول
}

const mockData: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Mobile",
    price: 1200,
    stock: 5,
    status: "active",
    createdAt: "2024-09-01",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Mobile",
    price: 999,
    stock: 12,
    status: "active",
    createdAt: "2024-08-15",
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    category: "Accessories",
    price: 249,
    stock: 30,
    status: "inactive",
    createdAt: "2024-07-10",
  },
  {
    id: 4,
    name: "MacBook Air M3",
    category: "Laptop",
    price: 1599,
    stock: 3,
    status: "draft",
    createdAt: "2024-06-02",
  },
];

const statusColors: Record<ProductStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-600",
  draft: "bg-amber-100 text-amber-700",
};
export default function Home({ products,  onAddProduct }: ProductsTableProps) {
  const [search, setSearch] = useState("");

  const data = products ?? mockData;

  const filtered = useMemo(
    () =>
      data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase().trim())
      ),
    [data, search]
  );

  return (

      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-start justify-center p-6">
      <div className="w-full max-w-6xl bg-white dark:bg-zinc-900 rounded-2xl shadow border border-zinc-200/70 dark:border-zinc-800">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-zinc-200/70 dark:border-zinc-800 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              لیست محصولات
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              مدیریت، جستجو و ویرایش محصولات فروشگاه
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو بر اساس نام محصول..."
                className="w-full sm:w-64 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400 text-xs">
                ⌕
              </span>
            </div>

            <button
              type="button"
              onClick={onAddProduct}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-zinc-950"
            >
              <span className="text-lg leading-none">＋</span>
              <span>افزودن محصول</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200/70 dark:border-zinc-800">
                <th className="px-4 py-3 text-right font-medium text-zinc-500">
                  نام محصول
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-500">
                  دسته‌بندی
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-500">
                  قیمت (دلار)
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-500">
                  موجودی
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-500">
                  وضعیت
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-500">
                  تاریخ ایجاد
                </th>
                <th className="px-4 py-3 text-center font-medium text-zinc-500">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-zinc-400"
                  >
                    محصولی مطابق جستجو پیدا نشد.
                  </td>
                </tr>
              )}

              {filtered.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`border-b border-zinc-100 dark:border-zinc-800 ${
                    idx % 2 === 1
                      ? "bg-zinc-50/60 dark:bg-zinc-900/40"
                      : "bg-white dark:bg-zinc-900"
                  }`}
                >
                  <td className="px-4 py-3 text-zinc-900 dark:text-zinc-50 font-medium">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                    {p.price.toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                    {p.stock}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusColors[p.status]}`}
                    >
                      {p.status === "active"
                        ? "فعال"
                        : p.status === "inactive"
                        ? "غیرفعال"
                        : "پیش‌نویس"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                    {p.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                        ویرایش
                      </button>
                      <button className="rounded-lg border border-red-200 dark:border-red-800 px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30">
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-200/70 dark:border-zinc-800 px-6 py-3 text-xs text-zinc-500">
          <span>نمایش {filtered.length} محصول</span>
          <div className="flex gap-2">
            <button className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800">
              قبلی
            </button>
            <button className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800">
              بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
   
  );
 
}

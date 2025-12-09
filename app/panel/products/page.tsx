'use client';

import React, { useEffect, useMemo, useState } from "react";
import AddProductModal from "../componrnts/addProductModal";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { GetProducts } from "@/app/services/products";
import Loading, { FullScreenLoader } from "@/app/shared/components/Loading";

type ProductStatus = "active" | "inactive" | "draft";

interface Product {
  id: number;
  title: string;
  price: number;
  body: string;
  status: ProductStatus;
  created_at: string;
}

const statusColors: Record<ProductStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-600",
  draft: "bg-amber-100 text-amber-700",
};

export default function ProductsTable() {

  const [openModal, setOpenModal] = useState(false);

  // اگر ?create-product وجود داشت → مودال باز شود
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has("create-product")) {
      setOpenModal(true);
    }
  }, [searchParams]);

  // ---------------- Load From API ----------------
  const [page, setPage] = useState(1);
  const { data: productData, error } = useSWR(
    { url: '/panel/products', page },
    GetProducts
  );
console.log('productData:', productData);
  const loadingProducts = !productData && !error;

  const products: Product[] = productData?? [];

  // ---------------- Search ----------------
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [products, search]);

  return (
    <div className="min-h-screen bg-zinc-100 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow border border-zinc-200">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">لیست محصولات</h1>
            <p className="text-sm text-zinc-500 mt-1">مدیریت محصولات فروشگاه</p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="جستجو..."
              className="border border-zinc-300 bg-zinc-50 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={() => setOpenModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
            >
              افزودن محصول
            </button>
          </div>
        </div>

        {/* Loading State */}
       {loadingProducts && (
        <div className="py-10">
          <Loading size={45} color="#6366F1" />
        </div>
)}

            {/* {loadingProducts && <FullScreenLoader />} */}



        {/* Table */}
        {!loadingProducts && (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-100 border-b">
                <th className="px-4 py-3 text-right">نام محصول</th>
                <th className="px-4 py-3 text-right">قیمت</th>
                <th className="px-4 py-3 text-right">توضیحات</th>
                <th className="px-4 py-3 text-right">وضعیت</th>
                <th className="px-4 py-3 text-right">تاریخ ایجاد</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">{p.price.toLocaleString("fa-IR")}</td>
                  <td className="px-4 py-3 text-zinc-600">{p.body}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusColors[p.status]}`}>
                      {p.status === "active" ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{p.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

      {/* Modal */}
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={() => {}}
      />
    </div>
  );
}

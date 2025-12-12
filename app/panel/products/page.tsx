"use client";

import React, { useEffect, useMemo, useState } from "react";
import AddProductModal from "../componrnts/addProductModal";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { DeleteProducts, GetProducts } from "@/app/services/products";
import Loading from "@/app/shared/components/Loading";
import Pagination from "../componrnts/Pagination";
import Swal from "sweetalert2";
import { mutate } from "swr";



// Types
type ProductStatus = "active" | "inactive" | "draft";

interface Product {
  id: number;
  title: string;
  price: number;
  body: string;
  status: ProductStatus;
  created_at: string | number;
}



const statusColors: Record<ProductStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-600",
  draft: "bg-amber-100 text-amber-700",
};

export default function ProductsTable() {

  const router = useRouter();
  const searchParams = useSearchParams();
const [deletingId, setDeletingId] = useState<number | null>(null);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (searchParams.has("create-product")) setOpenModal(true);
  }, [searchParams]);

  // =============== GET PAGE FROM URL ===============
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);

const handleDelete = async (id: number, title: string) => {
  const confirm = await Swal.fire({
    title: "حذف محصول",
    text: `آیا از حذف محصول «${title}» مطمئن هستید؟`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله، حذف شود",
    cancelButtonText: "انصراف",
    reverseButtons: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (!confirm.isConfirmed) return;

  // 🔥 فعال کردن لودینگ برای همین ردیف
  setDeletingId(id);

  try {
    await DeleteProducts(id);

    Swal.fire({
      title: "حذف شد!",
      text: `محصول «${title}» با موفقیت حذف شد.`,
      icon: "success",
      confirmButtonText: "باشه",
    });

    // Refresh SWR
    mutate({ page });

  } catch (error) {
    Swal.fire({
      title: "خطا",
      text: "حذف محصول با خطا مواجه شد.",
      icon: "error",
    });
  }

  // ❗ غیر فعال کردن لودینگ
  setDeletingId(null);
};


const handleEdit = (id: number) => {
  router.push(`/panel/products/productEdit/${id}`);
  // یا ریدایرکت:
  // router.push(`/panel/products/edit/${id}`);
};


  // sync URL → state
  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  // =============== Load API via SWR ===============
  const { data: productData, error } = useSWR(
    { page },
    () => GetProducts({ page, per_page: 5 })
  );

  const loadingProducts = !productData && !error;

  const products: Product[] = productData?.products ?? [];
  const totalPages: number = productData?.totalPages ?? 1;

  // =============== Search ===============
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
              onClick={() => router.push("/panel/products?create-product")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
            >
              افزودن محصول
            </button>
          </div>
        </div>

        {/* Loading */}
        {loadingProducts && (
          <div className="py-10">
            <Loading size={45} color="#6366F1" />
          </div>
        )}

        {/* Table */}
        {!loadingProducts && (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-100 border-b">
                <th className="px-4 py-3 text-right">نام محصول</th>
                <th className="px-4 py-3 text-right">#</th>
                <th className="px-4 py-3 text-right">قیمت</th>
                <th className="px-4 py-3 text-right">توضیحات</th>
                <th className="px-4 py-3 text-right">وضعیت</th>
                <th className="px-4 py-3 text-right">تاریخ ایجاد</th>
                <th className="px-4 py-3 text-right">عملیات</th>

              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-zinc-50 transition">

                  <td className="px-4 py-3 font-medium">{p.id}</td>

                  {/* نام */}
                  <td className="px-4 py-3 font-medium">{p.title}</td>

                  {/* قیمت */}
                  <td className="px-4 py-3">
                    {p.price.toLocaleString("fa-IR")}
                  </td>

                  {/* توضیحات */}
                  <td className="px-4 py-3 text-zinc-600">{p.body}</td>

                  {/* وضعیت */}
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusColors[p.status]}`}>
                      {p.status === "active" ? "فعال" : "غیرفعال"}
                    </span>
                  </td>

                  {/* تاریخ */}
                  <td className="px-4 py-3">
                    {new Date(Number(p.created_at)).toLocaleDateString("fa-IR")}
                  </td>

                  {/* دکمه‌ها */}
                 <td className="px-4 py-3 flex gap-2">

  {/* Edit */}
  <button
    onClick={() => handleEdit(p.id)}
    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
  >
    ویرایش
  </button>

  {/* Delete */}
  <button
    onClick={() => handleDelete(p.id, p.title)}
    disabled={deletingId === p.id}
    className={`px-3 py-1 text-xs rounded text-white transition
        ${deletingId === p.id ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
  >
    {deletingId === p.id ? (
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        حذف...
      </span>
    ) : (
      "حذف"
    )}
  </button>

</td>

                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>

      {/* Pagination Component */}
      {!loadingProducts && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}

      <AddProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}

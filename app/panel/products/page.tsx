'use client';

import React, { useEffect, useMemo, useState } from "react";
import AddProductModal from "../componrnts/addProductModal";
import { Router } from "next/router";
import { useSearchParams } from "next/navigation";

// ---------------- Models ----------------
type ProductStatus = "active" | "inactive" | "draft";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  status: ProductStatus;
  createdAt: string;
}

// ---------------- Dummy Data ----------------
const initialProducts: Product[] = [
  { id: 1, name: "آیفون 15 پرو", price: 120000000, description: "جدیدترین گوشی اپل", status: "active", createdAt: "1403/06/15" },
  { id: 2, name: "سامسونگ S24", price: 98000000, description: "پرچمدار سامسونگ", status: "active", createdAt: "1403/05/21" },
  { id: 3, name: "هدفون سونی XM5", price: 18500000, description: "降噪 عالی", status: "inactive", createdAt: "1403/02/20" },
];

const statusColors: Record<ProductStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-600",
  draft: "bg-amber-100 text-amber-700",
};

// ---------------- Component ----------------
export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // ---------------- Add Product Modal ----------------
  const [openModal, setOpenModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      alert("تمام فیلدها را وارد کنید");
      return;
    }

    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: Number(newProduct.price),
      description: newProduct.description,
      status: "active",
      createdAt: new Date().toLocaleDateString("fa-IR"),
    };

    setProducts([product, ...products]);
    setOpenModal(false);

    // reset form
    setNewProduct({ name: "", price: "", description: "" });
  };

   // اگر کاربر ?create-product زد → مودال باز شود
   const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has("create-product")) {
      setOpenModal(true);
    }
  }, [searchParams]);


  // ---------------- Search ----------------
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase().trim())
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

            {/* Search */}
            <input
              type="text"
              placeholder="جستجو..."
              className="border border-zinc-300 bg-zinc-50 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Add Product Button */}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
            >
              افزودن محصول
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-100 border-b">
              <th className="px-4 py-3 text-right">نام محصول</th>
              <th className="px-4 py-3 text-right">قیمت</th>
              <th className="px-4 py-3 text-right">درباره محصول</th>
              <th className="px-4 py-3 text-right">وضعیت</th>
              <th className="px-4 py-3 text-right">تاریخ ایجاد</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.price.toLocaleString("fa-IR")}</td>
                <td className="px-4 py-3 text-zinc-600">{p.description}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${statusColors[p.status]}`}>
                    {p.status === "active" ? "فعال" : "غیرفعال"}
                  </span>
                </td>
                <td className="px-4 py-3">{p.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Modal Add Product ================= */}
     {/* مودال */}
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}

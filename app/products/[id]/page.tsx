import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

interface Product {
  id: number;
  title: string;
  category: string;
  body: string;
  price: number;
  user_id: number;
  created_at: number;
}

async function getSingleProduct(id: string): Promise<Product> {
  const res = await fetch(
    `http://localhost:5000/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const data = await res.json();
  return data.product;
}

/* ✅ نام درست + await params */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params; // 👈 مهم
  const product = await getSingleProduct(resolvedParams.id);

  return {
    title: product.title,
    description: product.body.substring(0, 120),
  };
}

export default async function ProductSingleProduct({ params }: Props) {
  const resolvedParams = await params;
  const product = await getSingleProduct(resolvedParams.id);

  return (
    <div
      className="mx-auto mt-10 max-w-2xl rounded-xl bg-white p-6 shadow"
      dir="rtl"
    >
      <h1 className="mb-4 text-2xl font-bold">
        {product.title}
      </h1>

      <p className="mb-6 leading-7 text-gray-700">
        {product.body}
      </p>

      <div className="flex justify-between border-t pt-4 text-sm text-gray-600">
        <span>
          قیمت: {product.price.toLocaleString("fa-IR")} تومان
        </span>

        <span>
          تاریخ ثبت:{" "}
          {new Date(product.created_at).toLocaleDateString("fa-IR")}
        </span>
      </div>
    </div>
  );
}

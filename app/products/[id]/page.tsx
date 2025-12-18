interface Props {
  params: {
    id: string;
  };
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
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  console.log(data);
  return data.product;
}

export default async function ProductSingleProduct({ params }: Props) {
  const product = await getSingleProduct(params.id);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">
        {product.title}
      </h1>

      <p className="text-gray-700 leading-7 mb-6">
        {product.body}
      </p>

      <div className="flex justify-between text-sm text-gray-600 border-t pt-4">
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

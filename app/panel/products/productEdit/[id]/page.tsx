"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import Input from "@/app/shared/components/Input";
import Textarea from "@/app/shared/components/Textarea";
import Select from "@/app/shared/components/Select";
import RadioGroup from "@/app/shared/components/RadioGroup";

import callApi from "@/app/helpers/callApi";
import ValidationErrors from "@/app/exceptions/validationErroe";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/app/shared/components/Loading";
import { EditProductDto } from "@/app/contracts/productCreateDto";
import { EditProductsApi } from "@/app/services/products";


// ---------------- Yup Validation ----------------
const validationSchema = yup.object().shape({
  title: yup.string().required("نام محصول الزامی است"),
  body: yup.string().required("توضیحات محصول الزامی است"),
  price: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .min(1, "قیمت باید بیشتر از صفر باشد")
    .required("قیمت الزامی است"),
  category: yup.string().required("دسته‌بندی الزامی است"),
  status: yup.string().required("وضعیت الزامی است"),
});

export default function EditProduct() {
  
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  // مقادیر اولیه وارد شده در فرم
  const [initialValues, setInitialValues] = useState<EditProductDto>({
    title: "",
    body: "",
    price: "",
    category: "",
    status: "",
  });

  // ---------------- Load Product For Edit ----------------
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await callApi().get(`/products/${id}`);

        setInitialValues({
          title: res.data.product.title,
          body: res.data.product.body,
          price: res.data.product.price,
          category: res.data.product.category,
          status: res.data.product.status,
        });

      } catch (error) {
        toast.error("خطا در دریافت اطلاعات محصول ❌");
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  // ---------------- Loading State ----------------
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loading size={55} color="#6366F1" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-xl" dir="rtl">

      <h2 className="text-xl font-semibold mb-5">ویرایش محصول</h2>

      <Formik<EditProductDto>
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError }) => {
  try {
    const payload = {
      ...values,
      price: Number(values.price),
    };

    const res = await EditProductsApi(Number(id), payload);

    if (res.status === 200) {
      toast.success("محصول با موفقیت ویرایش شد! 🎉");
      router.push("/panel/products");
    }

  } catch (error: any) {
    toast.error("خطا در ویرایش محصول ❌");

    if (error instanceof ValidationErrors) {
      Object.entries(error.messages).forEach(([field, msg]) => {
        setFieldError(field, msg as string);
      });
      return;
    }

    if (error?.response?.data?.errors) {
      Object.entries(error.response.data.errors).forEach(([field, msg]) => {
        setFieldError(field, msg as string);
      });
      return;
    }
  }
}}

      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">

            <Input name="title" label="نام محصول" />
            <Input name="price" type="number" label="قیمت" />
            <Textarea name="body" label="توضیحات محصول" />

            <Select
              name="category"
              label="دسته‌بندی"
              options={[
                { value: "mobile", label: "موبایل" },
                { value: "laptop", label: "لپ‌تاپ" },
                { value: "accessory", label: "لوازم جانبی" },
              ]}
            />

            <RadioGroup
              name="status"
              label="وضعیت"
              options={[
                { value: "active", label: "فعال" },
                { value: "inactive", label: "غیرفعال" },
              ]}
            />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => router.push("/panel/products")}
                className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
              >
                انصراف
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                ذخیره تغییرات
              </button>
            </div>

          </Form>
        )}
      </Formik>

    </div>
  );
}

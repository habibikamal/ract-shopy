"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import Input from "@/app/shared/components/Input";
import Textarea from "@/app/shared/components/Textarea";
import Select from "@/app/shared/components/Select";
import RadioGroup from "@/app/shared/components/RadioGroup";

import callApi from "@/app/helpers/callApi";
import ValidationErrors from "@/app/exceptions/validationErroe";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("نام محصول الزامی است"),
  body: yup.string().required("توضیحات محصول الزامی است"),
  price: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .min(1, "قیمت باید بزرگ‌تر از صفر باشد")
    .required("قیمت الزامی است"),
  category: yup.string().required("دسته‌بندی الزامی است"),
  status: yup.string().required("وضعیت محصول الزامی است"),
});

export default function AddProductModal({
  open,
  onClose,
}: AddProductModalProps) {
  if (!open) return null;

  const router = useRouter();

  const initialValues = {
    title: "",
    body: "",
    price: "",
    category: "",
    status: "",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">

        <h2 className="text-lg font-semibold mb-4">افزودن محصول جدید</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setFieldError, setStatus }) => {
            try {
              const payload = {
                title: values.title,
                body: values.body,
                category: values.category,
                price: Number(values.price),
              };

              const res = await callApi().post("/products/create", payload);

              if (res.status === 200) {
                toast.success("محصول با موفقیت ثبت شد! 🎉");

                resetForm();
                onClose();
                router.push("/panel/products");
              }

            } catch (error: any) {
              console.log("ERROR:", error);

              toast.error("خطا در ثبت محصول ❌");

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

              if (error?.response?.data?.message) {
                setStatus(error.response.data.message);
                return;
              }
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="flex flex-col gap-4">

              {status && (
                <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
                  {status}
                </div>
              )}

              <Input name="title" label="نام محصول" placeholder="مثال: آیفون ۱۵" />
              <Input name="price" type="number" label="قیمت (تومان)" />

              <Textarea name="body" label="توضیحات" />

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
                label="وضعیت محصول"
                options={[
                  { value: "active", label: "فعال" },
                  { value: "inactive", label: "غیرفعال" },
                ]}
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-zinc-400 rounded-lg hover:bg-zinc-100"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  ثبت محصول
                </button>
              </div>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
}

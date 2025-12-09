"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { CreateProductInterface } from "@/app/contracts/productCreateDto";
import Input from "@/app/shared/components/Input";
import Textarea from "@/app/shared/components/Textarea";
import Select from "@/app/shared/components/Select";
import RadioGroup from "@/app/shared/components/RadioGroup";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: CreateProductInterface) => void;
}

// ---------------- Yup Validation Schema ----------------
const validationSchema = yup.object().shape({
  name: yup.string().required("نام محصول الزامی است"),

  price: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .min(1, "قیمت باید بزرگ‌تر از صفر باشد")
    .required("قیمت الزامی است"),

  description: yup.string().required("توضیحات الزامی است"),

  category: yup.string().required("دسته‌بندی الزامی است"),

  status: yup.string().required("وضعیت محصول الزامی است"),
});

export default function AddProductModal({
  open,
  onClose,
  onSubmit,
}: AddProductModalProps) {

  if (!open) return null;

  const initialValues: CreateProductInterface = {
    name: "",
    price: 0,
    description: "",
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
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">

              <Input name="name" label="نام محصول" placeholder="مثال: آیفون" />

              <Input name="price" type="number" label="قیمت محصول" />

              <Textarea name="description" label="توضیحات محصول" />

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
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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

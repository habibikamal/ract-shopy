"use client";

import { Formik, Form } from "formik";
import * as yup from "yup";
import Input from "@/app/shared/components/Input";
import { InterfaceRegisterFormMobileValues } from "@/app/contracts/auth/modelAuth";
import callApi from "@/app/helpers/callApi";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("نام الزامی است")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

  phone: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثل 09121234567)"),
});

export default function RegisterFormM() {
  const initialValues: InterfaceRegisterFormMobileValues = {
    name: "",
    phone: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log("Form Submitted:", values);

        const res = await callApi().post("auth/register", values, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (res.status === 201) {
          // success logic
        }

        console.log(res.data);
      }}
    >
      <Form className="space-y-6">
        <Input name="name" type="text" label="Full Name" />
        <Input name="phone" type="text" label="Mobile Number" />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
}

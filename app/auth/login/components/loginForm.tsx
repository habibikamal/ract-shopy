"use client";

import { Formik, Form } from "formik";
import * as yup from "yup";
import Input from "@/app/shared/components/Input";
import { InterfaceLoginFormValues } from "@/app/contracts/auth/modelAuth";
import callApi from "@/app/helpers/callApi";
import ValidationErrors from "@/app/exceptions/validationErroe";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 chars"),
});

export default function LoginForm() {
  const initialValues: InterfaceLoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setFieldError, setStatus }) => {
        try {
          const res = await callApi().post("auth/login", values, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          if (res.status === 200) {
            const token = res.data.token;

            await fetch("/api/auth/store-token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            });

            // TODO: redirect
          }
        } catch (error: any) {
          console.log("ERROR:", error);
          setStatus("Something went wrong. Please try again.");
          // ----------------------------------
          // نوع اول: ValidationErrors کلاس داخلی
          // ----------------------------------
          if (error instanceof ValidationErrors) {
            Object.entries(error.messages).forEach(([field, message]) => {
              setFieldError(field, message as string);
            });
            return;
          }

          // ----------------------------------
          // نوع دوم: خطاهای ولیدیشن سرور (ساختار Laravel/ASP.NET)
          // ----------------------------------
          if (error?.response?.data?.errors) {
            Object.entries(error.response.data.errors).forEach(
              ([field, message]) => {
                setFieldError(field, message as string);
              }
            );
            return;
          }

          // ----------------------------------
          // نوع سوم: پیام خطای عمومی
          // ----------------------------------
          if (error?.response?.data?.message) {
            setStatus(error.response.data.message);
            return;
          }

          // خطای ناشناخته
          setStatus("Unexpected error occurred. Please try again.");
        }
      }}
    >
      {({ status }) => (
        <Form className="space-y-6">
          {status && (
            <div className="text-red-500 text-sm bg-red-100 p-2 rounded">
              {status}
            </div>
          )}

          <Input name="email" type="email" label="Email Address" />
          <Input name="password" type="password" label="Password" />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

"use client";

import { Formik, Form } from "formik";
import * as yup from "yup";
import Input from "@/app/shared/components/Input";
import { InterfaceLoginFormMobileValues } from "@/app/contracts/auth/modelAuth";
import callApi from "@/app/helpers/callApi";
import ValidationErrors from "@/app/exceptions/validationErroe";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/app/hooks";
import { updatePhoneVerifyToken } from "@/app/store/auth";




const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مانند 09121234567)"),
});

export default function LoginFormMobile() {
  const initialValues: InterfaceLoginFormMobileValues = {
    phone: "",
  };
  const router=useRouter();
  const dispatch = useAppDispatch();
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

          console.log(res.data)
          if (res.status === 200) {
            const token = res.data.token;
            //localStorage.setItem('phone-verify-token',res.data.token)

               // ذخیره در Redux Toolkit
            dispatch(updatePhoneVerifyToken(token));
          


           
            router.push("/auth/otp");
            

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

          <Input name="phone" type="text" label="Mobile Number" />
          

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

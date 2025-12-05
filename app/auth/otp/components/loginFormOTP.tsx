"use client";

import { Formik, Form } from "formik";
import * as yup from "yup";
import Input from "@/app/shared/components/input";
import {InterfaceLoginFormOTPValues } from "@/app/contracts/auth/modelAuth";
import callApi from "@/app/helpers/callApi";
import ValidationErrors from "@/app/exceptions/validationErroe";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks";
import { selectPhoneVerifyToken, updatePhoneVerifyToken } from "@/app/store/auth";
import { useDispatch } from "react-redux";



const validationSchema = yup.object().shape({
  code: yup
    .string()
    .required("کد تأیید الزامی است")
    .matches(/^\d{6}$/, "کد تأیید باید ۶ رقم باشد"),
});


export default function LoginFormOTP() {
  const token = useAppSelector(selectPhoneVerifyToken);
  const dispatch=useDispatch();
  const initialValues: InterfaceLoginFormOTPValues = {
    code: "",
    token: token ?? ""
  };
const router=useRouter();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setFieldError, setStatus }) => {
        try {
          const res = await callApi().post("auth/login/verify-phone", values, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          console.log(res.data)
          if (res.status === 200) {
           
            const token = res?.data?.token;

            await fetch("/api/auth/store-token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            });
            //کاربر ریدایرکت شود به صفحه اصلی
            await router.push("/");
            //dispatch(updatePhoneVerifyToken(undefined));

      
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

          <Input name="code" type="text" label="OTP" />
           {/* <Input name="token" type="text" label="OTP" /> */}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold"
          >
            Verify
          </button>
        </Form>
      )}
    </Formik>
  );
}

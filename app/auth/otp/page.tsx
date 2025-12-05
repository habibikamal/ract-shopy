"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoginFormOTP from "./components/loginFormOTP";
import { clearPhoneVerifyToken, selectPhoneVerifyToken, updatePhoneVerifyToken } from "@/app/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const token = useAppSelector(selectPhoneVerifyToken);
  const dispatch = useAppDispatch();

  console.log(token);

  // اگر توکن وجود ندارد → کاربر را به loginMobile بفرست
  useEffect(() => {
    if (token === undefined) {
      router.push("/auth/loginMobile");
    }
  }, [token, router]);

  // پاک‌کردن توکن هنگام Back/Forward
  useEffect(() => {
    const handlePopState = () => {
      dispatch(updatePhoneVerifyToken(undefined));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch]);

  // JSX فقط و فقط اینجا برگشت داده می‌شود
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginFormOTP />
        </div>
      </div>
    </>
  );
}

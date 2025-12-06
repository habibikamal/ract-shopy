"use client";

import useSWR from "swr";

const useAuth = () => {
  const fetcher = async () => {
    const res = await fetch("/api/auth/store-token", {
      credentials: "include" // برای ارسال کوکی
    });

    if (!res.ok) return null;

    return res.json();
  };

  const { data, error } = useSWR("user_me", fetcher);

  return {
    user: data?.user ?? null,
    loading: !data && !error,
    error
  };
};

export default useAuth;

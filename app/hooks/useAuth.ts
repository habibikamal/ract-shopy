"use client";

import useSWR from "swr";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { updateUser } from "@/app/store/auth";

const fetcher = async () => {
  const res = await fetch("/api/auth/store-token", {
    credentials: "include",
  });

  if (!res.ok) return null;

  return res.json();
};

export default function useAuth() {
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useSWR("/api/auth/store-token", fetcher);

  /** 
   * ⭐ فقط وقتی data تغییری کند، redux آپدیت می‌شود
   * جلوگیری از infinite render 
   */
  useEffect(() => {
    if (data && !error) {
      dispatch(updateUser(data.user));
    }
  }, [data, error, dispatch]);

  return {
    user: data?.user ?? null,
    loading: isLoading,
    error: !!error || data === null
  };
}

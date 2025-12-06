

"use server";

import { cookies } from "next/headers";

export async function storeToken(token: string) {
  (await cookies()).set({
    name: "shopy_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24
  });
}

export async function removeToken() {
  (await cookies()).set({
    name: "shopy_token",
    value: "",
    path: "/",
    maxAge: 0,
  });
}

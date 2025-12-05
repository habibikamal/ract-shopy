import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { token } = await request.json();

  const cookieStore = await cookies();

  cookieStore.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24
  });

  return Response.json({ message: "Token stored" });
}

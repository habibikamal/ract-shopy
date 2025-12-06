import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const token = (await cookies()).get("shopy_token")?.value;

  if (!token) {
    console.log('errrrrrrrr')
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // ارسال توکن به بک‌اند واقعی
    const response = await axios.get("http://localhost:5000/api/user", {
      headers: {
        authorization: (await cookies()).get("shopy_token")?.value
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

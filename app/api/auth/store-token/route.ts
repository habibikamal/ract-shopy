
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import callApi from "@/app/helpers/callApi";





export async function GET() {
  const token = (await cookies()).get("shopy_token")?.value;
  //const dispatch=useAppDispatch();

  if (!token) {
    console.log('errrrrrrrr')
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {

     const response = await callApi().get("/user", {
            headers: {
              authorization: (await cookies()).get("shopy_token")?.value
            },
          });

       console.log(response.data)
     //dispatch(updateUser(response.data));

    // ارسال توکن به بک‌اند واقعی
    // const response = await axios.get("http://localhost:5000/api/user", {
    //   headers: {
    //     authorization: (await cookies()).get("shopy_token")?.value
    //   }
    // });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    const formData = await req.formData();
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const apiRes = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/profile/update`,
      data,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    return NextResponse.json(apiRes.data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}

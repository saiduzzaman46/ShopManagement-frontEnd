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

    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/password/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { messagr: "Password updated successfully" };
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}

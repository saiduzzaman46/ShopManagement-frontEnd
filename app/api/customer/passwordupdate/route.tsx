import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function PATCH(req: NextRequest) {
  try {
    const jwt = req.cookies.get("jwt")?.value;
    if (!jwt) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/passwordupdate`,
      body,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Error updating password" },
      { status: error.response?.status || 500 }
    );
  }
}

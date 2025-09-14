import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const jwt = req.cookies.get("jwt")?.value;
    if (!jwt) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response?.data?.message || "Failed to fetch seller profile",
      },
      { status: error.response?.status || 500 }
    );
  }
}

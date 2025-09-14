import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const jwt = req.cookies.get("jwt")?.value; // read HttpOnly cookie
    if (!jwt) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/profile`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Error fetching profile" },
      { status: error.response?.status || 500 }
    );
  }
}

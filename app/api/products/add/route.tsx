import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    // Get formData directly (files + fields)
    const formData = await req.formData();

    // Forward the formData to backend
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/product/addproduct`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Only return success message if backend succeeded
    return NextResponse.json({ message: "Product added successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}

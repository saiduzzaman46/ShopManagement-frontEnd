import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.json(
        { message: "Unauthorized: No JWT token found" },
        { status: 401 }
      );
    }

    // Get FormData from client request
    const formData = await req.formData();

    // Convert FormData to raw object
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send request to your backend API
    const apiRes = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/updateproduct/data/${params.id}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
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

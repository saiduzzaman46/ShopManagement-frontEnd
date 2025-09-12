import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

// export async function GET(req: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const jwt = cookieStore.get("jwt")?.value;

//     if (!jwt) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const apiRes = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/seller/profile`,
//       {
//         headers: { Authorization: `Bearer ${jwt}` },
//       }
//     );

//     return NextResponse.json(apiRes.data);
//   } catch (err: any) {
//     return NextResponse.json(
//       { message: err.response?.data?.message || err.message },
//       { status: err.response?.status || 500 }
//     );
//   }
// }

export const GET = async <T = any,>(
  url: string,
  method = "GET"
): Promise<T> => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  // console.log("JWT in GET:", jwt);

  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    method,
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data;
};

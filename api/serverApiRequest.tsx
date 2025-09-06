import axios from "axios";
import { cookies } from "next/headers";

export const serverApiRequest = async <T = any,>(
  url: string,
  method = "GET",
  data: any = null
): Promise<T> => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    method,
    data,
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data;
};

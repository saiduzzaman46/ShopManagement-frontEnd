import axios from "axios";

export const ClientApiRequest = async <T = any,>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: any,
  headers: Record<string, string> = { "Content-Type": "application/json" },
  withCredentials: boolean = true // browser will not send or store cookies unless this is true
): Promise<T> => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      method,
      data,
      headers,
      withCredentials,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong with the API request.");
  }
};

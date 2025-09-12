import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.setHeader("Set-Cookie", [
    `jwt=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
  ]);

  return res.status(200).json({ message: "Logged out successfully" });
}

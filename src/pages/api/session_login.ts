/**
 * reference: https://firebase.google.com/docs/auth/admin/manage-cookies?hl=ja&authuser=0#create_session_cookie
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type HelloData = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HelloData>
) {
  // TODO: https://firebase.google.com/docs/auth/admin/manage-cookies?hl=ja&authuser=0#create_session_cookie
  res.status(200).json({ name: "John Doe" });
}

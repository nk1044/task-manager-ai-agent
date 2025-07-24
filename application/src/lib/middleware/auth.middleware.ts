import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { User } from "@/lib/models/user.model";

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({
        error: "You must be signed in to access this resource.",
      });
    }
    const userEmail = session.user?.email;
    if (!userEmail) {
      return res.status(401).json({
        error: "User email not found in session.",
      });
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(401).json({
        error: "User not found.",
      });
    }
    // @ts-ignore - pass session to handler if needed
    req.session = {...session, userId: user._id as string};
    
    return handler(req, res);
  };
}
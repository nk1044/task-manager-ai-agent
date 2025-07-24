import type { NextApiRequest, NextApiResponse } from "next";
import { transport } from "@/lib/controllers/mcp"; // already connected transport
import getRawBody from "raw-body";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Handling MCP request...");

  try {
    // Attach the raw body for StreamableHTTPServerTransport
    if (req.method === "POST") {
      const rawBody = await getRawBody(req);
      (req as any).rawBody = rawBody;
    }

    await transport.handleRequest(req, res);
  } catch (err) {
    console.error("Error handling MCP request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

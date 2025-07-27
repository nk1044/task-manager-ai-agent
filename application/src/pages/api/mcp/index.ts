import type { NextApiRequest, NextApiResponse } from "next";
import { initMcpServer } from "@/lib/controllers/mcp";
import { connectDB } from "@/lib/config/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

let initialized = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Handling MCP request...");

  try {
    if (!initialized) {
      await connectDB();       // Connect Mongo
      await initMcpServer();   // Initialize MCP
      initialized = true;
    }

    const transport = await initMcpServer();
    transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("Error handling MCP request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

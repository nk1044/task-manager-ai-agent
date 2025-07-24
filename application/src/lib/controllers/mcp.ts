import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { TaskController } from "./task.controller";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const server = new McpServer({
  name: "task-manager-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "createTask",
  "Create a new task by providing a title, description, and owner ID",
  {
    title: z.string().describe("A meaningful and short-descriptive title"),
    description: z.string().optional(),
    owner: z.string().describe("User ID of the task owner"),
    dueDate: z.string().optional(),
    status: z.string().optional(),
  },
  async ({ title, description, owner, dueDate, status }) => {
    try {
      const createdTask = await TaskController.createTask({
        title,
        description: description || "",
        owner,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
      });

      if (!createdTask) {
        return { content: [{ type: "text", text: "Failed to create task" }] };
      }

      return {
        content: [{ type: "text", text: "Task created successfully" }],
      };
    } catch (error) {
      console.log("Error creating task:", error);
      return { content: [{ type: "text", text: "Failed to create task" }] };
    }
  }
);

server.tool(
  "getTasks",
  "Get a list of tasks for a user by providing the user ID",
  {
    owner: z.string().describe("User ID of the task owner"),
  },
  async ({ owner }) => {
    try {
      const tasks = await TaskController.getTasks(owner);
      return {
        content: [
          {
            type: "text",
            text: `Tasks fetched successfully:\n${JSON.stringify(tasks, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      console.log("Error getting tasks:", error);
      return { content: [{ type: "text", text: "Failed to get tasks" }] };
    }
  }
);

server.tool(
  "getTaskById",
  "Get a task by its ID and the user ID",
  {
    taskId: z.string().describe("ID of the task to fetch"),
    owner: z.string().describe("User ID of the task owner"),
  },
  async ({ taskId, owner }) => {
    try {
      const task = await TaskController.getTaskById(taskId, owner);
      if (!task) {
        return { content: [{ type: "text", text: "Task not found" }] };
      }

      return {
        content: [
          {
            type: "text",
            text: `Task fetched successfully:\n${JSON.stringify(task, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      console.log("Error getting task:", error);
      return { content: [{ type: "text", text: "Failed to get task by ID" }] };
    }
  }
);

server.tool(
  "updateTask",
  "Update a task by its ID and the user ID",
  {
    taskId: z.string().describe("ID of the task to update"),
    owner: z.string().describe("User ID of the task owner"),
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.string().optional(),
  },
  async ({ taskId, owner, title, description, dueDate, status }) => {
    try {
      const updatedTask = await TaskController.updateTask(taskId, owner, {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
      });

      if (!updatedTask) {
        return { content: [{ type: "text", text: "Failed to update task" }] };
      }

      return {
        content: [{ type: "text", text: "Task updated successfully" }],
      };
    } catch (error) {
      console.log("Error updating task:", error);
      return { content: [{ type: "text", text: "Failed to update task" }] };
    }
  }
);

server.tool(
  "deleteTask",
  "Delete a task by its ID and the user ID",
  {
    taskId: z.string().describe("ID of the task to delete"),
    owner: z.string().describe("User ID of the task owner"),
  },
  async ({ taskId, owner }) => {
    try {
      const deletedTask = await TaskController.deleteTask(taskId, owner);
      if (!deletedTask) {
        return { content: [{ type: "text", text: "Failed to delete task" }] };
      }

      return {
        content: [{ type: "text", text: "Task deleted successfully" }],
      };
    } catch (error) {
      console.log("Error deleting task:", error);
      return { content: [{ type: "text", text: "Failed to delete task" }] };
    }
  }
);

export const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});

// Connect ONCE — not per request
await server.connect(transport);

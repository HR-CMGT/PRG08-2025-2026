import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { z } from "zod";

// Create the MCP server
const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

// Register the weather tool
server.registerTool(
  "get_weather",
  {
    title: "Get Weather",
    description: "Get the weather for a given city",
    inputSchema: {
      city: z.string(),
    },
    outputSchema: {
      weather: z.string(),
    },
  },
  async ({ city }) => {
    const output = { weather: `It's always sunny in ${city}!` };
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(output),
        },
      ],
      structuredContent: output,
    };
  }
);

// Set up Express and HTTP transport
const app = express();
app.use(express.json());

app.post('/sunnyweather-mcp', async (req, res) => {
  // Create a new transport for each request
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });

  res.on('close', () => {
    transport.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Weather MCP Server running on http://localhost:${port}/sunnyweather-mcp`);
});
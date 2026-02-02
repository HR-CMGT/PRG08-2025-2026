//
// advanced example, discover tools on the mcp server and supply them to the agent!
//

import { createAgent } from "langchain";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Step 1: Connect to your MCP server
const mcpClient = new Client({
  name: "langchain-agent",
  version: "1.0.0"
});

const transport = new StreamableHTTPClientTransport(
  new URL("http://localhost:3000/mcp")
);

await mcpClient.connect(transport);

// Step 2: Get all available tools from MCP
const toolsList = await mcpClient.listTools();

// Step 3: Convert MCP tools to LangChain tools
const langchainTools = toolsList.tools.map(mcpTool => {
  return tool(
    async (input) => {
      const result = await mcpClient.callTool({
        name: mcpTool.name,
        arguments: input
      });
      return result.content[0].text;
    },
    {
      name: mcpTool.name,
      description: mcpTool.description,
      schema: mcpTool.inputSchema // Convert to Zod if needed
    }
  );
});

// Step 4: Create your LangChain agent with MCP tools
const agent = createAgent({
  model: "claude-sonnet-4-5-20250929",
  tools: langchainTools, // Agent now "sees" all MCP tools!
});

// Step 5: Use your agent normally
const result = await agent.invoke({
  messages: [{ role: "user", content: "What's the weather in Tokyo?" }]
});

console.log(result);
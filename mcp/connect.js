//
// basic example, connecting to the mcp server from javascript
//
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Connect to your MCP server
const mcpClient = new Client({
  name: "agent1",
  version: "1.0.0"
});

const transport = new StreamableHTTPClientTransport(
  new URL("http://localhost:3000/mcp")
);
await mcpClient.connect(transport);

// Call the weather tool
const result = await mcpClient.callTool({
  name: "get_weather",
  arguments: { city: "Tokyo" }
});

console.log(result.content[0].text); // {"weather": "It's always sunny in Verweggistan!"}
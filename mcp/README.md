# MCP server

Install [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk) and zod

```sh
npm i @modelcontextprotocol/sdk zod
```

- Copy the `express` [boilerplate code](./index.js).
- Start the MCP server with `node index.js`

<br><br><br>

## Inspector

This command automagically creates a `localhost:6274` page that lists all your running mcp servers! No need to install anything.

```sh
npx @modelcontextprotocol/inspector@latest http://localhost:3001/sunnyweather-mcp
```

<br><br><br>

## Multiple tools

You can expose several tools on the same url:

```js
server.registerTool("get_weather", {...}, async ({ city }) => {...});
server.registerTool("get_car_price", {...}, async ({ make, model }) => {...});
server.registerTool("get_clothing_advice", {...}, async ({ weather, occasion }) => {...});

app.post('/mcp', async (req, res) => { ... });
```
When a client connects, it can discover and use all tools from this one server.

<br><br><br>

## When to use separate servers:

```
localhost:3000/mcp  → General utilities (weather, calculator, etc.)
localhost:3001/mcp  → Database tools (query, insert, update)
localhost:3002/mcp  → File system tools (read, write, search)
```

<br><br><br>

## Using the MCP

- In `copilot CLI` you can do `/mcp add` to add your MCP server!
- In VS Code you can also add it as an MCP server for the copilot extension
- In javascript you can access the MCP directly: [Code example](./connect.js)
- A langchain agent has to know which tools are available on the MCP server: [Code example](./langchain.js)

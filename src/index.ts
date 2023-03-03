import buildServer from "./server";

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;

async function main() {
  const server = await buildServer();

  await server.listen({ port: PORT });
  console.log(`Server listening on port ${PORT}`);
}

main();

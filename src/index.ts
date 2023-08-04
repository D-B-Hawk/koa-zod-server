import { app } from "./app";
import { serverPort } from "./env";

const server = app.listen(serverPort, () =>
  console.log(`server ready for requests at http://localhost:${serverPort}`)
);

process.on("SIGINT" || "SIGTERM", () => {
  console.log("stopping server.");
  server.close(() => {
    console.log("server stopped.");
    process.exit(0);
  });
});

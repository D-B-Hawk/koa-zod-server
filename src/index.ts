import { app } from "./app";
import { config } from "./config";

const server = app.listen(config.serverPort, () =>
  console.log(
    `server ready for requests at http://localhost:${config.serverPort}`
  )
);

process.on("SIGINT" || "SIGTERM", () => {
  console.log("stopping server.");
  server.close(() => {
    console.log("server stopped.");
    process.exit(0);
  });
});

import * as dotenv from "dotenv";
dotenv.config();
import http from "http";
import { APP_SETTINGS } from "./core/app-settings";
import { CacheDB } from "./core/cache/cache-db";
import DbConnection from "./core/db/db";
import fancyLogger from "./core/logger/fancy-logger";
import app from "./express-app";

async function main() {
  CacheDB.init();
  DbConnection.init();

  const server = http.createServer(app);

  server.listen(APP_SETTINGS.PORT, () => {
    fancyLogger.logServerInfo();
  });

  process.on("SIGINT", () => {
    server.close(() =>
      fancyLogger.error("extra", "server stopped, please restart manually")
    );
  });
}

main();

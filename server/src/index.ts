import http from "http";
import { PrismaClient } from "@prisma/client";

import app from "./app";

import logger from "./utils/logger";

import ENV_CONFIG from "./configs/env.config";

import _prisma from "./db/db.connection";

const server = http.createServer(app);
const BACKEND_PORT = ENV_CONFIG.BACKEND_PORT || 3000;
console.log(ENV_CONFIG)

server.listen(BACKEND_PORT, () => {
  logger.info(`Server is running on http://localhost:${BACKEND_PORT}`);
});

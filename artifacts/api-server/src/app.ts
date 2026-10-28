import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import path from "node:path";
import { existsSync } from "node:fs";
import { requireAdmin } from "./middlewares/adminAuth";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.get("/api/admin/session", requireAdmin, (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({ authenticated: true });
});
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

const publicDir = path.resolve(process.cwd(), "artifacts/axstudio/dist/public");
if (existsSync(path.join(publicDir, "index.html"))) {
  app.use(express.static(publicDir));
  app.get("/{*path}", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));
}

export default app;

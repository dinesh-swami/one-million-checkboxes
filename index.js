import "dotenv/config";
import { createServer } from "node:http";
import path from "node:path";
import jwt from "jsonwebtoken";

import express, { urlencoded } from "express";
import initializeSocket from "./socket.js";
import { redis } from "./redis.js";

(async function main() {
  // verbles
  const app = express();
  const server = createServer(app);
  const PORT = process.env.PORT ?? 5000;

  // socket
  initializeSocket(server);

  // routes
  app.use(express.json());
  app.use(urlencoded({ extended: true }));
  app.use(express.static(path.resolve("./public")));
  app.get("/health", (req, res) => res.json({ healthy: true }));

  app.get("/checkboxes", async (req, res) => {
    const existingState = await redis.get("checkboxes");

    if (existingState) {
      res.json({ checkboxes: JSON.parse(existingState) });
    } else {
      res.json({ checkboxes: new Array(100).fill(false) });
    }
  });

  app.post("/authenticate", async (req, res) => {
    console.log(req.body);
    const { code, nonce } = req.body;

    if (!code) {
      throw new Error("invalid code");
    }

    const redirectUrl = process.env.REDIRECT_URL || `http://localhost:${PORT}/callback.html`;
    const response = await fetch("https://oidc-t4w5.onrender.com/o/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_url: redirectUrl,
      }),
    });

    const data = await response.json();
    console.log(data, "data from oidc server");
    const idToken = data.data.idToken;

    const decode = jwt.decode(idToken);

    if (decode.nonce !== nonce) {
      throw new Error("invalid nonce!");
    }

    return res.status(200).json({ data: data.data.accessToken });
  });

  //server running
  server.listen(PORT, () =>
    console.log(`Server running on PORT : http://localhost:${PORT}`),
  );
})();

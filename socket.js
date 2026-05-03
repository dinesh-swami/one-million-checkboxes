import { Server } from "socket.io";
import { publisher, redis, subscriber } from "./redis.js";
const CHECKBOXKEY = "checkboxes";
const rateLimitMap = new Map();

async function initializeSocket(server) {
  const io = new Server(server);

  await subscriber.subscribe("internal:server:checkbox-updates");
  subscriber.on("message", async (channel, message) => {
    if (channel === "internal:server:checkbox-updates") {
      const data = JSON.parse(message);

      const existingState = await redis.get(CHECKBOXKEY);

      if (existingState) {
        const existingCheckboxes = JSON.parse(existingState);

        existingCheckboxes[data.checkboxId] = data.isChecked;

        await redis.set(CHECKBOXKEY, JSON.stringify(existingCheckboxes));
      } else {
        const arr = new Array(100).fill(false);
        arr[data.checkboxId] = data.isChecked;
        await redis.set(CHECKBOXKEY, JSON.stringify(arr));
      }

      io.emit("server:checkbox-response", data);
    }
  });

  io.on("connection", (socket) => {

    // Listen for checkbox state changes from clients
    socket.on("client:checkbox-checked", async (data) => {
      const lastOperation = await redis.get(`rate-limiting:${data.userId}`);
      if (lastOperation) {
        const paasedTime = Date.now() - lastOperation;
        if (paasedTime < 5000) {
          socket.emit("server:error", { error: "Please Wait fev sec." });
          return;
        }
      }
      await redis.set(`rate-limiting:${data.userId}`, Date.now());

      await publisher.publish(
        "internal:server:checkbox-updates",
        JSON.stringify(data),
      );
      
    });
  });
}

export default initializeSocket;

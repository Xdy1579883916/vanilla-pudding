import {createServer} from "http";
import {Server} from "socket.io";
import {instrument} from "@socket.io/admin-ui"
import customParser from "socket.io-msgpack-parser";

const httpServer = createServer();

const io = new Server(httpServer, {
  path: "/live",
  parser: customParser,
  cors: {
    origin: ['http://localhost:5173', 'https://admin.socket.io'],
    // credentials: true
  }
});

instrument(io, {
  // namespaceName: "/admin",
  auth: false,
})

io.on("connection", async (socket) => {
  socket.join("room");
  const all_sockets = await io.sockets.fetchSockets()
  console.log("a user connected", socket.id, all_sockets.length)

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id)
  });

  // 转发 RPC 请求
  socket.on("use-rpc", async (detail) => {
    const sockets = await io.in("room").fetchSockets()
    // 随机获取一个客户端
    const randomSocket = sockets[Math.floor(Math.random() * sockets.length)]
    randomSocket.emit("rpc", detail, (res) => {
      socket.emit("rpc-response", res);
    })
  });
});

io.listen(5311);

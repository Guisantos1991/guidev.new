import { WebSocketServer } from "ws";
import { broadcastToRoom, joinRoom, leaveRoom } from "./roomsManager";
import { MessagePayload } from "./types";

const wss = new WebSocketServer({ port: 3000 });

console.log(
  "Counter-Strike Fan Chat - WebSocket server running on ws://localhost:3000"
);

wss.on("connection", (ws: any) => {
  let currentClient: any = null;

  ws.on("message", (data: any) => {
    try {
      const payload: MessagePayload = JSON.parse(data.toString());

      if (!currentClient) {
        currentClient = joinRoom(payload.room, payload.username, ws);
        broadcastToRoom(
          payload.room,
          ` ${payload.username} entrou na sala ${payload.room}`
        );
        return;
      }

      const messageToSend = `[${payload.username}]: ${payload.message}`;
      broadcastToRoom(payload.room, messageToSend);
    } catch (e) {
      console.error(" Erro ao processar mensagem", e);
    }
  });

  ws.on("close", () => {
    if (currentClient) {
      leaveRoom(currentClient);
      broadcastToRoom(
        currentClient.room,
        `${currentClient.username} saiu da sala`
      );
    }
  });
});

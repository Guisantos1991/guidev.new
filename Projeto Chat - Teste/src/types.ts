import type { WebSocket as WSWebSocket } from "ws";

export type MessagePayload = {
  room: string;
  username: string;
  message: string;
};

export type Client = {
  socket: WSWebSocket;
  room: string;
  username: string;
};

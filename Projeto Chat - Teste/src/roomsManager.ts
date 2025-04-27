import type { WebSocket as WSWebSocket } from "ws";
import { Client } from "./types";

const rooms: Record<string, Client[]> = {};

export function joinRoom(
  room: string,
  username: string,
  socket: WSWebSocket
): Client {
  if (!rooms[room]) {
    rooms[room] = [];
  }

  const client: Client = { socket, room, username };
  rooms[room].push(client);
  return client;
}

export function leaveRoom(client: Client) {
  const clients = rooms[client.room];
  if (!clients) return;
  rooms[client.room] = clients.filter((c) => c.socket !== client.socket);
}

export function broadcastToRoom(room: string, message: string) {
  const clients = rooms[room] || [];
  clients.forEach((c) => c.socket.send(message));
}

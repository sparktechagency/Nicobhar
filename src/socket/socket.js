// src/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("http://182.252.68.227:3000", {
    transports: ["websocket"],
    withCredentials: true,
    query: { userId },
  });

  return socket;
};

export const getSocket = () => socket;

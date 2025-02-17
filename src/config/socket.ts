import io from "socket.io-client";
import { BASE_URL } from "../utils/constant";

export const createSocketConnection = () => {
    if (location.hostname === "localhost") {
      return io('http://localhost:7777'); // No "/api" in local WebSocket connection
    } else {
      return io("/", { path: "/api/socket.io" }); // Use "/api/socket.io" for production
    }
  };
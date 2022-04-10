import React, { useState } from "react";
import io from "socket.io-client";

import Chat from "../Chat/Chat";

import classes from "./Lobby.module.css";

const socket = io.connect("http://localhost:5000");

const Lobby = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className={classes.App}>
      {!showChat ? (
        <div className={classes.joinChatContainer}>
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Your name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Lobby;

import { useState } from "react";
import { io } from 'socket.io-client';

export function useMethods(){
 
  let socket;
  const initalConnection=({roomid,username})=>{
   
  }
  const sendMessage=({roomid,message,username})=>{
    socket.emit("send-message",({roomid,message,username}));
  }
  return ({
    sendMessage,
    onlineusers,
    currentuserarray,
    messages,
    initalConnection
  }
  )
}
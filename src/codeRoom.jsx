import { useLoaderData } from "react-router-dom";
import { codeOuputfetcherapi, fileCodeUpdaterAPI, thisRoomfetcher } from "../Services/roomapi";
import { HomeNav } from "./homenav";
import { SidePannel } from "./sideHover";
import css from "./style/codeRoom.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import Store, { loadingAction, stateActions } from "../Utility/store";
import { FileSaverCard } from "./filesaver";

export function CodeRoom(){
  const [onlineusers,setonlineusers]=useState(0);
  const [currentuserarray,setcurrentuserarray]=useState([]);
  const [messages,setmessages]=useState([{
    username:null,
    message:null,
    time:null
  }]);
  const {roominfo,roomfiles}=useLoaderData();
  const {fullname}=useSelector(store=>store.userReducer);
  const [currentmess,setcurrentmess]=useState(null);
  const [codetoshow,setcodetoshow]=useState(undefined);
  const socket=useRef(null);
  const {shower}=useSelector(store=>store.stateReducer);
  //to get output of code
  const [language,setlanguage]=useState(null);
  const [output,setoutput]=useState(false);
  //new useState variable to store the current file id so that user will be able to update the file code 
  const [currentFileId,setcurrentFileId]=useState(null);
  






  useEffect(()=>{
     socket.current=io("http://localhost:3001");

        socket.current.emit("join-room",({roomid:roominfo._id,username:fullname}));

        socket.current.on("joined-room",({username})=>{
          setcurrentuserarray(pre=>[...pre,username]);
        })
        socket.current.on("online-user-count",({onlineuser})=>{
          setonlineusers(onlineuser);
        })
          socket.current.on('receive-message',({message,time,username})=>{
            const obj={
              username:username,
              message:message,
              time:time
            }
          setmessages(pre=>[...pre,obj]);
        })
        socket.current.on("receive-updatedcode",({code})=>{
          console.log("received code is this",code);
          setcodetoshow(code);
        })
        return (()=>{
          socket.current.off("joined-room");
          socket.current.off("receive-message");
          socket.current.off("online-user-count");
          socket.current.off("receive-updatedcode");
          socket.current.disconnect();
        })

  },[])
  const sendMessage=()=>{
    socket.current.emit("send-message",({
      roomid:roominfo._id,
      message:currentmess,
      username:fullname
    }))
  }
  const sendCode=(code)=>{
    socket.current.emit("update-code",({roomid:roominfo._id,code:code}))
  }



  //webRTC connectivity
  const pc=useRef(null);
  const localstream=useRef(null);
  
  useEffect(()=>{
      socket.current.on("receive-offer",({offer})=>{
        console.log("offer received");
      //creating rtc connection on receiver side
      if (!pc.current) createPc();
            async function call(){
              localstream.current=await navigator.mediaDevices.getUserMedia({audio:true});
              localstream.current.getTracks().forEach(tracks=>{
                pc.current.addTrack(tracks,localstream.current);
              })
              //setting offer in remoteDescription and send the answer
              await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
              const answer=await pc.current.createAnswer();
              await pc.current.setLocalDescription(answer);
              console.log("answer created",answer);
              socket.current.emit("send-answer",({roomid:roominfo._id,answer:answer}));
          } 
           call(); 
      })
      socket.current.on('receive-answer',async ({answer})=>{
        console.log("answer called ");
        pc.current.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("answer is setted",answer);
      })
      socket.current.on("receive-candidate",({candidate})=>{
        if (pc.current && pc.current.remoteDescription){
          pc.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      })

      return ()=>{
        socket.current.off("receive-offer");
        socket.current.off("receive-answer");
        socket.current.off("receive-candidate");
      }
  },[])

  function createPc(){
      pc.current=new RTCPeerConnection({
        iceServers:[{
          urls:[
            "stun:stun.l.google.com:19302" ,
            "stun:stun.l.google.com:5349",
          ]
        }]
      })
      pc.current.ontrack=(e)=>{
        const remoteAudio=document.getElementById("audio");
        remoteAudio.srcObject=e.streams[0];
      }
      pc.current.onicecandidate=(e)=>{
        if (e.candidate){
          socket.current.emit("send-candidate",({roomid:roominfo._id,candidate:e.candidate}));
        }
      }
    }

  async function sendAudio(){
    createPc();
    localstream.current=await navigator.mediaDevices.getUserMedia({audio:true});
    localstream.current.getTracks().forEach(tracks=>{
      pc.current.addTrack(tracks,localstream.current);
    })
    //creating an offer for the connection 
    if (pc.current){
      const offer=await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);
      console.log("offer created",offer);
      socket.current.emit("send-offer",({roomid:roominfo._id,offer:offer}));
    }
  }



  //fetching the code ouput 
  async function fetchCodeOuput(codetoshow,language){
    setoutput(true);
    const output=await codeOuputfetcherapi(codetoshow,language);
    console.log(output);
    if (output.error===null){
      setoutput(output.output);
    }else {
      setoutput(output.output);
    }
  }

  //new fxn to set the value of currentFileId so that use will be able to save the updated code to the same file with this id
  function fileIdUpdater(fileid){
    setcurrentFileId(fileid);
  }
  //to save the current updated code to the same roomfile by getting the file if from currentFileId and fileIdUpdater fxn
  async function fileCodeUpdater(fileid,filecode){
    const result=await fileCodeUpdaterAPI(fileid,filecode);
    console.log("result is this",result);
    if (result.status===true){
      setoutput("Code Updated in the file");
    }else{
      setoutput("Can not file the file to save the Code reselect the file ");
    }
  } 
//fxn to set file code to codetoshow
  function codetoshowupdaterfromFile(code){
    setcodetoshow(code);
  }


  //return fxn start from here
  return (
    <>
      <HomeNav/>
      <SidePannel
      roominfo={roominfo}
      roomfiles={roomfiles}
      onlineusers={onlineusers}
      fileIdUpdater={fileIdUpdater}
      codetoshowupdaterfromFile={codetoshowupdaterfromFile}
      />
       <div className={css.outerdiv}>

         <textarea type="text" onChange={(e)=>{
          const code=e.target.value;
          setcodetoshow(code);
          sendCode(code);
         }}
         value={codetoshow}
        className={css.textdiv}
        placeholder="write your code here..."
        ></textarea>

        <p className={css.output}>
          <div>Output:-</div>
          {output===true?<p>Processing...</p>:output}
        </p>
        <div className={css.but}>
          <button className={css.runbut} onClick={()=>{ fileCodeUpdater(currentFileId,codetoshow) }}>Save Code</button>
          <select className={css.selbut} onChange={(e)=>{setlanguage(e.target.value)}}>
            <option>c</option>
            <option>cpp</option>
            <option>java</option>
            <option>python3</option>
            <option>nodejs</option>
          </select>
          <button className={css.runbut} onClick={()=>{
            fetchCodeOuput(codetoshow,language)
          }}>Run</button>
          <button className={css.runbut} onClick={()=>{
            Store.dispatch(stateActions.changer({
              newState:"FileSaver"
            }))
          }}>Create File</button>
          <button className={css.runbut} onClick={sendAudio}>Mic</button>
        </div>
        <div className={css.chatdiv}>
          <div className={css.userlist}>
            Users in this room are
            {currentuserarray.map(user=><p key={user}>{user}</p>)}
          </div>
          <ul>
            {messages.map(obj=>(<li key={obj.time}><h4>{obj.username}</h4><p>{obj.message}</p><h5>{obj.time}</h5></li>))}
          </ul>
          <audio autoPlay id="audio"></audio>
          <input type="text" onChange={(e)=>setcurrentmess(e.target.value)} id="chatmess"/>
          <button onClick={()=>{
            sendMessage();
            document.getElementById('chatmess').value='';
          }} >Send</button>
        </div>
       </div>
       {shower==="FileSaver"?<FileSaverCard 
       roominfo={roominfo}
       codetoshow={codetoshow}
       fullname={fullname}
       />:null}
    </>
  )
}



export const thisRoomLoader=async ({params})=>{
  const {id}=params;
  console.log("Id of the room is this",id);
  const result=await thisRoomfetcher(id);
  console.log(result);
  if (result!=null){
    return (result);
  }else if (result.status===false){
    return Response.redirect('/home');
  }
}
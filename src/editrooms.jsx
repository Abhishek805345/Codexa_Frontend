import { Link, useLoaderData } from "react-router-dom";
import { delRoomPermaAPI, findHostedRooms } from "../Services/roomapi";
import { HomeNav } from "./homenav";
import { Navbar } from "./nav";
import css from "./style/editrooms.module.css";
import Store, { stateActions } from "../Utility/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DelHoverCard } from "./delhovercard";

export function RoomEditor(){
  const roomdata=useLoaderData();
  const [coderoomdata,setcoderoomdata]=useState(roomdata.filter(obj=>obj.type==="Code"))      //we use useState hook so that we can change the value without any 
  const [interviewroomdata,setinterviewroomdata]=useState(roomdata.filter(obj=>obj.type==="Interview"))//reload after getting the acknowledge true when user del any room 
  const [selectedroom,setselectedroom]=useState(null);    //for sharing the selected room data to the del hover component 
  const {shower}=useSelector(store=>store.stateReducer);
  async function roomDelFxn(roomid){            //we will pass this fxn to delhovercard as a prop so that the room can be deleted from db as well 
    const result=await delRoomPermaAPI(roomid);                                           //as useState variable bcz a child can not modify the parent values but we can pass the value modifying fxn to child 
    console.log("result is this",result);
    if (result.status===true){
      setinterviewroomdata(interviewroomdata.filter(obj=>obj._id!=roomid));
      setcoderoomdata(coderoomdata.filter(obj=>obj._id!=roomid));
    }
  }

  return (
    <>
    <HomeNav/>
    <div>
      <h1 className={css.heading}>Edit your hosted rooms here</h1>
      <div className={css.outerdiv}>
        <div className={css.coderoom}>
          <p className={css.subheading}>Code Rooms</p>
          {coderoomdata.map(obj=>(
            <div className={css.card}>
                <p>Room Name: {obj.roomname}</p>
                <p>Room Type: {obj.type}</p>
                <p>Room Description: {obj.description}</p>
                <Link to={`/edit/`+obj._id+`/room`}><button className={css.changebut}>Change Config</button></Link>
                <button className={css.delbut} onClick={()=>{
                  Store.dispatch(stateActions.changer({
                    newState:"Delete Room"
                  }))
                  setselectedroom(obj);
                }}>Delete Room</button>
            </div>
          ))}
        </div>
         <div className={css.coderoom}>
          <p className={css.subheading}>Interview Rooms</p>
          {interviewroomdata.map(obj=>(
            <div className={css.card}>
                <p>Room Name: {obj.roomname}</p>
                <p>Room Type: {obj.type}</p>
                <p>Room Description: {obj.description}</p>
                <Link to={`/edit/`+obj._id+`/room`}><button className={css.changebut}>Change Config</button></Link>
                <button className={css.delbut} onClick={()=>{
                  Store.dispatch(stateActions.changer({
                    newState:"Delete Room"
                  }))
                  setselectedroom(obj);
                }}>Delete Room</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    {shower==="Delete Room"?<DelHoverCard room={selectedroom} roomDelFxn={roomDelFxn}/>:null}
    </>
  )
}

export const roomLoaderForEdit=async ({params})=>{
  const {id}=params;
  console.log("user id is this",id);
  const result=await findHostedRooms(id);
  return (result);
}
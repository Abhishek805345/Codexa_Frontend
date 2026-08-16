import { Link, useLoaderData } from "react-router-dom";
import { interviewRoomFetcher, roomFetcher } from "../Services/roomapi";
import Store, { roomAction, stateActions } from "../Utility/store";
import { HomeNav } from "./homenav";
import css from "./style/showcoderoom.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { InviteUser } from "./inviteuser";
import { Loading } from "./loading";

export function CodeRoomShower(){
  const {codeRooms}=useLoaderData();
  const {_id}=useSelector(store=>store.userReducer);
  let host_room_array=codeRooms.filter(obj=>obj.hostid==_id);
  let joined_room_array=codeRooms.filter(obj=>obj.hostid!=_id);
  const {shower}=useSelector(store=>store.stateReducer);
  const status=useSelector(store=>store.loadingReducer);
  return (
    <>
    {status===true?<Loading/>:null}
      <HomeNav/>
      <div className={css.outerdiv}>
        <div>
          <h3>Hosted Rooms</h3>
          <ul>
            {host_room_array.map(obj=>(<li key={obj._id}>
              <h2>Rooms Name: {obj.roomname}</h2>
              <h2>Description: {obj.description}</h2>
              <h2>Maximum User's allowed: {obj.maxusers}</h2>
              <h2>current User: {obj.currentuser}</h2>
              <div className={css.buttondiv}>
                    {obj.currentuser<obj.maxusers?<button className={css.invitebut} onClick={()=>{
                      Store.dispatch(roomAction.RoomIdChanger({
                                                      newroomId:obj._id
                                                    }))
                                        Store.dispatch(roomAction.RoomNameChanger({
                                                      newroomName:obj.roomname
                                                    }))            
                                        Store.dispatch( stateActions.changer({
                                          newState:"InviteUser"
                                        }))
                                      }} >Invite User</button>:null}
              
                    <Link to={"/room/"+obj._id}>
                        <button onClick={()=>{
                                      Store.dispatch(roomAction.RoomCodeChanger({
                                        newroomCode:null
                                      }))
                                    }}>Enter</button>
                   </Link>
              </div>
            </li>))}
          </ul>
        </div>
        <div>
          <h3>Joined Rooms</h3>
          <ul>
            {joined_room_array.map(obj=>(<li key={obj._id}>
              <h2>Rooms Name: {obj.roomname}</h2>
              <h2>Description: {obj.description}</h2>
              <h2>Maximum User's allowed: {obj.maxusers}</h2>
              <h2>current User: {obj.currentuser}</h2>
              <div className={css.buttondiv}>
                                {obj.currentuser<obj.maxusers?<button className={css.invitebut} onClick={()=>{
                                                    Store.dispatch(roomAction.RoomIdChanger({
                                                      newroomId:obj._id
                                                    }))
                                                    Store.dispatch(roomAction.RoomNameChanger({
                                                      newroomName:obj.roomname
                                                    }))
                                                    Store.dispatch(stateActions.changer({
                                                      newState:"InviteUser"
                                                    }))
                                                  }} >Invite User</button>:null}
              
                                <Link to={"/room/"+obj._id}>
                                    <button onClick={()=>{
                                      Store.dispatch(roomAction.RoomCodeChanger({
                                        newroomCode:null
                                      }))
                                    }}>Enter</button>
                                </Link>
                            </div>
            </li>))}
          </ul>
        </div>
      </div>
      {shower==="InviteUser"?<InviteUser/>:null}
    </>     
  )
}

export const RoomLoader=async ()=>{
  //method 1 to get Store data
  // const storestate=Store.getState();
  // const _id=storestate.userReducer._id;

  //method 2  to get redux-persist data
  const data=localStorage.getItem("persist:root");
  const firstparsing=JSON.parse(data);
  const user=JSON.parse(firstparsing.userReducer);

  const result=await roomFetcher(user._id);
  return ({
    codeRooms:result,
  });
}
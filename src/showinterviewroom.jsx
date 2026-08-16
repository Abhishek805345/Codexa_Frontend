import { Link, useLoaderData } from "react-router-dom";
import { interviewRoomFetcher } from "../Services/roomapi";
import Store, { roomAction, stateActions } from "../Utility/store";
import { HomeNav } from "./homenav";
import css from "./style/showcoderoom.module.css";
import { useSelector } from "react-redux";
import { InviteUser } from "./inviteuser";

export function InterviewRoomShower(){
  const rooms=useLoaderData();
  const {_id}=useSelector(store=>store.userReducer);
  const host_room_array=rooms.filter(obj=>obj.hostid==_id);
  const joined_room_array=rooms.filter(obj=>obj.hostid!=_id);
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
              <h2>Rooms Name:{obj.roomname}</h2>
              <h2>Description:{obj.description}</h2>
              <h2>Maximum User's allowed:{obj.maxusers}</h2>
              <h2>current User:{obj.currentuser}</h2>
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
        <div>
          <h3>Joined Rooms</h3>
          <ul>
            {joined_room_array.map(obj=>(<li key={obj._id}>
              <h2>Rooms Name:{obj.roomname}</h2>
              <h2>Description:{obj.description}</h2>
              <h2>Maximum User's allowed:{obj.maxusers}</h2>
              <h2>current User:{obj.currentuser}</h2>
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
      {shower==="InviteUser"?<InviteUser/>:null};
    </>
  )
}

export const interviewLoader=async ()=>{
  //method 1 to get store data
  // const statedata=Store.getState();
  // const _id=statedata.userReducer._id;

  //method 2 to get the persist localstorage data
  const data=localStorage.getItem("persist:root");
  const oneparsing=JSON.parse(data);
  const user=JSON.parse(oneparsing.userReducer);

  const result=await interviewRoomFetcher(user._id);
  return result;
}
import { Form } from "react-router-dom";
import css from "./style/inviteuser.module.css";
import Store, { loadingAction, stateActions } from "../Utility/store";
import { useSelector } from "react-redux";
import { UserInviterAPI } from "../Services/roomapi";

export function InviteUser(){
  const {roomId,roomName}=useSelector(store=>store.roomReducer);
  console.log("room name and id is this",roomId,roomName);
  const {_id}=useSelector(store=>store.userReducer);
  return (
    <>
       <div className={css.outerdiv}>
        <p>Invite Members in the room:<b>{roomName}</b></p>
        <Form method="POST">
          <input type="email" name="email" required placeholder="user@gmail.com"/>
          <input type="hidden" name="roomId" value={roomId}/>
          <button type="submit">Invite</button>
          <button onClick={()=>{
            Store.dispatch(stateActions.changer({
              newState:"Hero"
            }))
          }}>Back</button>
        </Form>
    </div>
   
    </>
    
  )
}

export const userInviter=async ({request})=>{
  const formdata=await request.formData();
  const data=Object.fromEntries(formdata);
  console.log("form data is this ",data);
  Store.dispatch(stateActions.changer({
    newState:"Hero"
  }))
  const result=await UserInviterAPI(data);
  console.log(result);
}
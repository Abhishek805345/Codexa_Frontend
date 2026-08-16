import { Form, Link } from "react-router-dom";
import css from "./style/createroom.module.css";
import { useSelector } from "react-redux";
import Store, { stateActions } from "../Utility/store";
import { roomSaver } from "../Services/roomapi";
import { HomeNav } from "./homenav";

export function RoomCreator(){
  const {_id}=useSelector(store=>store.userReducer);
  const {errormsg}=useSelector(store=>store.stateReducer);
  return (
    <>
    <HomeNav/>
    <section className={css.container}>

      <div className={css.heading}>
        <h1>Create Your Room</h1>
        <p>
          Start collaborating with your teammates in a secure coding
          workspace.
        </p>
      </div>

      <div className={css.wrapper}>

        <div className={css.formCard}>

          <Form method="POST">

            <label>ROOM NAME</label>
            <input
              type="text"
              name="roomname"
              placeholder="Enter room name"
            />

            <label>MAX USERS</label>
            <input
              type="number"
              name="maxusers"
              placeholder="Maximum users"
            />
            <input type="hidden" name="currentuser" value={1}/>
            <input type="hidden" name="hostid" value={_id}/>

            <label>ROOM TYPE</label>

            <select name="type">
              <option>Code</option>
              <option>Interview</option>
            </select>

            <label>DESCRIPTION</label>

            <textarea
              name="description"
              rows="5"
              placeholder="Tell collaborators about this room..."
            />

            <button className={css.submitbut} type="submit">
              Create Room
            </button>
            {errormsg==="FailedSavingRoom"?<h4 style={{"color":"red"}}>Failed in creating room.Please try again later.</h4>:null}
            < Link to="/home">
              <button className={css.backbut}>
                Back
              </button>
            </Link>

          </Form>

        </div>

        <div className={css.infoCard}>

          <h3>Room Setup Tips</h3>

          <ul>
            <li>🌍 Public rooms are visible to everyone.</li>

            <li>
              🔒 Private rooms require an invitation.
            </li>

            <li>
              👥 Invite collaborators after creating the room.
            </li>

            <li>
              ✍ Write a clear description so others know the
              purpose of the room.
            </li>

            <li>
              ⚙ You can edit room settings anytime.
            </li>

          </ul>

        </div>

      </div>

    </section>
    </>
  )
} 


export const RoomSaver=async ({request})=>{
  const formdata=await request.formData();
  const data=Object.fromEntries(formdata);
  const result=await roomSaver(data);
  console.log('result of saving is this ',result);
  if (result.acknowledged===true){
    return Response.redirect('/home');
  }else{
    Store.dispatch(stateActions.errorchanger({
      newerrormsg:"FailedSavingRoom"
    }))
  }
}
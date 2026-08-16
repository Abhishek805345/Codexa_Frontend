import { Form, useLoaderData } from "react-router-dom";
import { findUserbyId, UpdateUser } from "../Services/authentication";
import Store, { stateActions } from "../Utility/store";
import css from "./style/edituser.module.css";
import { HomeNav } from "./homenav";
import { useSelector } from "react-redux";
import { delRoomIdAPI, findJoinedRoomsAPI } from "../Services/roomapi";
import { DelHoverCard } from "./delhovercard";
import { useState } from "react";

export function UserEditor(){
  const {userresult,roomresult}=useLoaderData();
  console.log({userresult,roomresult});
  const {shower,errormsg}=useSelector(store=>store.stateReducer);
  const [selectedroom,setselectedroom]=useState(null);
  //to dynamically update the user room list we are creating a useState variable
  const [roomlist,setroomlist]=useState(roomresult);
  //fxn to delete the room id details from user saved info (user takes exit from the room)
  const roomIdDelFxn=async (roomid)=>{
    const result=await delRoomIdAPI(roomid,userresult._id);
    if (result.status===true){
        setroomlist(roomlist.filter(obj=>obj._id!=roomid));
    }else{
        Store.dispatch(stateActions.errorchanger({
            newerrormsg:"Can't Exit Room"
        }))
    }
  }

  return (
    <>
       <HomeNav />

            <div className={css.outerdiv}>

                <div className={css.card}>

                    <h2>Edit Account</h2>
                        {errormsg==="UserUpdationFailed"?<h4 style={{"color":"red"}}>Failed to update the user details.</h4>:null}
                    <p>Update your account information below.</p>

                    <Form method="post" className={css.form}>

                        <div className={css.inputbox}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="username"
                                defaultValue={userresult.username}
                                required
                            />
                        </div>

                        <div className={css.inputbox}>
                            <label>Username</label>
                            <input
                                type="text"
                                name="rusername"
                                defaultValue={userresult.rusername}
                                required
                            />
                        </div>

                        <div className={css.inputbox}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={userresult.email}
                                required
                            />
                        </div>

                        <button type="submit">
                            Update Profile
                        </button>

                    </Form>

                </div>
                <div className={css.secinnerdiv}>
                    <ul>
                        {errormsg==="Can't Exit Room"?<p style={{"color":"red","fontSize":"11px"}}>Can't Exit the room right now</p>:null}
                        {roomlist.map(obj=>(
                        <li key={obj._id}>
                            Room Name: {obj.roomname}
                            <button onClick={()=>{
                                setselectedroom(obj);
                                Store.dispatch(stateActions.changer({
                                    newState:"Delete Room"
                                }))
                            }}>Delete</button>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
          {shower==="Delete Room"?<DelHoverCard room={selectedroom} roomDelFxn={roomIdDelFxn}/>:null}
    </>
  )
}

export const UserLoader=async ()=>{
//   const statedata=Store.getState();
//   const _id=statedata.userReducer._id;
//use the redux-persist to get the data
  const data=localStorage.getItem("persist:root");
  const oneparsing=JSON.parse(data);
  const user=JSON.parse(oneparsing.userReducer);
  const userresult=await findUserbyId(user._id);
  const roomresult=await findJoinedRoomsAPI(userresult.room);
  return ({
    userresult:userresult,
    roomresult:roomresult
  });
}


export const userSaver=async ({request})=>{
    const formdata=await request.formData();
    const data=Object.fromEntries(formdata);
    const statedata=Store.getState();
    const _id=statedata.userReducer._id;
    console.log("form data is this",data);
    const result=await UpdateUser(_id,data);
    if (result.status===true){
        return Response.redirect("/home");
    }else {
        Store.dispatch(stateActions.errorchanger({
            newerrormsg:"UserUpdationFailed"
        }))
    }
}
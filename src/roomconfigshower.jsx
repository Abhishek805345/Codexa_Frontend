import { Form, Link, useLoaderData } from "react-router-dom";
import { HomeNav } from "./homenav";
import css from "./style/roomconfishower.module.css";
import { deleteRoomfilesapi, thisRoomfetcher } from "../Services/roomapi";
import { useSelector } from "react-redux";
import { useState } from "react";

export function RoomConfig(){
  const {roominfo,roomfiles}=useLoaderData();
  const {errormsg}=useSelector(store=>store.stateReducer);
  const [files,setfiles]=useState(roomfiles);

  async function fileDelFxn(fileid){
    const result=await deleteRoomfilesapi(fileid);
    if (result.status===true){
      const obj=files.filter(file=>file._id!==fileid);
      setfiles(obj);
    }
  }
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
                <input type="hidden" name="_id" value={roominfo._id}/>
                <label>ROOM NAME</label>
                <input
                  type="text"
                  name="roomname"
                  defaultValue={roominfo.roomname}
                  placeholder="Enter room name"
                />
    
                <label>MAX USERS</label>
                <input
                  type="number"
                  name="maxusers"
                  defaultValue={roominfo.maxusers}
                  placeholder="Maximum users"
                />
    
                <label>ROOM TYPE</label>
    
                <select name="type" defaultValue={roominfo.type}>
                  <option>Code</option>
                  <option>Interview</option>
                </select>
    
                <label>DESCRIPTION</label>
    
                <textarea
                  name="description"
                  rows="5"
                  defaultValue={roominfo.description}
                  placeholder={roominfo.description}
                />
    
                <button className={css.submitbut} type="submit">
                  Update Config
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
    
              <h3>Room Files Setup</h3>
    
              <ul>
                {files.map(obj=>(
                  <li>
                    <p style={{"fontSize":"11px"}}>File Name:{obj.filename}</p>
                    <button onClick={()=>{
                      fileDelFxn(obj._id)
                    }}>Delete File</button>
                  </li>
                  ))}
              </ul>
    
            </div>
    
          </div>
    
        </section>
    </>
  )
}


export const specificRoomLoader=async ({params})=>{
  const {id}=params;
  const result=await thisRoomfetcher(id);
  console.log("result is this ",result);
  return (result);
}

export const roominfoUpdater=async ({request})=>{
  const formdata=await request.formData();
  const data=Object.fromEntries(formdata);
  console.log("form data is this ",data);
}
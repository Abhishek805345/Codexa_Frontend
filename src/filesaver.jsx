import { useSelector } from "react-redux";
import { filesaverapi } from "../Services/roomapi";
import Store, { stateActions } from "../Utility/store";
import css from "./style/filesaver.module.css";
import { Form } from "react-router-dom";

export function FileSaverCard({codetoshow,fullname,roominfo}){
  const {errormsg}=useSelector(store=>store.stateReducer);
  return (
    <>
      <div className={css.saveCard}>
        <p>Save you file in this room :<span style={{"color":"blue","font-size":"x-small"}}>{roominfo.roomname}</span></p>
        <Form className={css.saveForm} method="POST">
          <input type="text" name="filename" required/>
          <input type="hidden" name="roomid" value={roominfo._id}/>
          <input type="hidden" name="saver" value={fullname}/>
          <input type="hidden" name="code" value={codetoshow}/>
          <button>Save File</button>
        </Form>
        <button onClick={()=>{
          Store.dispatch(stateActions.changer({
            newState:"Hero"
          }))
        }}>Back</button>
        {errormsg==="FileNotSaved"?<h4 className={css.error}>Can't save the file. Try again later.</h4>:null}
      </div>
    </>
  )
}


export const actiontoSaveFile=async ({request})=>{
  const formdata=await request.formData();
  const data=Object.fromEntries(formdata);
  console.log("form data is this ",data);
  const result=await filesaverapi(data);
  if (result.status===true){
    Store.dispatch(stateActions.changer({
      newState:"Hero"
    }))
  }else{
    Store.dispatch(stateActions.errorchanger({
      newerrormsg:"FileNotSaved"
    }))
  }
}
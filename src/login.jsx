import { Form } from "react-router-dom";
import css from "./style/login.module.css";
import { FcGoogle } from "react-icons/fc";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import Store, {loadingAction, stateActions, UserActions} from "../Utility/store";
import {findUser, RegisterUser} from "../Services/authentication";
import { useSelector } from "react-redux";
import { useActionState } from "react";

export function Login() {
  const {errormsg}=useSelector(store=>store.stateReducer);
  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1>Welcome back</h1>
        <button className={css.googleBtn}>
          <FcGoogle />
          <span>Continue with Google</span>
        </button>

        <p className={css.or}>or</p>

        <Form className={css.form} method="POST">
          <input
            type="email"
            name="email"
            placeholder="Enter email or username"
            required
          />
          {errormsg==="WrongUser"?<h4 style={{color:"red"}}>No registered user found with this email address</h4>:null}
          <button className={css.submitBtn} type="submit">
            Continue
            <VscChevronRight />
          </button>
        </Form>
         <button className={css.submitBtn} onClick={()=>{
          Store.dispatch(stateActions.changer({
            newState:"Hero"
          }))
         }} >
            Back
            <VscChevronLeft />
          </button>

        <p className={css.footer}>
          By continuing, you agree to our <a href="#">Terms</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>

        <p className={css.signup}>
          Don't have an account? <button href="#" onClick={()=>{
                Store.dispatch(stateActions.changer({
                  newState:"Register"
                }));
            }}  >Sign up</button>
        </p>
      </div>
    </div>
  );
}



export const loginAction=async ({request})=>{
  Store.dispatch(loadingAction.loadingStateChanger({
    newstatus:true
  }))
const data=await request.formData();
const formdata=Object.fromEntries(data);
const state=Store.getState();
const shower=state.stateReducer.shower;
if (shower==="Login"){
  const result=await findUser(formdata);
  if (result.user===true){
    Store.dispatch(stateActions.changer({
      newState:"Password"
    }))
    Store.dispatch(UserActions.emailchanger({
      newemail:formdata.email
    }))
    Store.dispatch(loadingAction.loadingStateChanger({
    newstatus:false
  }))
    return Response.redirect('/login');
  }else{
    Store.dispatch(stateActions.errorchanger({
      newerrormsg:"WrongUser"
    }))//loading close
    Store.dispatch(loadingAction.loadingStateChanger({
     newstatus:false
    }))
  }
}else if (shower==="Register"){
  Store.dispatch(loadingAction.loadingStateChanger({
    newstatus:true
  }))
  console.log("this is the form data",formdata);
  if (formdata.password===formdata.confirmPassword){
    Store.dispatch(loadingAction.loadingStateChanger());
    const result=await RegisterUser(formdata);
    Store.dispatch(loadingAction.loadingStateChanger());
    if (result.status===true){
      Store.dispatch(UserActions._idChanger({
        new_id:result.data._id
      }))
      Store.dispatch(UserActions.usernameChanger({
        newusername:result.data.username
      }))
      Store.dispatch(UserActions.emailchanger({
        newemail:result.data.email
      }))
      Store.dispatch(loadingAction.loadingStateChanger({
        newstatus:false
      }))
      return Response.redirect("/home");
    }else{
      //loading close
      Store.dispatch(loadingAction.loadingStateChanger({
        newstatus:false
        }))
      return Response.redirect("/");
    }
  }else {
    Store.dispatch(stateActions.errorchanger({
      newerrormsg:"RegisterUnmatchedPasswords"
    }))
    //loading close
      Store.dispatch(loadingAction.loadingStateChanger({
        newstatus:false
        }))
  }
  
}
}
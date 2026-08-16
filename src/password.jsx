import { useSelector } from "react-redux"
import Store, { stateActions, UserActions } from "../Utility/store";
import css from "./style/password.module.css";
import { Form, Link } from "react-router-dom";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { PasswordChecker } from "../Services/authentication";
import { Loading } from "./loading";

export function Password(){
  const {shower,errormsg}=useSelector(store=>store.stateReducer);
  const {email}=useSelector(store=>store.userReducer);
  const {status}=useSelector(store=>store.loadingReducer);
  return (
    <>
    {status===true?<Loading/>:
    null
    }
      {shower=="Password"?<div className={css.container}>
      <div className={css.card}>
        <h1>Welcome back</h1>
        {errormsg==="NewPasswordSetted"?<h4 style={{"color":"green"}}>New password saved.Try to login with it.</h4>:null}
        <p className={css.subtitle}>
          Enter your password to continue
        </p>

        <Form method="POST" className={css.form}>
          <input 
            type="hidden"
            name="email"
            value={email}
            ></input>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            minLength="8"
            required
          />
          {errormsg==="WrongPassword"?<h4 style={{color:"red"}}>Wrong Password. Check again</h4>:null}

          <button className={css.submitBtn} type="submit">
            Continue
            <VscChevronRight/>
          </button>
        </Form>

        <button
          type="button"
          className={css.backBtn}
          onClick={() => history.back()}
        >
          <VscChevronLeft />
          Back
        </button>

        <Link to="/otp/sent" className={css.forgotPassword}>
          Forgot Password?
        </Link>
      </div>
    </div>:<h1>Refresh the page</h1>}
    </>
  )
}

export const PasswordManager=async ({request})=>{
  const data=await request.formData();
  const form_data=Object.fromEntries(data);
  const result=await PasswordChecker(form_data);
  console.log("result of the request is this ",result);
  if (result.password===true){
    Store.dispatch(UserActions._idChanger({
      new_id:result.data._id
    }))
    Store.dispatch(UserActions.usernameChanger({
      newusername:result.data.username
    }))
    return Response.redirect('/home');
  }else {
    Store.dispatch(stateActions.errorchanger({
      newerrormsg:"WrongPassword"
    }))
  }
}
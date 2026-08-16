import { Form } from "react-router-dom";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import css from "./style/newPas.module.css";
import { useSelector } from "react-redux";
import Store, { stateActions } from "../Utility/store";
import { PasswordSetter } from "../Services/authentication";

export function NewPassword(){
  const {email}=useSelector(store=>store.userReducer);
  const {errormsg}=useSelector(store=>store.stateReducer);
  return (
    <>
      <div className={css.container}>
      <div className={css.card}>
        <h1>Welcome back</h1>

        <p className={css.subtitle}>
          Set your new password to continue
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
          <input
            type="password"
            name="ConfirmPassword"
            placeholder="Enter your password"
            minLength="8"
            required
          />
          {errormsg==="UnmatchedNewPassword"?<h4 style={{color:"red"}}>Both Passwords should be same.</h4>:null}

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
      </div>
    </div>
    </>
  );
}

export const newPasSetter=async ({request})=>{
  const formdata=await request.formData();
  const data=Object.fromEntries(formdata);
  console.log("form data for setting new password is this",data);
  if (data.password==data.ConfirmPassword){
    const result=await PasswordSetter(data);
    console.log("saver result",result);
    Store.dispatch(stateActions.errorchanger({
      newerrormsg:"NewPasswordsetted"
    }))
    return Response.redirect('/login');
  }else if (data.password!=data.ConfirmPassword){
    Store.dispatch(stateActions.errorchanger({
      newerrormsg:"UnmatchedNewPassword"
    }))
  }
}
import { Form, Link } from "react-router-dom";
import css from "./style/enterOtp.module.css";
import Store, { loadingAction, stateActions } from "../Utility/store";
import { OtpChecking, OtpSender } from "../Services/authentication";
import { Loading } from "./loading";
import { useSelector } from "react-redux";
import { VscRefreshCompact } from "react-icons/vsc";

export function EnterOtp(){
  const {errormsg}=useSelector(store=>store.stateReducer);
  return (
    <>
       <div className={css.container}>
      <div className={css.card}>

        <h1>Verify OTP</h1>

        <p className={css.subtitle}>
          Enter the 4-digit OTP sent to your email
        </p>

        <Form className={css.form} method="POST">

          <input
            type="number"
            name="otp"
            maxLength="4"
            placeholder="Enter OTP"
            required
          />
          {errormsg==="WrongOtp"?<h4 style={{"color":"red"}}>Wrong Otp.Try again</h4>:null}
          <button className={css.submitBtn} type="submit">
            Verify OTP
          </button>

        </Form>

        <p className={css.resend}>
          Didn't receive the code?
          <Link to="/otp/sent">
          <span> Resend OTP</span></Link>
        </p>

      </div>
    </div>
    </>
  )
}


export const LoaderSendOtp=async ()=>{
  Store.dispatch(loadingAction.loadingStateChanger());
  const state=Store.getState();                       //********Important thing to keep in mind
  const email=state.userReducer.email;
  const result=await OtpSender({email:email});
  if (result.otpstatus===true){
    Store.dispatch(loadingAction.loadingStateChanger());
    return result;
  }else{
    return Response.redirect('/');
  }
}

export const OtpChecker=async ({request})=>{
  const rawdata=await request.formData();
  const data=Object.fromEntries(rawdata);
  const result=await OtpChecking(data);
  if (result.forgoting===true){
    return Response.redirect('/new/pas');
  }else{
     Store.dispatch(stateActions.errorchanger({
      newerrormsg:"WrongOtp"
     }))
  }
}
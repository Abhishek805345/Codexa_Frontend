import css from "./style/Register.module.css";
import { Form, useResolvedPath } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import Store, { stateActions } from "../Utility/store";
import { Loading } from "./loading";
import { useSelector } from "react-redux";

export function Register(){
  const {status}=useSelector(store=>store.loadingReducer);
  const {errormsg}=useSelector(store=>store.stateReducer);
  return (
    <>
      {status===true?<Loading/>:
        <div className={css.container}>
      <div className={css.card}>
        <h1>Create Account</h1>

        <button type="button" className={css.googleBtn}>
          <FcGoogle />
          <span>Continue with Google</span>
        </button>

        <p className={css.or}>or</p>

        <Form className={css.form} method="POST">

          <input
            type="text"
            name="username"
            placeholder="Full Name"
            required
          />

          <input
            type="text"
            name="rusername"
            placeholder="Username"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            name="password"
            minLength="8"
            placeholder="Password"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            minLength="8"
            placeholder="Confirm Password"
            required
          />
          {errormsg==="RegisterUnmatchedPasswords"?<h4 style={{"color":"red"}}>Both the password should be same.Please check the entered passowrds</h4>:null}
          <input type="hidden" name="mycurrentroom" value={0}/>
          <input type="hidden" name="room" value={[]}/>
          <button className={css.submitBtn} type="submit">
            Create Account
            <VscChevronRight />
          </button>
        </Form>

        <button
          type="button"
          className={css.backBtn}
          onClick={() => {
            Store.dispatch(stateActions.changer({
              newState:"Hero"
            }))
          }}
        >
          <VscChevronLeft />
          Back to Login
        </button>

        <p className={css.footer}>
          By creating an account, you agree to our{" "}
          <a href="#">Terms</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
      }
    </>
  );
}
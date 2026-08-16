import css from "./style/home.module.css";
import { Footer } from "./footer";
import Store, { stateActions, UserActions } from "../Utility/store";
import { useSelector } from "react-redux";
import { AfterLoginHero } from "./afterhero";
import { HomeNav } from "./homenav";
import { FindAfterUser } from "../Services/authentication";

export function Home(){
  const {shower}=useSelector(store=>store.stateReducer);
  return (
    <>  
      <HomeNav/>
      <AfterLoginHero/>
      <Footer/>
    </>
  )
}



export const UserDetailsFetcher=async ()=>{
  // const store_data=Store.getState();
  // const email=store_data.userReducer.email;
  //use the redux-persist localStorage to get the user details
  const data=localStorage.getItem("persist:root");
  const oneparsing=JSON.parse(data);
  const user=JSON.parse(oneparsing.userReducer);
  console.log("User's email is this",user);
  const result=await FindAfterUser({
    email:user.email
  })
  if (result!=null){
    Store.dispatch(UserActions._idChanger({
      new_id:result._id
    }))
    Store.dispatch(UserActions.fullnameChanger({
      newfullname:result.username
    }))
    Store.dispatch(UserActions.usernameChanger({
      newusername:result.rusername
    }))
  }
  return 0;
}

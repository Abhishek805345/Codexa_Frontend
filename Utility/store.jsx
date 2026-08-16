import {configureStore, createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
console.log(storage);
import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer,persistStore} from "redux-persist"


const stateSlice=createSlice({
  name:"statemanager",
  initialState:{
    shower:"Hero",
    errormsg:null
  },
  reducers:{
    changer:(state,action)=>{
      state.shower=action.payload.newState;
    },
    errorchanger:(state,action)=>{
      state.errormsg=action.payload.newerrormsg;
    }
  }
})
//userStore
const UserSlice=createSlice({
  name:"userInfo",
  initialState:{
    _id:null,
    fullname:null,
    username:null,
    email:null,
  },
  reducers:{
    _idChanger:(state,action)=>{
      state._id=action.payload.new_id;
      
    },
    fullnameChanger:(state,action)=>{
      state.fullname=action.payload.newfullname;
      console.log("changed to this",state);
    },
    usernameChanger:(state,action)=>{
      state.username=action.payload.newusername;
      console.log("changed to this",state);
    },
    emailchanger:(state,action)=>{
      state.email=action.payload.newemail;
      console.log("changed to this",state);
    }
  }
})
//loading state slice
const loadingSlice=createSlice({
  name:"loadingStatus",
  initialState:{
    status:false
  },
  reducers:{
    loadingStateChanger:(state,action)=>{
      state.status=!state.status;
    }
  }
})
//room Slice
const RoomInfo=createSlice({
  name:"RoomInfo",
  initialState:{
    roomId:null,
    roomName:null,
  },
  reducers:{
    RoomIdChanger:(state,action)=>{
      state.roomId=action.payload.newroomId;
    },
    RoomNameChanger:(state,action)=>{
      state.roomName=action.payload.newroomName;
    }
  }
})
//redux-persist code 
const config={
  key:"root",
  storage,                              //configuration for redux-persist
  whitelist:[
    "userReducer",
    "roomReducer"
  ]
}
const rootReducer=combineReducers({                         //combineReducers
    stateReducer:stateSlice.reducer,
    userReducer:UserSlice.reducer,
    loadingReducer:loadingSlice.reducer,
    roomReducer:RoomInfo.reducer
  })
const presistedState=persistReducer(config,rootReducer)                //persistReducer

//store configuration
const Store=configureStore({
  reducer:presistedState,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false
  })
})

export const stateActions=stateSlice.actions;
export const UserActions=UserSlice.actions;
export const loadingAction=loadingSlice.actions;
export const roomAction=RoomInfo.actions;
export default Store;
export const persistor=persistStore(Store);

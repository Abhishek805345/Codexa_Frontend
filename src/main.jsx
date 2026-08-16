import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App.jsx'
import { Provider } from 'react-redux';
import Store, { persistor } from '../Utility/store.jsx';
import { Navbar, userLoginSessionCheck } from './nav.jsx';
import { loginAction } from './login.jsx';
import { Password, PasswordManager } from './password.jsx';
import { EnterOtp, LoaderSendOtp, OtpChecker } from './enterOtp.jsx';
import { newPasSetter, NewPassword } from './newPas.jsx';
import { Loading } from './loading.jsx';
import { RoomCreator, RoomSaver } from './createroom.jsx';
import { Home ,UserDetailsFetcher} from './home.jsx';
import { CodeRoomShower, RoomLoader } from './showcoderoom.jsx';
import { interviewLoader, InterviewRoomShower } from './showinterviewroom.jsx';
import { UserEditor, UserLoader, userSaver } from './edituser.jsx';
import { InviteUser, userInviter } from './inviteuser.jsx';
import { CodeRoom, thisRoomLoader } from './codeRoom.jsx';
import { filesaverapi } from '../Services/roomapi.js';
import { actiontoSaveFile } from './filesaver.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { RoomEditor, roomLoaderForEdit } from './editrooms.jsx';
import { RoomConfig, roominfoUpdater, specificRoomLoader } from './roomconfigshower.jsx';

const routes = createBrowserRouter([
      {
        path: '/',
        element: <Navbar />,
        loader:userLoginSessionCheck,
        action: loginAction,
      },
      {
        path: '/login',
        element: <Password />,
        action: PasswordManager,
      },
      {
        path: '/otp/sent',
        element: <EnterOtp />,
        loader: LoaderSendOtp,
        action:OtpChecker
      },
      {
        path:'/new/pas',
        element:<NewPassword />,
        action:newPasSetter
      },
      
      {
        path:'/home',
        element:<Home/>,
        loader:UserDetailsFetcher,
      },
      {
        
        path:'/code/rooms',
        element:<CodeRoomShower/>,
        loader:RoomLoader,
        action:userInviter
      },
      {
        path:'/interview/rooms',
        element:<InterviewRoomShower/>,
        loader:interviewLoader,
        action:userInviter
      },
      {
        path:"/edit/user",
        element:<UserEditor/>,
        loader:UserLoader,
        action:userSaver
      },
      {
        path:"/create/room",
        element:<RoomCreator/>,
        action:RoomSaver
      },
      {
        path:'/room/:id',
        element:<CodeRoom/>,
        loader:thisRoomLoader,
        action:actiontoSaveFile
      },
      {
        path:'/edit/code/rooms/:id',
        element:<RoomEditor/>,
        loader:roomLoaderForEdit
      },
      {
        path:"/edit/:id/room",
        element:<RoomConfig/>,
        loader:specificRoomLoader,
        action:roominfoUpdater
      }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={Store}>
    <PersistGate loading={<h2>Loading...</h2>} persistor={persistor}>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
  </StrictMode>,
)

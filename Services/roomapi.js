export const roomSaver=async (data)=>{
  const res=await fetch("https://api.codexa.sbs/api/save/room/info",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const roomFetcher=async (id)=>{
  const res=await fetch(`https://api.codexa.sbs/api/saved/room/${id}`,{
    method:"GET"
  })
  const result=await res.json();
  return result;
}

export const interviewRoomFetcher=async (id)=>{
  const res=await fetch(`https://api.codexa.sbs/api/saved/interview/${id}`,{
    method:"GET"
  })
  const result=await res.json();
  return result;
}


export const UserInviterAPI=async (data)=>{
  const res=await fetch("https://api.codexa.sbs/api/invite/user",{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const thisRoomfetcher=async (id)=>{
  const res=await fetch(`https://api.codexa.sbs/api/code/room/${id}`,{
    method:"GET"
  })
  const result=await res.json();
  return result;
}

export const filesaverapi=async (data)=>{
  const res=await fetch("https://api.codexa.sbs/api/save/file",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
} 

export const codeOuputfetcherapi=async (data,language)=>{
  const obj={
    code:data,
    language:language
  }
  const res=await fetch("https://api.codexa.sbs/api/fetch/output",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(obj)
  })
  const result=await res.json();
  return result;
}

//api to fetch user hosted rooms
export const findHostedRooms=async (userid)=>{
  const res=await fetch(`https://api.codexa.sbs/api/hosted/rooms/${userid}`,{
    method:"GET"
  })
  const result=await res.json();
  return result;
}


export const deleteRoomfilesapi=async (id)=>{
  const res=await fetch(`https://api.codexa.sbs/api/del/roomfile/${id}`,{
    method:"DELETE"
  })
  const result=await res.json();
  return result;
}

//to update the roomfile code

export const fileCodeUpdaterAPI=async (id,data)=>{
  const res=await fetch(`https://api.codexa.sbs/api/update/file/code/${id}`,{
    method:'PUT',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      code:data
    })
  })
  const result=await res.json();
  return result;
}

//to find the user joined rooms
export const findJoinedRoomsAPI=async (roomarray)=>{
  const res=await fetch("https://api.codexa.sbs/api/find/user/joined/rooms",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(roomarray)
  })
  const result=await res.json();
  return result;
}

//api to delete room id from user details

export const delRoomIdAPI=async (roomid,userid)=>{
  const res=await fetch(`https://api.codexa.sbs/api/del/saved/id/${roomid}/from/user/${userid}`,{
    method:"DELETE"
  })
  const result=await res.json();
  return result;
}

//to delete a room permanently
export const delRoomPermaAPI=async (roomid)=>{
  const res=await fetch(`https://api.codexa.sbs/api/del/room/${roomid}`,{
    method:"DELETE"
  })
  const result=await res.json();
  return result;
}

export const sessionCheck=async ()=>{
  const res=await fetch("https://codexa-backend-zhve.onrender.com/api/sess",{
    method:'GET',
    credentials:"include"
  })
  const result=await res.json();
  return result;
}

export const findUser=async (data)=>{
  const res=await fetch("https://codexa-backend-zhve.onrender.com/api/find/user",{
    method:'Post',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const FindAfterUser=async (data)=>{
  const res=await fetch("https://codexa-backend-zhve.onrender.com/api/find/after/user",{
    method:'Post',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const PasswordChecker=async (data)=>{
  const res=await fetch("https://codexa-backend-zhve.onrender.com/api/login/check",{
    method:'Post',
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const OtpSender=async (data)=>{
  const res=await fetch("https://codexa-backend-zhve.onrender.com/api/email/send/otp",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const OtpChecking=async (data)=>{
  const res=await fetch("https://codexa-backend-zhve.onrender.com/api/otp/validate",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const PasswordSetter=async (data)=>{
  const res=await fetch("https://codexa-backend-zhve.onrender.com/api/save-password",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const RegisterUser=async (data)=>{
  const res=await fetch("https://codexa-backend-zhve.onrender.com/api/save/data",{
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

export const findUserbyId=async (id)=>{
  const res=await fetch(`https://codexa-backend-zhve.onrender.com/api/user/details/${id}`,{
    method:"GET"
  })
  const result=await res.json();
  return result;
}


export const UpdateUser=async (id,data)=>{
  const res=await fetch(`https://codexa-backend-zhve.onrender.com/api/update/user/${id}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await res.json();
  return result;
}

import API_URL from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLogin(){

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()

const login = async()=>{

const res = await fetch(`${API_URL}/admin/login`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({username,password})
})

const data = await res.json()

if(res.ok){

/* save admin session */
sessionStorage.setItem("isAdmin","true")

navigate("/admin")

}else{

alert(data.error)

}

}


return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded shadow w-80">

<h2 className="text-xl font-bold mb-6 text-center">
Admin Login
</h2>

<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="border w-full p-2 mb-4"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border w-full p-2 mb-4"
/>

<button
onClick={login}
className="bg-indigo-600 text-white w-full py-2 rounded"
>

Login

</button>

</div>

</div>

)

}
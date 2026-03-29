// import { useState, useEffect } from "react"
// import { useNavigate, useSearchParams } from "react-router-dom"

// export default function JoinChat(){

// const navigate = useNavigate()
// const [searchParams] = useSearchParams()

// const selectedRoom = searchParams.get("room")

// const [nickname,setNickname] = useState("")
// const [rooms,setRooms] = useState([])
// const [room,setRoom] = useState(selectedRoom || "")

// /* LOAD ROOMS */

// useEffect(()=>{

// fetch("http://localhost:3000/api/rooms")
// .then(res=>res.json())
// .then(data=>{
// setRooms(data)
// })

// },[])

// /* JOIN CHAT */

// const joinChat = () => {

// if(!nickname || !room) return

// const sessionId = Math.random().toString(36).substring(2)

// sessionStorage.setItem("nickname",nickname)
// sessionStorage.setItem("room",room)
// sessionStorage.setItem("sessionId",sessionId)

// navigate("/chat")

// }

// const selectedRoomName =
// rooms.find(r => r.slug === room)?.name

// return(

// <div className="min-h-screen flex items-center justify-center bg-slate-100">

// <div className="bg-white p-8 rounded-lg shadow-md w-96">

// <h2 className="text-2xl font-bold mb-6 text-center">

// {selectedRoomName
// ? `Join ${selectedRoomName}`
// : "Join Chat"}

// </h2>

// {/* NAME */}

// <input
// type="text"
// placeholder="Enter your name"
// value={nickname}
// onChange={(e)=>setNickname(e.target.value)}
// className="w-full border p-3 rounded mb-4"
// />

// {/* ROOM SELECT (only if not selected from navbar) */}

// {!selectedRoom && (

// <select
// value={room}
// onChange={(e)=>setRoom(e.target.value)}
// className="w-full border p-3 rounded mb-4"
// >

// <option value="">Select chat room</option>

// {rooms.map((r)=>(

// <option key={r._id} value={r.slug}>
// {r.name}
// </option>

// ))}

// </select>

// )}

// <button
// onClick={joinChat}
// className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">

// Join Chat

// </button>

// </div>

// </div>

// )

// }




import API_URL from "../config"
import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function JoinChat(){

const navigate = useNavigate()
const [searchParams] = useSearchParams()

const selectedRoom = searchParams.get("room")

const [nickname,setNickname] = useState("")
const [rooms,setRooms] = useState([])
const [room,setRoom] = useState(selectedRoom || "")



/* LOAD ROOMS */

useEffect(()=>{

fetch(`${API_URL}/api/rooms`)
.then(res=>res.json())
.then(data=>{
setRooms(data)
})

},[])

/* JOIN CHAT */

const joinChat = async () => {

if(!nickname || !room) return

/* 🔥 NORMALIZE NAME */
const normalizedName = nickname.trim().toLowerCase()

const res = await fetch(`${API_URL}/check-nickname/${normalizedName}`)
const data = await res.json()

if(data.exists){
alert("Username already online. Try another name.")
return
}

const sessionId = Math.random().toString(36).substring(2)

/* ✅ STORE ORIGINAL NAME (for display) */
sessionStorage.setItem("nickname",nickname)

/* 🔥 STORE NORMALIZED (for backend consistency later if needed) */
sessionStorage.setItem("nicknameId",normalizedName)

sessionStorage.setItem("room",room)
sessionStorage.setItem("sessionId",sessionId)

navigate("/chat")

}


const selectedRoomName =
rooms.find(r => r.slug === room)?.name

return(

<div className="min-h-screen flex items-center justify-center bg-slate-100">

<div className="bg-white p-8 rounded-lg shadow-md w-96">

<h2 className="text-2xl font-bold mb-6 text-center">

{selectedRoomName
? `Join ${selectedRoomName}`
: "Join Chat"}

</h2>

{/* NAME */}

<input
type="text"
placeholder="Enter your name"
value={nickname}
onChange={(e)=>setNickname(e.target.value)}
className="w-full border p-3 rounded mb-4"
/>

{/* ROOM SELECT (only if not selected from navbar) */}

{!selectedRoom && (

<select
value={room}
onChange={(e)=>setRoom(e.target.value)}
className="w-full border p-3 rounded mb-4"
>

<option value="">Select chat room</option>

{rooms.map((r)=>(

<option key={r._id} value={r.slug}>
{r.name}
</option>

))}

</select>

)}

<button
onClick={joinChat}
className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">

Join Chat

</button>

</div>

</div>

)

}




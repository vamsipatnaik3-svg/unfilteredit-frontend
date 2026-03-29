// import { useEffect, useState } from "react"
// import io from "socket.io-client"

// const socket = io("http://localhost:3000")

// export default function AdminDashboard(){

// /* STATES */

// const [rooms,setRooms] = useState([])
// const [roomCounts,setRoomCounts] = useState({})
// const [onlineUsers,setOnlineUsers] = useState([])

// /* PIN */
// const [pinMessage,setPinMessage] = useState("")
// const [pinRoom,setPinRoom] = useState("")
// const [isGlobal,setIsGlobal] = useState(false)

// /* JOB */
// const [company,setCompany] = useState("")
// const [title,setTitle] = useState("")
// const [experience,setExperience] = useState("")
// const [location,setLocation] = useState("")
// const [lastDate,setLastDate] = useState("")
// const [applyLink,setApplyLink] = useState("")
// const [image,setImage] = useState("")
// const [jobs,setJobs] = useState([])
// const [uploading,setUploading] = useState(false)


// const [newRoomName,setNewRoomName] = useState("")
// const [newRoomSlug,setNewRoomSlug] = useState("")

// /* LOAD DATA */

// const loadRooms = ()=>{
// fetch("http://localhost:3000/admin/rooms")
// .then(res=>res.json())
// .then(setRooms)
// }

// const loadCounts = ()=>{
// fetch("http://localhost:3000/admin/room-counts")
// .then(res=>res.json())
// .then(setRoomCounts)
// }

// const loadUsers = ()=>{
// fetch("http://localhost:3000/admin/online-users")
// .then(res=>res.json())
// .then(setOnlineUsers)
// }

// const loadJobs = ()=>{
// fetch("http://localhost:3000/jobs")
// .then(res=>res.json())
// .then(setJobs)
// }

// /* INIT */

// useEffect(()=>{
// loadRooms()
// loadCounts()
// loadUsers()
// loadJobs()

// const interval = setInterval(()=>{
// loadCounts()
// loadUsers()
// },3000)

// return ()=>clearInterval(interval)
// },[])

// /* SOCKET */

// useEffect(()=>{
// socket.on("online_users",setOnlineUsers)
// socket.on("room_counts_update",setRoomCounts)

// return ()=>{
// socket.off("online_users")
// socket.off("room_counts_update")
// }
// },[])

// /* PIN */

// const pinChatMessage = async()=>{
// if(!pinMessage){
// alert("Enter message")
// return
// }

// await fetch("http://localhost:3000/admin/pin-message",{
// method:"POST",
// headers:{ "Content-Type":"application/json" },
// body:JSON.stringify({
// room:isGlobal ? null : pinRoom,
// message:pinMessage,
// isGlobal
// })
// })

// setPinMessage("")
// alert("📌 Pinned")
// }

// const unpinMessage = async()=>{
// await fetch("http://localhost:3000/admin/unpin",{
// method:"POST",
// headers:{ "Content-Type":"application/json" },
// body:JSON.stringify(isGlobal ? {isGlobal:true} : {room:pinRoom})
// })
// alert("❌ Unpinned")
// }



// /* IMAGE */

// const uploadImage = async(file)=>{

// if(!file) return

// setUploading(true)

// const formData = new FormData()
// formData.append("image",file)

// const res = await fetch("http://localhost:3000/upload",{
// method:"POST",
// body:formData
// })

// const data = await res.json()

// if(data.url){
// setImage(data.url)
// alert("Image uploaded")
// }else{
// alert("Upload failed")
// }

// setUploading(false)
// }

// /* POST JOB */

// const postJob = async()=>{

// if(uploading){
// alert("Wait for image upload")
// return
// }

// if(!company || !title){
// alert("Company & Title required")
// return
// }

// const res = await fetch("http://localhost:3000/jobs",{
// method:"POST",
// headers:{ "Content-Type":"application/json" },
// body:JSON.stringify({
// company,
// title,
// experience,
// location,
// lastDate,
// applyLink,
// image
// })
// })

// if(res.ok){
// alert("✅ Job posted")

// setCompany("")
// setTitle("")
// setExperience("")
// setLocation("")
// setLastDate("")
// setApplyLink("")
// setImage("")

// loadJobs()
// }
// }

// /* DELETE JOB */

// const deleteJob = async(id)=>{
// await fetch(`http://localhost:3000/jobs/${id}`,{
// method:"DELETE"
// })
// setJobs(prev=>prev.filter(j=>j._id !== id))
// }

// /* KICK USER */

// const kickUser = (user)=>{
// socket.emit("kick_user",{target:user})
// }

// /* UI */

// return(

// <div className="p-10 space-y-8 bg-gray-100 min-h-screen">

// <h1 className="text-3xl font-bold">Admin Dashboard</h1>

// {/* ROOMS */}

// <div className="bg-white shadow rounded p-5">
// <h2 className="font-semibold mb-3">Rooms</h2>

// {rooms.map(r=>(
// <div key={r._id} className="flex justify-between border p-2 rounded mb-1">
// <span>{r.name}</span>
// <span>{roomCounts[r.slug] || 0}</span>
// </div>
// ))}

// </div>

// {/* USERS */}

// <div className="bg-white shadow rounded p-5">
// <h2 className="font-semibold mb-3">Online Users</h2>

// {onlineUsers.map(u=>(
// <div key={u} className="flex justify-between border p-2 rounded mb-1">
// <span>{u}</span>
// <button onClick={()=>kickUser(u)} className="text-red-500">
// Kick
// </button>
// </div>
// ))}

// </div>

// {/* PIN */}

// <div className="bg-white shadow rounded p-5 space-y-3">
// <h2 className="font-semibold">Pin Message</h2>

// <input
// placeholder="Enter message"
// value={pinMessage}
// onChange={e=>setPinMessage(e.target.value)}
// className="border p-2 w-full"
// />

// <select
// value={pinRoom}
// onChange={e=>setPinRoom(e.target.value)}
// className="border p-2 w-full"
// >
// <option value="">Select room</option>
// {rooms.map(r=>(
// <option key={r._id} value={r.slug}>{r.name}</option>
// ))}
// </select>

// <label className="flex items-center gap-2">
// <input
// type="checkbox"
// checked={isGlobal}
// onChange={()=>setIsGlobal(!isGlobal)}
// />
// Global
// </label>

// <div className="flex gap-2">
// <button onClick={pinChatMessage} className="bg-purple-600 text-white px-4 py-2 rounded">
// Pin
// </button>

// <button onClick={unpinMessage} className="bg-gray-600 text-white px-4 py-2 rounded">
// Unpin
// </button>
// </div>

// </div>



// {/* JOB */}

// <div className="bg-white shadow rounded p-5 space-y-3">

// <h2 className="font-semibold">Post Job</h2>

// <div className="grid grid-cols-2 gap-2">

// <input placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} className="border p-2"/>
// <input placeholder="Job Title" value={title} onChange={e=>setTitle(e.target.value)} className="border p-2"/>

// <input placeholder="Experience" value={experience} onChange={e=>setExperience(e.target.value)} className="border p-2"/>
// <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} className="border p-2"/>

// <input placeholder="Last Date" value={lastDate} onChange={e=>setLastDate(e.target.value)} className="border p-2"/>
// <input placeholder="Apply Link" value={applyLink} onChange={e=>setApplyLink(e.target.value)} className="border p-2"/>

// </div>

// <div className="flex items-center gap-3">
// <input type="file" onChange={(e)=>uploadImage(e.target.files[0])}/>
// {uploading && <span className="text-blue-500 text-sm">Uploading...</span>}
// </div>

// <button onClick={postJob} className="bg-green-600 text-white px-4 py-2 rounded">
// Post Job
// </button>

// </div>

// {/* JOB LIST */}

// <div className="bg-white shadow rounded p-5">
// <h2 className="font-semibold mb-3">Posted Jobs</h2>

// {jobs.map(job=>(
// <div key={job._id} className="flex justify-between border p-2 mb-2 rounded">

// <div>
// <b>{job.company}</b> - {job.title}
// </div>

// <button onClick={()=>deleteJob(job._id)} className="text-red-500">
// Delete
// </button>

// </div>
// ))}

// </div>

// </div>
// )
// }






import API_URL from "../config"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"

const socket = io(`${API_URL}`)

export default function AdminDashboard(){

    const navigate = useNavigate()

/* STATES */

const [rooms,setRooms] = useState([])
const [roomCounts,setRoomCounts] = useState({})
const [onlineUsers,setOnlineUsers] = useState([])

/* PIN */
const [pinMessage,setPinMessage] = useState("")
const [pinRoom,setPinRoom] = useState("")
const [isGlobal,setIsGlobal] = useState(false)

/* JOB */
const [company,setCompany] = useState("")
const [title,setTitle] = useState("")
const [experience,setExperience] = useState("")
const [location,setLocation] = useState("")
const [lastDate,setLastDate] = useState("")
const [applyLink,setApplyLink] = useState("")
const [image,setImage] = useState("")
const [jobs,setJobs] = useState([])
const [uploading,setUploading] = useState(false)

/* 🔥 ADDED */
const [newRoomName,setNewRoomName] = useState("")
const [newRoomSlug,setNewRoomSlug] = useState("")

/* LOAD DATA */

const loadRooms = ()=>{
fetch(`${API_URL}/admin/rooms`)
.then(res=>res.json())
.then(setRooms)
}

const loadCounts = ()=>{
fetch(`${API_URL}/admin/room-counts`)
.then(res=>res.json())
.then(setRoomCounts)
}

const loadUsers = ()=>{
fetch(`${API_URL}/admin/online-users`)
.then(res=>res.json())
.then(setOnlineUsers)
}

const loadJobs = ()=>{
fetch(`${API_URL}/jobs`)
.then(res=>res.json())
.then(setJobs)
}

/* INIT */

useEffect(()=>{

    const isAdmin = sessionStorage.getItem("isAdmin")

if(!isAdmin){
navigate("/")
return
}
loadRooms()
loadCounts()
loadUsers()
loadJobs()

const interval = setInterval(()=>{
loadCounts()
loadUsers()
},3000)

return ()=>clearInterval(interval)
},[])

/* SOCKET */

useEffect(()=>{
socket.on("online_users",setOnlineUsers)
socket.on("room_counts_update",setRoomCounts)

return ()=>{
socket.off("online_users")
socket.off("room_counts_update")
}
},[])

/* 🔥 ADD ROOM */
const addRoom = async ()=>{
if(!newRoomName || !newRoomSlug){
alert("Enter name & slug")
return
}

const res = await fetch(`${API_URL}/admin/rooms`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
name:newRoomName,
slug:newRoomSlug.toLowerCase()
})
})

if(res.ok){
alert("Room added")
setNewRoomName("")
setNewRoomSlug("")
loadRooms()
}else{
alert("Failed")
}
}

/* 🔥 DELETE ROOM */
const deleteRoom = async(id)=>{
if(!window.confirm("Delete this room?")) return

await fetch(`${API_URL}/admin/rooms/${id}`,{
method:"DELETE"
})

loadRooms()
}

/* PIN */

const pinChatMessage = async()=>{
if(!pinMessage){
alert("Enter message")
return
}

await fetch(`${API_URL}/admin/pin-message`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
room:isGlobal ? null : pinRoom,
message:pinMessage,
isGlobal
})
})

setPinMessage("")
alert("📌 Pinned")
}

const unpinMessage = async()=>{
await fetch(`${API_URL}/admin/unpin`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(isGlobal ? {isGlobal:true} : {room:pinRoom})
})
alert("❌ Unpinned")
}

/* IMAGE */

const uploadImage = async(file)=>{

if(!file) return

setUploading(true)

const formData = new FormData()
formData.append("image",file)

const res = await fetch(`${API_URL}/upload`,{
method:"POST",
body:formData
})

const data = await res.json()

if(data.url){
setImage(data.url)
alert("Image uploaded")
}else{
alert("Upload failed")
}

setUploading(false)
}

/* POST JOB */

const postJob = async()=>{

if(uploading){
alert("Wait for image upload")
return
}

if(!company || !title){
alert("Company & Title required")
return
}

const res = await fetch(`${API_URL}/jobs`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
company,
title,
experience,
location,
lastDate,
applyLink,
image
})
})

if(res.ok){
alert("✅ Job posted")

setCompany("")
setTitle("")
setExperience("")
setLocation("")
setLastDate("")
setApplyLink("")
setImage("")

loadJobs()
}
}

/* DELETE JOB */

const deleteJob = async(id)=>{
await fetch(`${API_URL}/jobs/${id}`,{
method:"DELETE"
})
setJobs(prev=>prev.filter(j=>j._id !== id))
}

/* KICK USER */

const kickUser = (user)=>{
socket.emit("kick_user",{target:user})
}

/* UI */

return(

<div className="p-10 space-y-8 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold">Admin Dashboard</h1>

{/* ROOMS */}

<div className="bg-white shadow rounded p-5">
<h2 className="font-semibold mb-3">Rooms</h2>

{/* 🔥 ADD ROOM UI */}
<div className="flex gap-2 mb-3">
<input
placeholder="Room name"
value={newRoomName}
onChange={e=>setNewRoomName(e.target.value)}
className="border p-2"
/>

<input
placeholder="Slug"
value={newRoomSlug}
onChange={e=>setNewRoomSlug(e.target.value)}
className="border p-2"
/>

<button onClick={addRoom} className="bg-green-600 text-white px-3">
Add
</button>
</div>

{rooms.map(r=>(
<div key={r._id} className="flex justify-between border p-2 rounded mb-1">
<span>{r.name}</span>

<div className="flex gap-3">
<span>{roomCounts[r.slug] || 0}</span>

<button
onClick={()=>deleteRoom(r._id)}
className="text-red-500"
>
Delete
</button>
</div>

</div>
))}

</div>

{/* USERS */}

<div className="bg-white shadow rounded p-5">
<h2 className="font-semibold mb-3">Online Users</h2>

{onlineUsers.map(u=>(
<div key={u} className="flex justify-between border p-2 rounded mb-1">
<span>{u}</span>
<button onClick={()=>kickUser(u)} className="text-red-500">
Kick
</button>
</div>
))}

</div>

{/* PIN */}

<div className="bg-white shadow rounded p-5 space-y-3">
<h2 className="font-semibold">Pin Message</h2>

<input
placeholder="Enter message"
value={pinMessage}
onChange={e=>setPinMessage(e.target.value)}
className="border p-2 w-full"
/>

<select
value={pinRoom}
onChange={e=>setPinRoom(e.target.value)}
className="border p-2 w-full"
>
<option value="">Select room</option>
{rooms.map(r=>(
<option key={r._id} value={r.slug}>{r.name}</option>
))}
</select>

<label className="flex items-center gap-2">
<input
type="checkbox"
checked={isGlobal}
onChange={()=>setIsGlobal(!isGlobal)}
/>
Global
</label>

<div className="flex gap-2">
<button onClick={pinChatMessage} className="bg-purple-600 text-white px-4 py-2 rounded">
Pin
</button>

<button onClick={unpinMessage} className="bg-gray-600 text-white px-4 py-2 rounded">
Unpin
</button>
</div>

</div>



{/* JOB */}

<div className="bg-white shadow rounded p-5 space-y-3">

<h2 className="font-semibold">Post Job</h2>

<div className="grid grid-cols-2 gap-2">

<input placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} className="border p-2"/>
<input placeholder="Job Title" value={title} onChange={e=>setTitle(e.target.value)} className="border p-2"/>

<input placeholder="Experience" value={experience} onChange={e=>setExperience(e.target.value)} className="border p-2"/>
<input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} className="border p-2"/>

<input placeholder="Last Date" value={lastDate} onChange={e=>setLastDate(e.target.value)} className="border p-2"/>
<input placeholder="Apply Link" value={applyLink} onChange={e=>setApplyLink(e.target.value)} className="border p-2"/>

</div>

<div className="flex items-center gap-3">
<input type="file" onChange={(e)=>uploadImage(e.target.files[0])}/>
{uploading && <span className="text-blue-500 text-sm">Uploading...</span>}
</div>

<button onClick={postJob} className="bg-green-600 text-white px-4 py-2 rounded">
Post Job
</button>

</div>

{/* JOB LIST */}

<div className="bg-white shadow rounded p-5">
<h2 className="font-semibold mb-3">Posted Jobs</h2>

{jobs.map(job=>(
<div key={job._id} className="flex justify-between border p-2 mb-2 rounded">

<div>
<b>{job.company}</b> - {job.title}
</div>

<button onClick={()=>deleteJob(job._id)} className="text-red-500">
Delete
</button>

</div>
))}

</div>

</div>
)
}
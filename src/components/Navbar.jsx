


// import { Link, useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react"
// import socket from "../socket/socket"

// export default function Navbar(){

// const [open,setOpen] = useState(false)
// const [rooms,setRooms] = useState([])

// const navigate = useNavigate()

// const nickname = sessionStorage.getItem("nickname")

// /* LOAD ROOMS */

// useEffect(()=>{

// fetch("http://localhost:3000/api/rooms")
// .then(res=>res.json())
// .then(data=>{
// setRooms(data)
// })

// },[])

// /* GO BACK TO CHAT */

// const goToChat = () => {

// window.location.href="/chat"

// }

// /* LOGOUT */

// const logout = async () => {

// const nickname = sessionStorage.getItem("nickname")

// if(nickname){

// try{

// socket.emit("user_logout", nickname)

// await fetch("http://localhost:3000/delete-chat",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// user1:nickname
// })
// })

// }catch(err){
// console.log("Logout cleanup error:",err)
// }

// socket.disconnect()

// }

// sessionStorage.removeItem("nickname")
// sessionStorage.removeItem("room")
// sessionStorage.removeItem("sessionId")

// navigate("/")

// }

// return(

// <nav style={{
// width:"100%",
// background:"linear-gradient(90deg,#0f172a,#1e293b)",
// color:"#fff",
// padding:"12px 16px",
// flexWrap:"wrap",
// display:"flex",
// justifyContent:"space-between",
// alignItems:"center",
// position:"sticky",
// top:0,
// zIndex:1000
// }}>

// <h2 style={{margin:0}}>Anonova</h2>

// <div style={{
// display:"flex",
// gap:"15px",
// alignItems:"center",
// flexWrap:"wrap"
// }}>

// {/* HOME */}

// {!nickname && (

// <Link to="/" style={{color:"#fff",textDecoration:"none"}}>
// Home
// </Link>
// )}

// {/* CHAT ROOMS (before login) */}

// {!nickname && (

// <div
// style={{position:"relative"}}
// onMouseEnter={()=>setOpen(true)}
// onMouseLeave={()=>setOpen(false)}
// >

// <span style={{cursor:"pointer"}}>
// Chat Rooms ▾ </span>

// {open && (

// <div style={{
// position:"absolute",
// top:"35px",
// right:0,
// background:"#fff",
// color:"#000",
// borderRadius:"8px",
// boxShadow:"0 10px 25px rgba(0,0,0,0.2)",
// padding:"10px",
// minWidth:"200px"
// }}>

// {rooms.map((room)=>(

// <Link
// key={room._id}
// to={`/join?room=${room.slug}`}
// style={{
// display:"block",
// padding:"10px",
// textDecoration:"none",
// color:"#111"
// }}
// >
// {room.name} Chat
// </Link>
// ))}

// </div>

// )}

// </div>

// )}

// {/* LOGGED IN NAVIGATION */}

// {nickname && (
// <>
// <button
// onClick={goToChat}
// style={{
// background:"transparent",
// border:"none",
// color:"#fff",
// cursor:"pointer"
// }}

// >

// Chat </button>

// <Link to="/confessions" style={{color:"#fff",textDecoration:"none"}}>
// Confessions
// </Link>

// <Link to="/it-experiences" style={{color:"#fff",textDecoration:"none"}}>
// IT Experiences
// </Link>

// <Link to="/jobs" style={{color:"#fff",textDecoration:"none"}}>
// Job Notifications
// </Link>
// </>
// )}

// <Link to="/rules" style={{color:"#fff",textDecoration:"none"}}>
// Rules
// </Link>

// <Link to="/privacy" style={{color:"#fff",textDecoration:"none"}}>
// Privacy
// </Link>

// <Link to="/about" style={{color:"#fff",textDecoration:"none"}}>
// About
// </Link>

// {/* LOGOUT */}

// {nickname && (

// <button
// onClick={logout}
// style={{
// background:"#ef4444",
// border:"none",
// color:"#fff",
// padding:"8px 14px",
// borderRadius:"6px",
// cursor:"pointer"
// }}

// >

// Logout

// </button>

// )}

// </div>

// </nav>

// )

// }





import API_URL from "../config"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import socket from "../socket/socket"

export default function Navbar(){

const [open,setOpen] = useState(false)               // desktop dropdown
const [mobileOpen,setMobileOpen] = useState(false)
const [roomsOpen,setRoomsOpen] = useState(false)     // ✅ NEW (mobile rooms toggle)
const [rooms,setRooms] = useState([])

const navigate = useNavigate()
const nickname = sessionStorage.getItem("nickname")

/* LOAD ROOMS */
useEffect(()=>{
fetch(`${API_URL}/api/rooms`)
.then(res=>res.json())
.then(data=> setRooms(data))
},[])

/* CHAT NAV */
const goToChat = () => {
navigate("/chat")
}

/* LOGOUT */
const logout = async () => {
const nickname = sessionStorage.getItem("nickname")

if(nickname){
try{
socket.emit("user_logout", nickname)

await fetch(`${API_URL}/delete-chat`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ user1:nickname })
})

}catch(err){
console.log(err)
}

socket.disconnect()
}

sessionStorage.clear()
navigate("/")
}

return(

<nav style={{
width:"100%",
background:"linear-gradient(90deg,#0f172a,#1e293b)",
color:"#fff",
position:"sticky",
top:0,
zIndex:1000
}}>

{/* TOP BAR */}
<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"12px 16px"
}}>

<h2 style={{margin:0}}>Unfiltered IT</h2>

{/* DESKTOP MENU */}
<div className="hidden md:flex" style={{gap:"15px",alignItems:"center"}}>

{!nickname && (
<Link to="/" style={{color:"#fff"}}>Home</Link>
)}

{/* DESKTOP ROOMS */}
{!nickname && (
<div
style={{position:"relative",cursor:"pointer"}}
onMouseEnter={()=>setOpen(true)}
onMouseLeave={()=>setOpen(false)}
>
<span>Rooms ▾</span>

{open && (
<div style={{
position:"absolute",
top:"35px",
right:0,
background:"#fff",
color:"#000",
borderRadius:"8px",
padding:"10px",
minWidth:"200px",
maxHeight:"300px",
overflowY:"auto",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
}}>

{rooms.map((room)=>(
<Link
key={room._id}
to={`/join?room=${room.slug}`}
style={{display:"block",padding:"8px",color:"#000"}}
>
{room.name}
</Link>
))}

</div>
)}

</div>
)}

{/* LOGGED IN */}
{nickname && (
<>
<button onClick={goToChat} style={{background:"none",border:"none",color:"#fff"}}>
Chat
</button>
<Link to="/confessions" style={{color:"#fff"}}>Confessions</Link>
<Link to="/it-experiences" style={{color:"#fff"}}>IT Experiences</Link>
<Link to="/jobs" style={{color:"#fff"}}>Jobs</Link>
</>
)}

<Link to="/rules" style={{color:"#fff"}}>Rules</Link>
<Link to="/privacy" style={{color:"#fff"}}>Privacy</Link>
<Link to="/about" style={{color:"#fff"}}>About</Link>

{nickname && (
<button onClick={logout} style={{
background:"#ef4444",
border:"none",
padding:"8px 12px",
borderRadius:"6px",
color:"#fff"
}}>
Logout
</button>
)}

</div>

{/* MOBILE BUTTON */}
<div className="md:hidden">
<button
onClick={()=>setMobileOpen(!mobileOpen)}
style={{
background:"transparent",
border:"none",
color:"#fff",
fontSize:"22px"
}}
>
☰
</button>
</div>

</div>

{/* MOBILE MENU */}
{mobileOpen && (
<div style={{
background:"#1e293b",
padding:"12px",
display:"flex",
flexDirection:"column",
gap:"12px",
maxHeight:"70vh",
overflowY:"auto"
}}>

{!nickname && <Link to="/" style={{color:"#fff"}}>Home</Link>}

{/* ✅ COLLAPSIBLE ROOMS (FINAL FIX) */}
{!nickname && (
<div style={{marginTop:"6px"}}>

<div
onClick={()=>setRoomsOpen(prev=>!prev)}
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
cursor:"pointer"
}}
>
<span style={{
fontWeight:"bold",
fontSize:"12px",
color:"#94a3b8",
textTransform:"uppercase"
}}>
Rooms
</span>

<span style={{fontSize:"12px"}}>
{roomsOpen ? "▲" : "▼"}
</span>
</div>

{roomsOpen && (
<div style={{
display:"flex",
flexDirection:"column",
gap:"6px",
marginTop:"8px"
}}>

{rooms.slice(0,6).map((room)=>(
<Link
key={room._id}
to={`/join?room=${room.slug}`}
onClick={()=>setMobileOpen(false)}
style={{
color:"#e2e8f0",
fontSize:"14px",
padding:"8px 10px",
borderRadius:"6px",
background:"#334155"
}}
>
# {room.name}
</Link>
))}

{rooms.length > 6 && (
<Link
to="/rooms"
onClick={()=>setMobileOpen(false)}
style={{
color:"#60a5fa",
fontSize:"13px",
padding:"6px 8px"
}}
>
View all →
</Link>
)}

</div>
)}

</div>
)}

{/* LOGGED IN MOBILE */}
{nickname && (
<>
<button onClick={goToChat} style={{background:"none",border:"none",color:"#fff"}}>
Chat
</button>
<Link to="/confessions" style={{color:"#fff"}}>Confessions</Link>
<Link to="/it-experiences" style={{color:"#fff"}}>IT Experiences</Link>
<Link to="/jobs" style={{color:"#fff"}}>Jobs</Link>
</>
)}

<Link to="/rules" style={{color:"#fff"}}>Rules</Link>
<Link to="/privacy" style={{color:"#fff"}}>Privacy</Link>
<Link to="/about" style={{color:"#fff"}}>About</Link>

{nickname && (
<button onClick={logout} style={{
background:"#ef4444",
border:"none",
padding:"8px",
color:"#fff",
borderRadius:"6px"
}}>
Logout
</button>
)}

</div>
)}

</nav>
)
}
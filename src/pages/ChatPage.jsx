// import API_URL from "../config"
// import { useEffect, useState } from "react"
// import socket from "../socket/socket"
// import { useRef } from "react" // 🔥 ADDED

// import SidebarRooms from "../components/SidebarRooms"
// import ChatWindow from "../components/ChatWindow"
// import UsersList from "../components/UsersList"
// import MessageInput from "../components/MessageInput"

// export default function ChatPage(){

// const nickname = sessionStorage.getItem("nickname")
// const savedRoom = sessionStorage.getItem("room")

// const [rooms,setRooms] = useState([])
// const [room,setRoom] = useState(savedRoom || "")

// const [roomMessages,setRoomMessages] = useState([])
// const [privateMessages,setPrivateMessages] = useState([])

// const [users,setUsers] = useState([])
// const [typingUser,setTypingUser] = useState("")

// const [unread,setUnread] = useState({})
// const [privateUnread,setPrivateUnread] = useState({})

// const [privateChats,setPrivateChats] = useState([])
// const [privateTarget,setPrivateTarget] = useState(null)

// const [onlineUsers,setOnlineUsers] = useState([])

// const roomRef = useRef(room)              // 🔥 ADDED
// const privateRef = useRef(privateTarget)  // 🔥 ADDED
// const audioRef = useRef(null)

// /* MOBILE */
// const [showSidebar,setShowSidebar] = useState(false)
// const [showUsers,setShowUsers] = useState(false)

// /* PIN */
// const [roomPin,setRoomPin] = useState(null)
// const [globalPin,setGlobalPin] = useState(null)

// /* TIMER */
// const [timeLeft,setTimeLeft] = useState(0)

// const formatTime = (sec)=>{
// const m = Math.floor(sec / 60)
// const s = sec % 60
// return `${m}:${s.toString().padStart(2,"0")}`
// }

// const playSound = () => {
// if(audioRef.current){
// audioRef.current.currentTime = 0
// audioRef.current.play().catch(()=>{})
// }
// }


// // 🔥 KEEP REFS UPDATED
// useEffect(()=>{
// roomRef.current = room
// privateRef.current = privateTarget
// },[room, privateTarget])

// /* TIMER */
// useEffect(()=>{
// let interval

// const startTimer = (targetTime)=>{
// clearInterval(interval)

// interval = setInterval(()=>{
// const diff = Math.floor((targetTime - Date.now()) / 1000)

// if(diff <= 0){
// setTimeLeft(0)
// if(room){
// socket.emit("join_room",{nickname,room})
// }
// return
// }

// setTimeLeft(diff)
// },1000)
// }

// fetch(`${API_URL}/cleanup-time`)
// .then(res=>res.json())
// .then(data=> startTimer(data.nextCleanupTime))

// socket.on("cleanup_timer",(time)=> startTimer(time))

// return ()=>{
// clearInterval(interval)
// socket.off("cleanup_timer")
// }
// },[room])

// /* LOAD ROOMS */
// useEffect(()=>{
// fetch(`${API_URL}/api/rooms`)
// .then(res=>res.json())
// .then(data=>{
// if(Array.isArray(data)){
// setRooms(data)
// }
// })
// },[])

// /* AUTO SELECT ROOM */
// useEffect(()=>{
// if(rooms.length > 0 && !room){
// const first = rooms[0].slug
// setRoom(first)
// sessionStorage.setItem("room",first)
// }
// },[rooms])

// /* JOIN ROOM */
// useEffect(()=>{
// if(!room) return

// socket.emit("join_room",{nickname,room})

// // 🔥 FORCE history fetch (fix)
// socket.emit("get_room_history", room)

// },[room])

// // 🔥 BACKUP HISTORY LOAD (guaranteed fix)
// useEffect(()=>{
// if(!room) return

// const timeout = setTimeout(()=>{
// socket.emit("get_room_history", room)
// },300) // small delay ensures listener ready

// return ()=> clearTimeout(timeout)

// },[room])

// /* LOAD PINS */
// useEffect(()=>{
// if(!room) return

// fetch(`${API_URL}/admin/pins?room=${room}`)
// .then(res=>res.json())
// .then(data=>{
// setRoomPin(data.room || null)
// setGlobalPin(data.global || null)
// })
// },[room])

// /* SOCKET EVENTS */
// useEffect(()=>{

// socket.off("room_message")
// socket.off("room_history")
// socket.off("system_event")
// socket.off("private_message")
// socket.off("private_history")
// socket.off("room_users")
// socket.off("online_users")
// socket.off("pin_updated")
// socket.off("room_typing")
// socket.off("private_typing")

// const handleRoomMessage = (msg)=>{

//     if(msg.nickname !== nickname){
// playSound()
// }
// if (msg.room !== roomRef.current || privateRef.current){
// setUnread(prev=>({
// ...prev,
// [msg.room]:(prev[msg.room]||0)+1
// }))
// return
// }
// setRoomMessages(prev=>[...prev,msg])
// }

// const handlePinUpdate = ()=>{
// fetch(`${API_URL}/admin/pins?room=${room}`)
// .then(res=>res.json())
// .then(data=>{
// setRoomPin(data.room || null)
// setGlobalPin(data.global || null)
// })
// }

// socket.on("room_message",handleRoomMessage)

// // 🔥 ONLY CHANGE INSIDE SOCKET EVENTS

// socket.on("room_history",(h)=>{
// if(h){

// // ensure UI is in room mode
// setPrivateTarget(null)

// // force React to update AFTER mode switch
// setTimeout(()=>{
// setRoomMessages(h)
// },0)

// }
// })

// socket.on("system_event",(d)=>{
// if(!privateTarget){
// setRoomMessages(prev=>[...prev,{system:true,message:d.message}])
// }
// })

// socket.on("private_message",(msg)=>{
//     if(msg.from !== nickname){
// playSound()
// }
// const other = msg.from===nickname ? msg.to : msg.from

// setPrivateChats(prev=>prev.includes(other)?prev:[...prev,other])

// if(privateTarget===other){
// setPrivateMessages(prev=>[...prev,msg])
// }else{
// setPrivateUnread(prev=>({
// ...prev,[other]:(prev[other]||0)+1
// }))
// }
// })

// socket.on("private_history",(history)=>{
// setPrivateMessages(history || [])
// })

// socket.on("room_users",setUsers)
// socket.on("online_users",setOnlineUsers)
// socket.on("pin_updated",handlePinUpdate)

// /* TYPING */
// socket.on("room_typing",(data)=>{
// if(!privateTarget){
// setTypingUser(data.nickname)
// setTimeout(()=>setTypingUser(""),1500)
// }
// })

// socket.on("private_typing",(data)=>{
// if(privateTarget === data.from){
// setTypingUser(data.from)
// setTimeout(()=>setTypingUser(""),1500)
// }
// })

// return ()=>{
// socket.off("room_message")
// socket.off("room_history")
// socket.off("system_event")
// socket.off("private_message")
// socket.off("private_history")
// socket.off("room_users")
// socket.off("online_users")
// socket.off("pin_updated")
// socket.off("room_typing")
// socket.off("private_typing")
// }

// },[room, privateTarget, nickname])

// /* JOIN ROOM */
// const joinRoom=(slug)=>{

// // exit private first
// setPrivateTarget(null)

// // set room
// setRoom(slug)

// // clear UI
// setRoomMessages([])
// setTypingUser("")

// sessionStorage.setItem("room",slug)

// setUnread(prev=>({...prev,[slug]:0}))
// setShowSidebar(false)

// // ✅ CRITICAL: fetch AFTER state settles
// setTimeout(()=>{
// socket.emit("get_room_history", slug)
// },150)

// }

// /* PRIVATE */
// const openPrivateChat=(user)=>{
// if(user===nickname) return

// setPrivateTarget(user)
// setPrivateMessages([])
// setPrivateUnread(prev=>({...prev,[user]:0}))
// setShowUsers(false)

// /* 🔥 LOAD HISTORY */
// socket.emit("load_private_messages",{
// from: nickname,
// to: user
// })
// }

// /* DELETE CHAT */
// const deletePrivateChat = async (user)=>{
// if(!window.confirm(`Delete chat with ${user}?`)) return

// try{
// await fetch(`${API_URL}/delete-chat`,{
// method:"POST",
// headers:{ "Content-Type":"application/json" },
// body:JSON.stringify({ user1:nickname, user2:user })
// })

// setPrivateChats(prev=>prev.filter(u=>u !== user))

// if(privateTarget === user){
// setPrivateTarget(null)
// setPrivateMessages([])
// }

// }catch(err){
// console.log(err)
// }
// }

// /* SEND */
// const sendMessage=(text,image)=>{
// if(privateTarget){
// socket.emit("private_message",{from:nickname,to:privateTarget,message:text,image})
// }else{
// socket.emit("room_message",{room,nickname,message:text,image})
// }
// }

// /* TYPING SEND */
// const handleTypingInput=()=>{
// if(privateTarget){
// socket.emit("private_typing",{from:nickname,to:privateTarget})
// }else{
// socket.emit("room_typing",{room,nickname})
// }
// }

// const isPrivateActive = privateTarget !== null

// const messages = isPrivateActive
// ? privateMessages
// : roomMessages

// const currentTitle = privateTarget
// ? `Private chat with ${privateTarget}`
// : `# ${rooms.find(r=>r.slug===room)?.name || room}`

// return(

// <div className="h-screen w-full overflow-hidden relative">

// {/* MOBILE SIDEBAR */}
// {showSidebar && (
// <div className="absolute z-50 h-full w-64 bg-slate-900 shadow-lg">
// <div className="flex justify-between items-center p-3 border-b border-slate-700 text-white">
// <span>Rooms</span>
// <button onClick={()=>setShowSidebar(false)}>✖</button>
// </div>

// <SidebarRooms
// rooms={rooms}
// joinRoom={joinRoom}
// unread={unread}
// privateChats={privateChats}
// privateUnread={privateUnread}
// openPrivateChat={openPrivateChat}
// deletePrivateChat={deletePrivateChat}
// onlineUsers={onlineUsers}
// />
// </div>
// )}

// {/* MOBILE USERS */}
// {showUsers && (
// <div className="absolute right-0 z-50 h-full w-64 bg-white shadow-lg">
// <div className="flex justify-between items-center p-3 border-b">
// <span>Users</span>
// <button onClick={()=>setShowUsers(false)}>✖</button>
// </div>

// <UsersList
// users={users}
// onlineUsers={onlineUsers}
// startPrivateChat={openPrivateChat}
// />
// </div>
// )}

// {/* DESKTOP */}
// <div className="hidden md:flex h-full">

// <SidebarRooms
// rooms={rooms}
// joinRoom={joinRoom}
// unread={unread}
// privateChats={privateChats}
// privateUnread={privateUnread}
// openPrivateChat={openPrivateChat}
// deletePrivateChat={deletePrivateChat}
// onlineUsers={onlineUsers}
// />

// <div className="flex flex-col flex-1">

// <div className="bg-indigo-600 text-white p-3 flex justify-between">
// <span>{currentTitle}</span>
// <span>👤 {nickname}</span>
// </div>

// {/* PIN */}
// {!privateTarget && (globalPin || roomPin) && (
// <div className="px-3 py-2 bg-yellow-50 border-b space-y-1">
// {globalPin && (
// <div className="flex justify-between text-sm">
// <span>📌 {globalPin.message}</span>
// <span className="text-xs text-gray-500">Global</span>
// </div>
// )}
// {roomPin && (
// <div className="flex justify-between text-sm bg-yellow-100 px-2 py-1 rounded">
// <span>📌 {roomPin.message}</span>
// <span className="text-xs text-gray-500">Room</span>
// </div>
// )}
// </div>
// )}

// {/* TIMER */}
// <div className="text-xs text-gray-600 flex justify-between px-3 py-1 bg-gray-100 border-b">
// <span>Messages auto-delete in</span>
// <span className="text-red-500 font-semibold">⏱ {formatTime(timeLeft)}</span>
// </div>

// <ChatWindow messages={messages} typingUser={typingUser}/>

// <MessageInput 
// sendMessage={sendMessage} 
// onTyping={handleTypingInput}
// isPrivate={!!privateTarget}
// />

// </div>

// <UsersList
// users={users}
// onlineUsers={onlineUsers}
// startPrivateChat={openPrivateChat}
// />

// </div>

// {/* MOBILE */}
// <div className="md:hidden flex flex-col h-full">

// <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
// <button onClick={()=>setShowSidebar(true)}>☰</button>
// <span>{currentTitle}</span>
// <button onClick={()=>setShowUsers(true)}>👥</button>
// </div>

// {/* PIN */}
// {!privateTarget && (globalPin || roomPin) && (
// <div className="px-3 py-2 bg-yellow-50 space-y-1">
// {globalPin && (
// <div className="text-sm flex justify-between">
// <span>📌 {globalPin.message}</span>
// <span className="text-xs text-gray-500">Global</span>
// </div>
// )}
// {roomPin && (
// <div className="text-sm flex justify-between bg-yellow-100 px-2 py-1 rounded">
// <span>📌 {roomPin.message}</span>
// <span className="text-xs text-gray-500">Room</span>
// </div>
// )}
// </div>
// )}

// {/* TIMER */}
// <div className="text-xs text-gray-600 flex justify-between px-3 py-1 bg-gray-100">
// <span>Auto delete</span>
// <span className="text-red-500 font-semibold">⏱ {formatTime(timeLeft)}</span>
// </div>

// <ChatWindow messages={messages} typingUser={typingUser}/>

// <MessageInput 
// sendMessage={sendMessage} 
// onTyping={handleTypingInput}
// isPrivate={!!privateTarget}
// />


// <audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />
// </div>

// </div>

// )

// }



// ------------------------------------------------------------------------------------------------//


// import API_URL from "../config"
// import { useEffect, useState } from "react"
// import socket from "../socket/socket"
// import { useRef } from "react" // 🔥 ADDED

// import SidebarRooms from "../components/SidebarRooms"
// import ChatWindow from "../components/ChatWindow"
// import UsersList from "../components/UsersList"
// import MessageInput from "../components/MessageInput"

// export default function ChatPage(){

// const nickname = sessionStorage.getItem("nickname")
// const savedRoom = sessionStorage.getItem("room")

// const [rooms,setRooms] = useState([])
// const [room,setRoom] = useState(savedRoom || "")

// const [roomMessages,setRoomMessages] = useState([])
// const [privateMessages,setPrivateMessages] = useState([])

// const [users,setUsers] = useState([])
// const [typingUser,setTypingUser] = useState("")

// const [unread,setUnread] = useState({})
// const [privateUnread,setPrivateUnread] = useState({})

// const [privateChats,setPrivateChats] = useState([])
// const [privateTarget,setPrivateTarget] = useState(null)

// const [onlineUsers,setOnlineUsers] = useState([])

// const roomRef = useRef(room)              // 🔥 ADDED
// const privateRef = useRef(privateTarget)  // 🔥 ADDED
// const audioRef = useRef(null)
// const notifiedRoomsRef = useRef({})

// /* MOBILE */
// const [showSidebar,setShowSidebar] = useState(false)
// const [showUsers,setShowUsers] = useState(false)

// /* PIN */
// const [roomPin,setRoomPin] = useState(null)
// const [globalPin,setGlobalPin] = useState(null)

// /* TIMER */
// const [timeLeft,setTimeLeft] = useState(0)

// const formatTime = (sec)=>{
// const m = Math.floor(sec / 60)
// const s = sec % 60
// return `${m}:${s.toString().padStart(2,"0")}`
// }

// const playSound = () => {
// if(audioRef.current){
// audioRef.current.currentTime = 0
// audioRef.current.play().catch(()=>{})
// }
// }


// // 🔥 KEEP REFS UPDATED
// useEffect(()=>{
// roomRef.current = room
// privateRef.current = privateTarget
// },[room, privateTarget])

// /* TIMER */
// useEffect(()=>{
// let interval

// const startTimer = (targetTime)=>{
// clearInterval(interval)

// interval = setInterval(()=>{
// const diff = Math.floor((targetTime - Date.now()) / 1000)

// if(diff <= 0){
// setTimeLeft(0)
// if(room){
// socket.emit("join_room",{nickname,room})
// }
// return
// }

// setTimeLeft(diff)
// },1000)
// }

// fetch(`${API_URL}/cleanup-time`)
// .then(res=>res.json())
// .then(data=> startTimer(data.nextCleanupTime))

// socket.on("cleanup_timer",(time)=> startTimer(time))

// return ()=>{
// clearInterval(interval)
// socket.off("cleanup_timer")
// }
// },[room])

// /* LOAD ROOMS */
// useEffect(()=>{
// fetch(`${API_URL}/api/rooms`)
// .then(res=>res.json())
// .then(data=>{
// if(Array.isArray(data)){
// setRooms(data)
// }
// })
// },[])

// /* AUTO SELECT ROOM */
// useEffect(()=>{
// if(rooms.length > 0 && !room){
// const first = rooms[0].slug
// setRoom(first)
// sessionStorage.setItem("room",first)
// }
// },[rooms])

// /* JOIN ROOM */
// useEffect(()=>{
// if(!room) return

// socket.emit("join_room",{nickname,room})

// // 🔥 FORCE history fetch (fix)
// socket.emit("get_room_history", room)

// },[room])

// // 🔥 BACKUP HISTORY LOAD (guaranteed fix)
// useEffect(()=>{
// if(!room) return

// const timeout = setTimeout(()=>{
// socket.emit("get_room_history", room)
// },300) // small delay ensures listener ready

// return ()=> clearTimeout(timeout)

// },[room])

// /* LOAD PINS */
// useEffect(()=>{
// if(!room) return

// fetch(`${API_URL}/admin/pins?room=${room}`)
// .then(res=>res.json())
// .then(data=>{
// setRoomPin(data.room || null)
// setGlobalPin(data.global || null)
// })
// },[room])

// /* SOCKET EVENTS */
// useEffect(()=>{

// socket.off("room_message")
// socket.off("room_history")
// socket.off("system_event")
// socket.off("private_message")
// socket.off("private_history")
// socket.off("room_users")
// socket.off("online_users")
// socket.off("pin_updated")
// socket.off("room_typing")
// socket.off("private_typing")

// const handleRoomMessage = (msg)=>{

    
// if (msg.room !== roomRef.current || privateRef.current){

// const alreadyNotified = notifiedRoomsRef.current[msg.room]

// // 🔔 PLAY ONLY FIRST TIME
// if(msg.nickname !== nickname && !alreadyNotified){
// playSound()
// notifiedRoomsRef.current[msg.room] = true
// }

// setUnread(prev=>({
// ...prev,
// [msg.room]:(prev[msg.room]||0)+1
// }))

// return
// }
// setRoomMessages(prev=>[...prev,msg])
// }

// const handlePinUpdate = ()=>{
// fetch(`${API_URL}/admin/pins?room=${room}`)
// .then(res=>res.json())
// .then(data=>{
// setRoomPin(data.room || null)
// setGlobalPin(data.global || null)
// })
// }

// socket.on("room_message",handleRoomMessage)

// // 🔥 ONLY CHANGE INSIDE SOCKET EVENTS

// socket.on("room_history",(h)=>{
// if(h){

// // ensure UI is in room mode
// setPrivateTarget(null)

// // force React to update AFTER mode switch
// setTimeout(()=>{
// setRoomMessages(h)
// },0)

// }
// })

// socket.on("system_event",(d)=>{
// if(!privateTarget){
// setRoomMessages(prev=>[...prev,{system:true,message:d.message}])
// }
// })

// socket.on("private_message",(msg)=>{

// const other = msg.from===nickname ? msg.to : msg.from

// // 🔔 PLAY SOUND ONLY IF CHAT NOT OPEN
// if(msg.from !== nickname && privateTarget !== other){
// playSound()
// }

// setPrivateChats(prev=>prev.includes(other)?prev:[...prev,other])

// if(privateTarget===other){
// setPrivateMessages(prev=>[...prev,msg])
// }else{
// setPrivateUnread(prev=>({
// ...prev,[other]:(prev[other]||0)+1
// }))
// }
// })

// socket.on("private_history",(history)=>{
// setPrivateMessages(history || [])
// })

// socket.on("room_users",setUsers)
// socket.on("online_users",setOnlineUsers)
// socket.on("pin_updated",handlePinUpdate)

// /* TYPING */
// socket.on("room_typing",(data)=>{
// if(!privateTarget){
// setTypingUser(data.nickname)
// setTimeout(()=>setTypingUser(""),1500)
// }
// })

// socket.on("private_typing",(data)=>{
// if(privateTarget === data.from){
// setTypingUser(data.from)
// setTimeout(()=>setTypingUser(""),1500)
// }
// })

// return ()=>{
// socket.off("room_message")
// socket.off("room_history")
// socket.off("system_event")
// socket.off("private_message")
// socket.off("private_history")
// socket.off("room_users")
// socket.off("online_users")
// socket.off("pin_updated")
// socket.off("room_typing")
// socket.off("private_typing")
// }

// },[room, privateTarget, nickname])

// /* JOIN ROOM */
// const joinRoom=(slug)=>{

// // exit private first
// setPrivateTarget(null)

// // set room
// setRoom(slug)

// // clear UI
// setRoomMessages([])
// setTypingUser("")

// sessionStorage.setItem("room",slug)

// setUnread(prev=>({...prev,[slug]:0}))
// // 🔥 RESET SOUND FLAG
// delete notifiedRoomsRef.current[slug]
// setShowSidebar(false)

// // ✅ CRITICAL: fetch AFTER state settles
// setTimeout(()=>{
// socket.emit("get_room_history", slug)
// },150)

// }

// /* PRIVATE */
// const openPrivateChat=(user)=>{
// if(user===nickname) return

// setPrivateTarget(user)
// setPrivateMessages([])
// setPrivateUnread(prev=>({...prev,[user]:0}))
// setShowUsers(false)

// /* 🔥 LOAD HISTORY */
// socket.emit("load_private_messages",{
// from: nickname,
// to: user
// })
// }

// /* DELETE CHAT */
// const deletePrivateChat = async (user)=>{
// if(!window.confirm(`Delete chat with ${user}?`)) return

// try{
// await fetch(`${API_URL}/delete-chat`,{
// method:"POST",
// headers:{ "Content-Type":"application/json" },
// body:JSON.stringify({ user1:nickname, user2:user })
// })

// setPrivateChats(prev=>prev.filter(u=>u !== user))

// if(privateTarget === user){
// setPrivateTarget(null)
// setPrivateMessages([])
// }

// }catch(err){
// console.log(err)
// }
// }

// /* SEND */
// const sendMessage=(text,image)=>{
// if(privateTarget){
// socket.emit("private_message",{from:nickname,to:privateTarget,message:text,image})
// }else{
// socket.emit("room_message",{room,nickname,message:text,image})
// }
// }

// /* TYPING SEND */
// const handleTypingInput=()=>{
// if(privateTarget){
// socket.emit("private_typing",{from:nickname,to:privateTarget})
// }else{
// socket.emit("room_typing",{room,nickname})
// }
// }

// const isPrivateActive = privateTarget !== null

// const messages = isPrivateActive
// ? privateMessages
// : roomMessages

// const currentTitle = privateTarget
// ? `Private chat with ${privateTarget}`
// : `# ${rooms.find(r=>r.slug===room)?.name || room}`

// return(

// <div className="h-screen w-full overflow-hidden relative">

// {/* MOBILE SIDEBAR */}
// {showSidebar && (
// <div className="absolute z-50 h-full w-64 bg-slate-900 shadow-lg">
// <div className="flex justify-between items-center p-3 border-b border-slate-700 text-white">
// <span>Rooms</span>
// <button onClick={()=>setShowSidebar(false)}>✖</button>
// </div>

// <SidebarRooms
// rooms={rooms}
// joinRoom={joinRoom}
// unread={unread}
// privateChats={privateChats}
// privateUnread={privateUnread}
// openPrivateChat={openPrivateChat}
// deletePrivateChat={deletePrivateChat}
// onlineUsers={onlineUsers}
// />
// </div>
// )}

// {/* MOBILE USERS */}
// {showUsers && (
// <div className="absolute right-0 z-50 h-full w-64 bg-white shadow-lg">
// <div className="flex justify-between items-center p-3 border-b">
// <span>Users</span>
// <button onClick={()=>setShowUsers(false)}>✖</button>
// </div>

// <UsersList
// users={users}
// onlineUsers={onlineUsers}
// startPrivateChat={openPrivateChat}
// />
// </div>
// )}

// {/* DESKTOP */}
// <div className="hidden md:flex h-full">

// <SidebarRooms
// rooms={rooms}
// joinRoom={joinRoom}
// unread={unread}
// privateChats={privateChats}
// privateUnread={privateUnread}
// openPrivateChat={openPrivateChat}
// deletePrivateChat={deletePrivateChat}
// onlineUsers={onlineUsers}
// />

// <div className="flex flex-col flex-1">

// <div className="bg-indigo-600 text-white p-3 flex justify-between">
// <span>{currentTitle}</span>
// <span>👤 {nickname}</span>
// </div>

// {/* PIN */}
// {!privateTarget && (globalPin || roomPin) && (
// <div className="px-3 py-2 bg-yellow-50 border-b space-y-1">
// {globalPin && (
// <div className="flex justify-between text-sm">
// <span>📌 {globalPin.message}</span>
// <span className="text-xs text-gray-500">Global</span>
// </div>
// )}
// {roomPin && (
// <div className="flex justify-between text-sm bg-yellow-100 px-2 py-1 rounded">
// <span>📌 {roomPin.message}</span>
// <span className="text-xs text-gray-500">Room</span>
// </div>
// )}
// </div>
// )}

// {/* TIMER */}
// <div className="text-xs text-gray-600 flex justify-between px-3 py-1 bg-gray-100 border-b">
// <span>Messages auto-delete in</span>
// <span className="text-red-500 font-semibold">⏱ {formatTime(timeLeft)}</span>
// </div>

// <ChatWindow messages={messages} typingUser={typingUser}/>

// <MessageInput 
// sendMessage={sendMessage} 
// onTyping={handleTypingInput}
// isPrivate={!!privateTarget}
// />

// </div>

// <UsersList
// users={users}
// onlineUsers={onlineUsers}
// startPrivateChat={openPrivateChat}
// />

// </div>

// {/* MOBILE */}
// <div className="md:hidden flex flex-col h-full">

// <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
// <button onClick={()=>setShowSidebar(true)}>☰</button>
// <span>{currentTitle}</span>
// <button onClick={()=>setShowUsers(true)}>👥</button>
// </div>

// {/* PIN */}
// {!privateTarget && (globalPin || roomPin) && (
// <div className="px-3 py-2 bg-yellow-50 space-y-1">
// {globalPin && (
// <div className="text-sm flex justify-between">
// <span>📌 {globalPin.message}</span>
// <span className="text-xs text-gray-500">Global</span>
// </div>
// )}
// {roomPin && (
// <div className="text-sm flex justify-between bg-yellow-100 px-2 py-1 rounded">
// <span>📌 {roomPin.message}</span>
// <span className="text-xs text-gray-500">Room</span>
// </div>
// )}
// </div>
// )}

// {/* TIMER */}
// <div className="text-xs text-gray-600 flex justify-between px-3 py-1 bg-gray-100">
// <span>Auto delete</span>
// <span className="text-red-500 font-semibold">⏱ {formatTime(timeLeft)}</span>
// </div>

// <ChatWindow messages={messages} typingUser={typingUser}/>

// <MessageInput 
// sendMessage={sendMessage} 
// onTyping={handleTypingInput}
// isPrivate={!!privateTarget}
// />


// <audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />
// </div>

// </div>

// )

// }




// -------------------------------------------------------------------------------------//

import { Helmet } from "react-helmet-async"

import API_URL from "../config"
import { useEffect, useState } from "react"
import socket from "../socket/socket"
import { useRef } from "react" // 🔥 ADDED

import SidebarRooms from "../components/SidebarRooms"
import ChatWindow from "../components/ChatWindow"
import UsersList from "../components/UsersList"
import MessageInput from "../components/MessageInput"

export default function ChatPage(){

const nickname = sessionStorage.getItem("nickname")
const savedRoom = sessionStorage.getItem("room")

// useEffect(()=>{
//   if(!nickname || !savedRoom) return

//   // 🔥 FORCE REJOIN AFTER PAGE LOAD
//   socket.emit("join_room",{
//     nickname,
//     room: savedRoom
//   })

// },[])

const [rooms,setRooms] = useState([])
const [room,setRoom] = useState(savedRoom || "")

const [roomMessages,setRoomMessages] = useState([])
const [privateMessages,setPrivateMessages] = useState([])

const [users,setUsers] = useState([])
const [typingUser,setTypingUser] = useState("")

const [unread,setUnread] = useState({})
const [privateUnread,setPrivateUnread] = useState({})

const [privateChats,setPrivateChats] = useState([])
useEffect(()=>{
  const saved = sessionStorage.getItem("privateChats")
  if(saved){
    setPrivateChats(JSON.parse(saved))
  }
},[])
const [privateTarget,setPrivateTarget] = useState(null)

const [onlineUsers,setOnlineUsers] = useState([])

const roomRef = useRef(room)              // 🔥 ADDED
const privateRef = useRef(privateTarget)  // 🔥 ADDED
const audioRef = useRef(null)
const notifiedRoomsRef = useRef({})

/* MOBILE */
const [showSidebar,setShowSidebar] = useState(false)
const [showUsers,setShowUsers] = useState(false)

/* PIN */
const [roomPin,setRoomPin] = useState(null)
const [globalPin,setGlobalPin] = useState(null)

/* TIMER */
const [timeLeft,setTimeLeft] = useState(0)

const formatTime = (sec)=>{
const m = Math.floor(sec / 60)
const s = sec % 60
return `${m}:${s.toString().padStart(2,"0")}`
}

const playSound = () => {
if(audioRef.current){
audioRef.current.currentTime = 0
audioRef.current.play().catch(()=>{})
}
}


// 🔥 KEEP REFS UPDATED
useEffect(()=>{
roomRef.current = room
privateRef.current = privateTarget
},[room, privateTarget])

/* TIMER */
useEffect(()=>{
let interval

const startTimer = (targetTime)=>{
clearInterval(interval)

interval = setInterval(()=>{
const diff = Math.floor((targetTime - Date.now()) / 1000)

if(diff <= 0){
setTimeLeft(0)
if(room){
socket.emit("join_room",{nickname,room})
}
return
}

setTimeLeft(diff)
},1000)
}

fetch(`${API_URL}/cleanup-time`)
.then(res=>res.json())
.then(data=> startTimer(data.nextCleanupTime))

socket.on("cleanup_timer",(time)=> startTimer(time))

return ()=>{
clearInterval(interval)
socket.off("cleanup_timer")
}
},[room])

/* LOAD ROOMS */
useEffect(()=>{
fetch(`${API_URL}/api/rooms`)
.then(res=>res.json())
.then(data=>{
if(Array.isArray(data)){
setRooms(data)
}
})
},[])

useEffect(()=>{
  const loadUsers = ()=>{
    fetch(`${API_URL}/admin/online-users`)
      .then(res=>res.json())
      .then(setOnlineUsers)
  }

  loadUsers()
},[])

/* AUTO SELECT ROOM */
useEffect(()=>{
if(rooms.length > 0 && !room){
const first = rooms[0].slug
setRoom(first)
sessionStorage.setItem("room",first)
}
},[rooms])

/* JOIN ROOM */
useEffect(()=>{
  if(!room || !nickname) return

  const join = () => {
    socket.emit("join_room",{nickname,room})
    socket.emit("get_room_history", room)
  }

  if(socket.connected){
    join()
  } else {
    socket.once("connect", join)
  }

},[room, nickname])

// 🔥 BACKUP HISTORY LOAD (guaranteed fix)
useEffect(()=>{
if(!room) return

const timeout = setTimeout(()=>{
socket.emit("get_room_history", room)
},300) // small delay ensures listener ready

return ()=> clearTimeout(timeout)

},[room])

/* LOAD PINS */
useEffect(()=>{
if(!room) return

fetch(`${API_URL}/admin/pins?room=${room}`)
.then(res=>res.json())
.then(data=>{
setRoomPin(data.room || null)
setGlobalPin(data.global || null)
})
},[room])

/* SOCKET EVENTS */
useEffect(()=>{

  const handleOnlineUsers = (data)=>{
  console.log("ONLINE USERS:", data)
  setOnlineUsers(data)
}

socket.off("room_message")
socket.off("room_history")
socket.off("system_event")
socket.off("private_message")
socket.off("private_history")
socket.off("room_users")
socket.off("online_users", setOnlineUsers)
socket.off("pin_updated")
socket.off("room_typing")
socket.off("private_typing")

const handleRoomMessage = (msg)=>{

    
if (msg.room !== roomRef.current || privateRef.current){

const alreadyNotified = notifiedRoomsRef.current[msg.room]

// 🔔 PLAY ONLY FIRST TIME
if(msg.nickname !== nickname && !alreadyNotified){
playSound()
notifiedRoomsRef.current[msg.room] = true
}

setUnread(prev=>({
...prev,
[msg.room]:(prev[msg.room]||0)+1
}))

return
}
setRoomMessages(prev=>[...prev,msg])
}

const handlePinUpdate = ()=>{
fetch(`${API_URL}/admin/pins?room=${room}`)
.then(res=>res.json())
.then(data=>{
setRoomPin(data.room || null)
setGlobalPin(data.global || null)
})
}

socket.on("room_message",handleRoomMessage)

// 🔥 ONLY CHANGE INSIDE SOCKET EVENTS

socket.on("room_history",(h)=>{
if(h){

// ensure UI is in room mode
setPrivateTarget(null)

// force React to update AFTER mode switch
setTimeout(()=>{
setRoomMessages(h)
},0)

}
})

socket.on("system_event",(d)=>{
if(!privateTarget){
setRoomMessages(prev=>[...prev,{system:true,message:d.message}])
}
})

socket.on("private_message",(msg)=>{

const other = msg.from===nickname ? msg.to : msg.from

// 🔔 PLAY SOUND ONLY IF CHAT NOT OPEN
if(msg.from !== nickname && privateTarget !== other){
playSound()
}

setPrivateChats(prev=>{
  const updated = prev.includes(other) ? prev : [...prev,other]

  sessionStorage.setItem("privateChats", JSON.stringify(updated))

  return updated
})

if(privateTarget===other){
setPrivateMessages(prev=>[...prev,msg])
}else{
setPrivateUnread(prev=>({
...prev,[other]:(prev[other]||0)+1
}))
}
})

socket.on("private_history",(history)=>{
setPrivateMessages(history || [])
})



socket.on("image_deleted",(data)=>{
  const { messageId } = data

  setPrivateMessages(prev =>
    prev.filter(msg => msg._id !== messageId)
  )
})

socket.on("room_users",setUsers)
socket.on("online_users", handleOnlineUsers)
socket.on("pin_updated",handlePinUpdate)

/* TYPING */
socket.on("room_typing",(data)=>{
if(!privateTarget){
setTypingUser(data.nickname)
setTimeout(()=>setTypingUser(""),1500)
}
})

socket.on("private_typing",(data)=>{
if(privateTarget === data.from){
setTypingUser(data.from)
setTimeout(()=>setTypingUser(""),1500)
}
})

return ()=>{
  socket.off("image_deleted")
socket.off("room_message")
socket.off("room_history")
socket.off("system_event")
socket.off("private_message")
socket.off("private_history")
socket.off("room_users")
socket.off("online_users", handleOnlineUsers)
socket.off("pin_updated")
socket.off("room_typing")
socket.off("private_typing")
}

},[room, privateTarget, nickname])

/* JOIN ROOM */
const joinRoom=(slug)=>{

// exit private first
setPrivateTarget(null)

// set room
setRoom(slug)

// clear UI
setRoomMessages([])
setTypingUser("")

sessionStorage.setItem("room",slug)

setUnread(prev=>({...prev,[slug]:0}))
// 🔥 RESET SOUND FLAG
delete notifiedRoomsRef.current[slug]
setShowSidebar(false)

// ✅ CRITICAL: fetch AFTER state settles
setTimeout(()=>{
socket.emit("get_room_history", slug)
},150)

}

/* PRIVATE */
const openPrivateChat=(user)=>{
if(user===nickname) return

setPrivateTarget(user)
setPrivateMessages([])
setPrivateUnread(prev=>({...prev,[user]:0}))
setShowUsers(false)

/* 🔥 LOAD HISTORY */
socket.emit("load_private_messages",{
from: nickname,
to: user
})
}

/* DELETE CHAT */
const deletePrivateChat = async (user)=>{
if(!window.confirm(`Delete chat with ${user}?`)) return

try{
await fetch(`${API_URL}/delete-chat`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ user1:nickname, user2:user })
})

setPrivateChats(prev=>{
  const updated = prev.filter(u=>u !== user)

  sessionStorage.setItem("privateChats", JSON.stringify(updated))

  return updated
})

if(privateTarget === user){
setPrivateTarget(null)
setPrivateMessages([])
}

}catch(err){
console.log(err)
}
}

/* SEND */
const sendMessage=(text,image)=>{
if(privateTarget){
socket.emit("private_message",{from:nickname,to:privateTarget,message:text,image})
}else{
socket.emit("room_message",{room,nickname,message:text,image})
}
}

/* TYPING SEND */
const handleTypingInput=()=>{
if(privateTarget){
socket.emit("private_typing",{from:nickname,to:privateTarget})
}else{
socket.emit("room_typing",{room,nickname})
}
}

const isPrivateActive = privateTarget !== null

const messages = isPrivateActive
? privateMessages
: roomMessages

const currentTitle = privateTarget
? `Private chat with ${privateTarget}`
: `# ${rooms.find(r=>r.slug===room)?.name || room}`

return(

  <>
  <Helmet>
    <title>UnfilteredIT Chat Rooms</title>
    <meta 
      name="description" 
      content="Join real-time anonymous chat rooms for IT professionals." 
    />
  </Helmet>

<div className="h-screen w-full overflow-hidden relative">

{/* MOBILE SIDEBAR */}
{showSidebar && (
<div className="absolute z-50 h-full w-64 bg-slate-900 shadow-lg">
<div className="flex justify-between items-center p-3 border-b border-slate-700 text-white">
<span>Rooms</span>
<button onClick={()=>setShowSidebar(false)}>✖</button>
</div>

<SidebarRooms
rooms={rooms}
joinRoom={joinRoom}
unread={unread}
privateChats={privateChats}
privateUnread={privateUnread}
openPrivateChat={openPrivateChat}
deletePrivateChat={deletePrivateChat}
onlineUsers={onlineUsers}
/>
</div>
)}

{/* MOBILE USERS */}
{showUsers && (
<div className="absolute right-0 z-50 h-full w-64 bg-white shadow-lg">
<div className="flex justify-between items-center p-3 border-b">
<span>Users</span>
<button onClick={()=>setShowUsers(false)}>✖</button>
</div>

<UsersList
users={users}
onlineUsers={onlineUsers}
startPrivateChat={openPrivateChat}
/>
</div>
)}

{/* DESKTOP */}
<div className="hidden md:flex h-full">

<SidebarRooms
rooms={rooms}
joinRoom={joinRoom}
unread={unread}
privateChats={privateChats}
privateUnread={privateUnread}
openPrivateChat={openPrivateChat}
deletePrivateChat={deletePrivateChat}
onlineUsers={onlineUsers}
/>

<div className="flex flex-col flex-1">

<div className="bg-indigo-600 text-white p-3 flex justify-between">
<span>{currentTitle}</span>
<span>👤 {nickname}</span>
</div>

{/* PIN */}
{!privateTarget && (globalPin || roomPin) && (
<div className="px-3 py-2 bg-yellow-50 border-b space-y-1">
{globalPin && (
<div className="flex justify-between text-sm">
<span>📌 {globalPin.message}</span>
<span className="text-xs text-gray-500">Global</span>
</div>
)}
{roomPin && (
<div className="flex justify-between text-sm bg-yellow-100 px-2 py-1 rounded">
<span>📌 {roomPin.message}</span>
<span className="text-xs text-gray-500">Room</span>
</div>
)}
</div>
)}

{/* TIMER */}
<div className="text-xs text-gray-600 flex justify-between px-3 py-1 bg-gray-100 border-b">
<span>Messages auto-delete in</span>
<span className="text-red-500 font-semibold">⏱ {formatTime(timeLeft)}</span>
</div>

<ChatWindow messages={messages} typingUser={typingUser}/>

<MessageInput 
sendMessage={sendMessage} 
onTyping={handleTypingInput}
isPrivate={!!privateTarget}
/>

</div>

<UsersList
users={users}
onlineUsers={onlineUsers}
startPrivateChat={openPrivateChat}
/>

</div>

{/* MOBILE */}
<div className="md:hidden flex flex-col h-full">

<div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
<button onClick={()=>setShowSidebar(true)}>☰</button>
<span>{currentTitle}</span>
<button onClick={()=>setShowUsers(true)}>👥</button>
</div>

{/* PIN */}
{!privateTarget && (globalPin || roomPin) && (
<div className="px-3 py-2 bg-yellow-50 space-y-1">
{globalPin && (
<div className="text-sm flex justify-between">
<span>📌 {globalPin.message}</span>
<span className="text-xs text-gray-500">Global</span>
</div>
)}
{roomPin && (
<div className="text-sm flex justify-between bg-yellow-100 px-2 py-1 rounded">
<span>📌 {roomPin.message}</span>
<span className="text-xs text-gray-500">Room</span>
</div>
)}
</div>
)}

{/* TIMER */}
<div className="text-xs text-gray-600 flex justify-between px-3 py-1 bg-gray-100">
<span>Auto delete</span>
<span className="text-red-500 font-semibold">⏱ {formatTime(timeLeft)}</span>
</div>

<ChatWindow messages={messages} typingUser={typingUser}/>

<MessageInput 
sendMessage={sendMessage} 
onTyping={handleTypingInput}
isPrivate={!!privateTarget}
/>


<audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />
</div>

</div>

</>

)

}





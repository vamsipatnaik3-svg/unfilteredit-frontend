// export default function SidebarRooms({
// rooms = [],
// joinRoom,
// unread = {},
// privateChats = [],
// privateUnread = {},
// openPrivateChat,
// deletePrivateChat,
// onlineUsers = []
// }){

// return(

// <div className="w-64 bg-slate-900 text-white p-4 overflow-y-auto">

// <h2 className="text-lg font-semibold mb-4">Rooms</h2>

// {rooms.map((room)=>{

// const roomKey = room.slug

// return(
// <div
// key={room._id}
// onClick={()=>joinRoom(roomKey)}
// className="cursor-pointer py-2 px-2 hover:bg-slate-800 rounded flex justify-between items-center"
// >
// <span># {room.name}</span>

// {unread[roomKey] > 0 && (
// <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
// {unread[roomKey]}
// </span>
// )}

// </div>
// )
// })}

// <div className="mt-6">

// <h2 className="text-lg font-semibold mb-3">Chats</h2>

// {privateChats.length === 0 && (
// <p className="text-gray-400 text-sm">No private chats</p>
// )}

// {privateChats.map((user)=>{

// const online = onlineUsers.includes(user)

// return(
// <div
// key={user}
// className="flex items-center justify-between py-2 px-2 hover:bg-slate-800 rounded"
// >

// <div
// onClick={()=>openPrivateChat(user)}
// className="cursor-pointer flex items-center gap-2"
// >
// <span className={`w-2 h-2 rounded-full ${online ? "bg-green-500" : "bg-gray-500"}`}></span>
// <span>{user}</span>
// </div>

// <div className="flex items-center gap-2">

// {privateUnread[user] > 0 && (
// <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
// {privateUnread[user]}
// </span>
// )}

// <span
// onClick={()=>deletePrivateChat(user)}
// className="text-red-400 cursor-pointer text-sm hover:text-red-600"
// >
// ✖
// </span>

// </div>

// </div>
// )
// })}

// </div>

// </div>
// )
// }


// export default function SidebarRooms({
// rooms = [],
// joinRoom,
// unread = {},
// privateChats = [],
// privateUnread = {},
// openPrivateChat,
// deletePrivateChat,
// onlineUsers = []
// }){

// return(

// <div className="w-64 h-full bg-slate-900 text-white p-4 overflow-y-auto flex flex-col">

// {/* ROOMS */}

// <h2 className="text-lg font-semibold mb-4">Rooms</h2>

// <div className="space-y-1">

// {rooms.map((room)=>{

// const roomKey = room.slug

// return(
// <div
// key={room._id}
// onClick={()=>joinRoom(roomKey)}
// className="cursor-pointer py-2 px-2 hover:bg-slate-800 rounded flex justify-between items-center transition"
// >

// <span className="truncate"># {room.name}</span>

// {unread[roomKey] > 0 && (
// <span className="bg-red-500 text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
// {unread[roomKey]}
// </span>
// )}

// </div>
// )
// })}

// </div>

// {/* PRIVATE CHATS */}

// <div className="mt-6 flex-1 overflow-y-auto">

// <h2 className="text-lg font-semibold mb-3">Chats</h2>

// {privateChats.length === 0 && (
// <p className="text-gray-400 text-sm">No private chats</p>
// )}

// <div className="space-y-1">

// {privateChats.map((user)=>{

// const online = onlineUsers.includes(user)

// return(
// <div
// key={user}
// className="flex items-center justify-between py-2 px-2 hover:bg-slate-800 rounded transition"
// >

// {/* LEFT SIDE */}
// <div
// onClick={()=>openPrivateChat(user)}
// className="cursor-pointer flex items-center gap-2 min-w-0"
// >

// <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
// online ? "bg-green-500" : "bg-gray-500"
// }`}></span>

// <span className="truncate">{user}</span>

// </div>

// {/* RIGHT SIDE */}
// <div className="flex items-center gap-2 flex-shrink-0">

// {privateUnread[user] > 0 && (
// <span className="bg-red-500 text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
// {privateUnread[user]}
// </span>
// )}

// <span
// onClick={(e)=>{
// e.stopPropagation() // ✅ prevent opening chat when deleting
// deletePrivateChat(user)
// }}
// className="text-red-400 cursor-pointer text-sm hover:text-red-600"
// >
// ✖
// </span>

// </div>

// </div>
// )
// })}

// </div>

// </div>

// </div>

// )
// }

import API_URL from "../config"
export default function SidebarRooms({
rooms = [],
joinRoom,
unread = {},
privateChats = [],
privateUnread = {},
openPrivateChat,
deletePrivateChat,
onlineUsers = []
}){

return(

<div className="w-64 h-full bg-slate-900 text-white p-4 overflow-y-auto flex flex-col">

{/* ROOMS */}

<h2 className="text-lg font-semibold mb-4">Rooms</h2>

<div className="space-y-1">

{rooms.map((room)=>{

const roomKey = room.slug

return(
<div
key={room._id}
onClick={()=>joinRoom(roomKey)}
className="cursor-pointer py-2 px-2 hover:bg-slate-800 rounded flex justify-between items-center transition"
>

<span className="truncate"># {room.name}</span>

{unread[roomKey] > 0 && (
<span className="bg-red-500 text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
{unread[roomKey]}
</span>
)}

</div>
)
})}

</div>

{/* PRIVATE CHATS */}

<div className="mt-6 flex-1 overflow-y-auto">

<h2 className="text-lg font-semibold mb-3">Chats</h2>

{privateChats.length === 0 && (
<p className="text-gray-400 text-sm">No private chats</p>
)}

<div className="space-y-1">

{privateChats.map((user)=>{

const online = onlineUsers.includes(user.toLowerCase())

return(
<div
key={user}
className="flex items-center justify-between py-2 px-2 hover:bg-slate-800 rounded transition"
>

{/* LEFT SIDE → OPEN CHAT */}
<div
onClick={()=>openPrivateChat(user)}
className="cursor-pointer flex items-center gap-2 min-w-0"
>

<span className={`w-2 h-2 rounded-full flex-shrink-0 ${
online ? "bg-green-500" : "bg-gray-500"
}`}></span>

<span className="truncate">{user}</span>

</div>

{/* RIGHT SIDE → DELETE */}
<div className="flex items-center gap-2 flex-shrink-0">

{privateUnread[user] > 0 && (
<span className="bg-red-500 text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
{privateUnread[user]}
</span>
)}

<span
onClick={(e)=>{
e.stopPropagation()   // 🔥 VERY IMPORTANT FIX
deletePrivateChat(user)
}}
className="text-red-400 cursor-pointer text-sm hover:text-red-600"
>
✖
</span>

</div>

</div>
)
})}

</div>

</div>

</div>

)
}
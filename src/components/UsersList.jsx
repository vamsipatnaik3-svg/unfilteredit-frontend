import API_URL from "../config"
export default function UsersList({users=[],onlineUsers=[],startPrivateChat}){

return(

<div className="w-60 bg-gray-100 p-4 border-l">

<h2 className="font-semibold mb-3">
Users
</h2>

{users.length===0 &&(

<p className="text-gray-500 text-sm">
No users
</p>

)}

<ul className="space-y-2">

{users.map((u,i)=>{

const isOnline = onlineUsers.includes(u.toLowerCase())

return(

<li
key={i}
onClick={()=>{

const nickname = sessionStorage.getItem("nickname")

if(u === nickname) return   // prevent self chat

startPrivateChat(u)

}}
className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded"
>

<div className="relative">

<div className="w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">

{u[0]?.toUpperCase()}

</div>

<span
className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white ${
isOnline ? "bg-green-500" : "bg-gray-400"
}`}

> </span>

</div>

{u}

</li>

)

})}

</ul>

</div>

)

}

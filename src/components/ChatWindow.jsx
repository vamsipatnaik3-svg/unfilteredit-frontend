// // export default function ChatWindow({messages,typingUser,removeImage}){

// // const deleteImage = async(msg)=>{

// // await fetch("http://localhost:3000/delete-image",{
// // method:"POST",
// // headers:{
// // "Content-Type":"application/json"
// // },
// // body:JSON.stringify({
// // imageUrl:msg.image,
// // messageId:msg._id
// // })
// // })

// // /* remove message locally */
// // removeImage(msg._id)

// // }

// // return(

// // <div className="flex-1 overflow-y-auto p-4 bg-gray-100">

// // {messages.map((msg,i)=>{

// // if(msg.system){

// // return(

// // <div
// // key={i}
// // className="text-center text-gray-500 text-sm my-2"
// // >

// // {msg.message}

// // </div>

// // )

// // }

// // return(

// // <div key={msg._id || i} className="mb-3">

// // <span className="font-semibold text-indigo-600">
// // {msg.nickname || msg.from || "Unknown"}
// // </span>

// // {msg.message && (

// // <span className="ml-2">
// // {msg.message}
// // </span>

// // )}

// // {msg.image && (

// // <div className="mt-2 relative">

// // <img
// // src={msg.image}
// // className="max-w-[220px] rounded shadow"
// // />

// // <button
// // onClick={()=>deleteImage(msg)}
// // className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
// // >
// // Delete
// // </button>

// // </div>

// // )}

// // </div>

// // )

// // })}

// // {typingUser && (

// // <div className="text-sm text-gray-500 mt-2">
// // {typingUser} is typing...
// // </div>

// // )}

// // </div>

// // )

// // }


// export default function ChatWindow({messages,typingUser,removeImage}){

// const deleteImage = async(msg)=>{

// await fetch("http://localhost:3000/delete-image",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// imageUrl:msg.image,
// messageId:msg._id
// })
// })

// /* remove message locally */
// removeImage(msg._id)

// }

// /* FORMAT MESSAGE TIME */

// const formatTime = (time)=>{

// if(!time) return ""

// const date = new Date(time)

// return date.toLocaleTimeString([],{
// hour:"2-digit",
// minute:"2-digit"
// })

// }

// return(

// <div className="flex-1 overflow-y-auto p-4 bg-gray-100">

// {messages.map((msg,i)=>{

// if(msg.system){

// return(

// <div
// key={i}
// className="text-center text-gray-500 text-sm my-2"
// >

// {msg.message}

// </div>

// )

// }

// return(

// <div key={msg._id || i} className="mb-3">

// {/* USER NAME + MESSAGE */}

// <div>

// <span className="font-semibold text-indigo-600">
// {msg.nickname || msg.from || "Unknown"}
// </span>

// {msg.message && (

// <span className="ml-2">
// {msg.message}
// </span>

// )}

// </div>

// {/* IMAGE MESSAGE */}

// {msg.image && (

// <div className="mt-2 relative">

// <img
// src={msg.image}
// className="max-w-[220px] rounded shadow"
// />

// <button
// onClick={()=>deleteImage(msg)}
// className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
// >
// Delete
// </button>

// </div>

// )}

// {/* TIMESTAMP */}

// {msg.createdAt && (

// <div className="text-xs text-gray-500 mt-1 ml-1">
// {formatTime(msg.createdAt)}
// </div>

// )}

// </div>

// )

// })}

// {typingUser && (

// <div className="text-sm text-gray-500 mt-2">
// {typingUser} is typing...
// </div>

// )}

// </div>

// )

// }

import API_URL from "../config"

export default function ChatWindow({messages,typingUser,removeImage}){

const deleteImage = async(msg)=>{

await fetch(`${API_URL}/delete-image`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
imageUrl:msg.image,
messageId:msg._id
})
})

/* remove message locally */
removeImage(msg._id)

}

/* FORMAT MESSAGE TIME */

const formatTime = (time)=>{

if(!time) return ""

const date = new Date(time)

return date.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})

}

return(

<div className="flex-1 overflow-y-auto p-4 bg-gray-100">

{messages.map((msg,i)=>{

if(msg.system){

return(

<div
key={i}
className="text-center text-gray-500 text-sm my-2"
>

{msg.message}

</div>

)

}

return(

<div key={msg._id || i} className="mb-3">

{/* USER NAME + MESSAGE */}

<div>

<span className="font-semibold text-indigo-600">
{msg.nickname || msg.from || "Unknown"}
</span>

{msg.message && (

<span className="ml-2">
{msg.message}
</span>

)}

</div>

{/* IMAGE MESSAGE */}

{msg.image && (

<div className="mt-2 relative">

<img
src={msg.image}
className="max-w-[220px] rounded shadow"
/>

<button
onClick={()=>deleteImage(msg)}
className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
>
Delete
</button>

</div>

)}

{/* TIMESTAMP */}

{msg.createdAt && (

<div className="text-xs text-gray-500 mt-1 ml-1">
{formatTime(msg.createdAt)}
</div>

)}

</div>

)

})}

{typingUser && (

<div className="text-sm text-gray-500 mt-2">
{typingUser} is typing...
</div>

)}

</div>

)

}
import API_URL from "../config"
import {useEffect,useState} from "react"

import { Helmet } from "react-helmet-async"

export default function ITExperiences(){

const [posts,setPosts] = useState([])

const [title,setTitle] = useState("")
const [content,setContent] = useState("")

const sessionId = sessionStorage.getItem("sessionId")

useEffect(()=>{

loadPosts()

},[])

const loadPosts = async()=>{

const res = await fetch(`${API_URL}/it-experiences`)

const data = await res.json()

setPosts(data)

}

const submit = async()=>{

if(!title || !content) return

await fetch(`${API_URL}/it-experiences`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title,
content
})

})

setTitle("")
setContent("")

loadPosts()

}

const likePost = async(id)=>{

const res = await fetch(`${API_URL}/it-experiences/${id}/like`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
sessionId
})

})

const updated = await res.json()

setPosts(posts.map(p=>p._id===id ? updated : p))

}

return(

    <>
  <Helmet>
    <title>IT Job Experiences | UnfilteredIT</title>
    <meta 
      name="description" 
      content="Explore real IT job experiences, company culture insights, and employee stories from top tech companies." 
    />
  </Helmet>

<div className="max-w-3xl mx-auto p-6">

<h1 className="text-3xl font-bold mb-6">
IT Experiences
</h1>

<div className="border p-4 rounded mb-6">

<input
placeholder="Title"
value={title}
onChange={e=>setTitle(e.target.value)}
className="border w-full p-2 mb-3"
/>

<textarea
placeholder="Share your IT experience..."
value={content}
onChange={e=>setContent(e.target.value)}
className="border w-full p-2 mb-3 h-32"
/>

<button
onClick={submit}
className="bg-indigo-600 text-white px-4 py-2 rounded"
>

Post

</button>

</div>

{posts.map(post=>(

<div key={post.slug} className="border p-4 rounded mb-4">

<h2 className="font-bold text-lg">
{post.title}
</h2>

<p className="text-gray-700 mt-2">
{post.content.substring(0,200)}...
</p>

<div className="flex gap-4 mt-3">

<button
onClick={()=>likePost(post._id)}
className="text-red-500"
>
❤️ {post.likes}
</button>

<button
onClick={()=>window.location.href=`/it-experiences/${post.slug}`}
className="text-blue-600"
>
💬 {post.comments.length}
</button>

<button
onClick={()=>window.location.href=`/it-experiences/${post.slug}`}
className="text-indigo-600"
>
Read more
</button>

</div>

</div>

))}

</div>

</>

)

}

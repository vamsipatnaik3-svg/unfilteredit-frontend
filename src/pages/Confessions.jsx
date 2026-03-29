import API_URL from "../config"
import {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import { Helmet } from "react-helmet-async"

export default function Confessions(){

const [confessions,setConfessions] = useState([])
const [title,setTitle] = useState("")
const [content,setContent] = useState("")

const load = ()=>{

fetch(`${API_URL}/confessions`)
.then(res=>res.json())
.then(data=>setConfessions(data))

}

useEffect(()=>{

load()

},[])

const post = async()=>{

const sessionId = sessionStorage.getItem("sessionId")

await fetch(`${API_URL}/confessions`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title,
content,
sessionId
})

})

setTitle("")
setContent("")

load()

}

const like = async(id)=>{

const sessionId = sessionStorage.getItem("sessionId")

await fetch(`${API_URL}/confessions/${id}/like`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({sessionId})

})

load()

}

return(

    <>
  <Helmet>
    <title>IT Confessions | UnfilteredIT</title>
    <meta 
      name="description" 
      content="Read and share anonymous IT confessions. Real workplace stories from software engineers and tech employees." 
    />
  </Helmet>


<div className="w-full max-w-3xl mx-auto p-4 sm:p-6">

<h1 className="text-3xl font-bold mb-6">
Anonymous Confessions
</h1>

<div className="border p-4 mb-6 rounded">

<input
placeholder="Title"
value={title}
onChange={e=>setTitle(e.target.value)}
className="border w-full p-2 sm:p-3 mb-3 text-sm sm:text-base"
/>

<textarea
placeholder="Write your confession..."
value={content}
onChange={e=>setContent(e.target.value)}
className="border w-full p-2 sm:p-3 mb-3 text-sm sm:text-base"
/>

<button
onClick={post}
className="bg-indigo-600 text-white px-4 py-2 rounded"
>

Post

</button>

</div>

{confessions.map(c=>(

<div key={c._id} className="border p-4 rounded mb-4">

<h2 className="font-bold text-lg">

<Link to={`/confession/${c.slug}`}>
{c.title}
</Link>

</h2>

<p className="text-gray-600 mb-3">

{c.content.slice(0,180)}...

<Link
to={`/confession/${c.slug}`}
className="text-blue-600 ml-2"
>

Read more

</Link>

</p>

<div className="flex gap-4 text-sm">

<button
onClick={()=>like(c._id)}
className="text-red-600"
>

❤️ {c.likes}

</button>

<span>

💬 {c.comments.length}

</span>

</div>

</div>

))}

</div>

</>

)

}

import API_URL from "../config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ITExperiencePost(){

const { slug } = useParams()

const [post,setPost] = useState(null)
const [comment,setComment] = useState("")
const [morePosts,setMorePosts] = useState([])

const sessionId = sessionStorage.getItem("sessionId")

/* LOAD POST */

useEffect(()=>{

if(!slug) return

fetch(`${API_URL}/it-experiences/${slug}`)
.then(res=>res.json())
.then(data=>{

if(!data || data.error){
console.log("Post not found")
return
}

setPost(data)

})

/* LOAD MORE POSTS */

fetch(`${API_URL}/it-experiences`)
.then(res=>res.json())
.then(data=>{

const filtered = data
.filter(p=>p.slug !== slug)
.slice(0,5)

setMorePosts(filtered)

})

},[slug])

/* LIKE */

const like = async()=>{

if(!post) return

const res = await fetch(`${API_URL}/it-experiences/${post._id}/like`,{

method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({sessionId})

})

const updated = await res.json()

setPost(updated)

}

/* COMMENT */

const addComment = async()=>{

if(!comment || !post) return

const res = await fetch(`${API_URL}/it-experiences/${post._id}/comment`,{

method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({text:comment})

})

const updated = await res.json()

setPost(updated)
setComment("")

}

/* LOADING */

if(!post){

return(
<div className="max-w-3xl mx-auto p-10 text-center text-gray-500">
Loading experience...
</div>
)

}

return(

<div className="max-w-3xl mx-auto p-6">

{/* ANONOVA BANNER AT TOP */}

<div className="bg-indigo-600 text-white p-4 rounded text-center mb-6">

💬 Shared anonymously on <b>UnfilteredIT</b>

<a
href="/login"
className="ml-2 underline"
>

Join the discussion

</a>

</div>


{/* TITLE */}

<h1 className="text-3xl font-bold mb-4">

{post.title}

</h1>


{/* CONTENT */}

<p className="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">

{post.content}

</p>


{/* LIKE */}

<button
onClick={like}
className="text-red-500 text-lg mb-6"
>

❤️ {post.likes}

</button>


{/* COMMENTS */}

<h2 className="text-xl font-semibold mb-4">

Comments

</h2>

<div className="mb-6">

{post.comments && post.comments.map((c,i)=>(

<div
key={i}
className="flex items-start gap-2 text-gray-700 mb-3"
>

<span className="text-gray-400">💬</span>

<div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xl">
{c.text}
</div>

</div>

))}

</div>


{/* COMMENT INPUT */}

<input
value={comment}
onChange={e=>setComment(e.target.value)}
placeholder="Write comment..."
className="border w-full p-2 mb-3"
/>

<button
onClick={addComment}
className="bg-indigo-600 text-white px-4 py-2 rounded"
>

Comment

</button>


{/* CTA */}

<div className="bg-gray-100 p-5 rounded mt-10 text-center">

<p className="font-semibold mb-3">

Have an IT experience to share?

</p>

<a
href="/login"
className="bg-indigo-600 text-white px-4 py-2 rounded"
>

Share your experience

</a>

</div>


{/* MORE POSTS */}

<h3 className="text-xl font-semibold mt-10 mb-4">

More IT Experiences

</h3>

{morePosts.map(p=>(

<a
key={p._id}
href={`/it-experiences/${p.slug}`}
>

<div className="border p-3 mb-2 hover:bg-gray-100 rounded">

{p.title}

</div>

</a>

))}

</div>

)

}

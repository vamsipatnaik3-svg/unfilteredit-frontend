import API_URL from "../config"
import {useParams} from "react-router-dom"
import {useEffect,useState} from "react"

export default function ConfessionDetails(){

const {slug} = useParams()

const [confession,setConfession] = useState(null)
const [comment,setComment] = useState("")
const [morePosts,setMorePosts] = useState([])

const like = async()=>{

const sessionId = sessionStorage.getItem("sessionId")

await fetch(`${API_URL}/confessions/${confession._id}/like`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({sessionId})

})

load()

}

const load = ()=>{

fetch(`${API_URL}/confessions/${slug}`)
.then(res=>res.json())
.then(data=>setConfession(data))

}

/* LOAD MORE CONFESSIONS */

const loadMore = ()=>{

fetch(`${API_URL}/confessions`)
.then(res=>res.json())
.then(data=>{

const filtered = data
.filter(p=>p.slug !== slug)
.slice(0,5)

setMorePosts(filtered)

})

}

useEffect(()=>{

load()
loadMore()

},[slug])

const sendComment = async()=>{

await fetch(`${API_URL}/confessions/${confession._id}/comment`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({text:comment})

})

setComment("")
load()

}

if(!confession) return <p>Loading...</p>

return(

<div className="max-w-3xl mx-auto p-6">

{/* ANONOVA BANNER */}

<div className="bg-indigo-600 text-white p-3 rounded mb-6 text-center">

💬 This confession was shared anonymously on <b>UnfilteredIT</b>

<a
href="/join"
className="ml-3 underline"

>

Join the discussion

</a>

</div>

<h1 className="text-3xl font-bold mb-4">

{confession.title}

</h1>

<p className="mb-6 whitespace-pre-line">

{confession.content}

</p>

<div className="mb-6">

<button
onClick={like}
className="text-red-600"

>

❤️ {confession.likes}

</button>

</div>

<h3 className="font-semibold mb-3">

Comments

</h3>

{confession.comments.map((c,i)=>(

<div
key={i}
className="flex items-start gap-2 text-gray-700 mb-2"
>

<span className="text-gray-400">💬</span>

<div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xl">
{c.text}
</div>

</div>

))}

<input
value={comment}
onChange={e=>setComment(e.target.value)}
placeholder="Add comment"
className="border p-2 w-full mb-2"
/>

<button
onClick={sendComment}
className="bg-blue-600 text-white px-3 py-1 rounded"

>

Comment

</button>

{/* CTA */}

<div className="bg-gray-100 p-4 rounded mt-8 text-center">

<p className="mb-3 font-semibold">

Have a similar story?

</p>

<a
href="/join"
className="bg-indigo-600 text-white px-4 py-2 rounded"

>

Share your confession anonymously

</a>

</div>

{/* MORE CONFESSIONS */}

<h3 className="text-xl font-semibold mt-10 mb-4">

More Confessions

</h3>

{morePosts.map(post=>(

<a
key={post._id}
href={`/confessions/${post.slug}`}

>

<div className="border p-3 mb-2 hover:bg-gray-100">

{post.title}

</div>

</a>

))}

</div>

)

}

import API_URL from "../config"
import { useState } from "react"

export default function Feedback(){

const [message,setMessage] = useState("")
const [sent,setSent] = useState(false)

const submitFeedback = async ()=>{

if(!message) return

await fetch(`${API_URL}/api/feedback`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message})

})

setSent(true)

setMessage("")

}

return(

<div style={{
minHeight:"100vh",
background:"linear-gradient(135deg,#0f172a,#1e293b)",
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"40px"
}}>

<div style={{
width:"500px",
background:"#fff",
padding:"35px",
borderRadius:"12px",
boxShadow:"0 15px 40px rgba(0,0,0,0.25)"
}}>

<h1 style={{textAlign:"center",marginBottom:"20px"}}>
Send Feedback
</h1>

<textarea
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Write your feedback..."
style={{
width:"100%",
height:"130px",
padding:"12px",
border:"1px solid #ccc",
borderRadius:"6px",
marginBottom:"15px"
}}
/>

<button
onClick={submitFeedback}
style={{
width:"100%",
padding:"12px",
background:"#6366f1",
color:"#fff",
border:"none",
borderRadius:"6px"
}}
>
Submit Feedback
</button>

{sent && (
<p style={{marginTop:"10px",color:"green"}}>
Feedback sent successfully
</p>
)}

</div>

</div>

)

}
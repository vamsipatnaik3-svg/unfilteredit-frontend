import API_URL from "../config"
export default function AboutUs(){

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
maxWidth:"900px",
width:"100%",
background:"#ffffff",
padding:"40px",
borderRadius:"12px",
boxShadow:"0 15px 40px rgba(0,0,0,0.25)"
}}>

<h1 style={{textAlign:"center",marginBottom:"25px"}}>
About Unfiltered IT
</h1>

<p style={{marginBottom:"20px",color:"#444"}}>
Unfiltered IT is an anonymous chat platform where people can connect
with strangers, make friends, and have real-time conversations
without revealing their identity.
</p>

<p style={{marginBottom:"20px",color:"#444"}}>
Our mission is to create a safe and friendly space where users
from different companies, cities and states can interact freely.
</p>

<p style={{marginBottom:"20px",color:"#444"}}>
Users can join public chat rooms, send private messages,
and share images instantly.
</p>

<p style={{color:"#444"}}>
We continuously work to improve the platform and provide
a secure experience for everyone.
</p>

</div>

</div>

)

}
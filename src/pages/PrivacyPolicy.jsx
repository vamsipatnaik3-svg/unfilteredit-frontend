import API_URL from "../config"
export default function PrivacyPolicy(){

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
Privacy Policy
</h1>

<p style={{marginBottom:"20px",color:"#444"}}>
Unfiltered IT respects your privacy. Our platform allows users to chat
anonymously without revealing personal identity.
</p>

<h3>Information We Collect</h3>

<p style={{marginBottom:"20px",color:"#444"}}>
We may temporarily store chat messages to provide real-time chat
functionality. Messages are periodically deleted to protect user privacy.
</p>

<h3>Cookies & Local Storage</h3>

<p style={{marginBottom:"20px",color:"#444"}}>
We may use browser storage to maintain chat sessions and improve
user experience.
</p>

<h3>Third-Party Services</h3>

<p style={{marginBottom:"20px",color:"#444"}}>
Analytics or advertising tools may collect anonymous usage data
to improve the platform.
</p>

<h3>User Responsibility</h3>

<p style={{color:"#444"}}>
Users should never share personal information such as phone numbers,
addresses, or passwords in chat rooms.
</p>

</div>

</div>

)

}
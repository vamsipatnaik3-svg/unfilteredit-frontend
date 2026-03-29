import API_URL from "../config"
export default function ChatRules(){

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
maxWidth:"800px",
width:"100%",
background:"#ffffff",
padding:"40px",
borderRadius:"12px",
boxShadow:"0 15px 40px rgba(0,0,0,0.2)"
}}>

<h1 style={{
textAlign:"center",
marginBottom:"25px",
color:"#111",
fontSize:"32px"
}}>
Chat Rules
</h1>

<p style={{
textAlign:"center",
marginBottom:"30px",
color:"#555"
}}>
Please follow these rules to keep Unfiltered IT safe and enjoyable for everyone.
</p>

<ul style={{
listStyle:"none",
padding:"0",
lineHeight:"2",
fontSize:"16px"
}}>

<li style={rule}>🚫 No harassment or abusive language.</li>

<li style={rule}>🔒 Do not share personal information.</li>

<li style={rule}>⚖️ No illegal activities.</li>

<li style={rule}>📢 No spam or advertising links.</li>

<li style={rule}>❌ No hate speech or discrimination.</li>

<li style={rule}>🤝 Respect other users.</li>

</ul>

<p style={{
marginTop:"25px",
color:"#444",
textAlign:"center"
}}>
Violation of these rules may result in removal from chat rooms.
</p>

</div>

</div>

)

}

const rule = {
padding:"12px 15px",
background:"#f8fafc",
marginBottom:"10px",
borderRadius:"6px",
border:"1px solid #e2e8f0"
}
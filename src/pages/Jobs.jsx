import API_URL from "../config"
import {useEffect,useState} from "react"
import { Helmet } from "react-helmet-async"

export default function Jobs(){

const [jobs,setJobs] = useState([])

useEffect(()=>{

fetch(`${API_URL}/jobs`)
.then(res=>res.json())
.then(data=>setJobs(data))

},[])

return(
    <>
  <Helmet>
    <title>IT Jobs & Opportunities | UnfilteredIT</title>
    <meta 
      name="description" 
      content="Find IT job opportunities, openings, and career updates in tech companies. Stay updated with latest hiring trends." 
    />
  </Helmet>

<div className="max-w-4xl mx-auto p-6">

<h1 className="text-3xl font-bold mb-8">
Job Notifications
</h1>

{jobs.map(job=>(

<div
key={job._id}
className="border rounded-lg shadow-sm p-5 mb-6 bg-white"
>

{/* COMPANY LOGO */}

{job.image && (

<div className="mb-4 flex justify-center">

<img
src={job.image}
alt={job.company}
className="h-20 object-contain"
/>

</div>

)}

{/* JOB INFO */}

<h2 className="text-xl font-semibold mb-2">

{job.company} - {job.title}

</h2>

<p className="text-gray-700">
<b>Experience:</b> {job.experience || "Not specified"}
</p>

<p className="text-gray-700">
<b>Location:</b> {job.location || "Not specified"}
</p>

<p className="text-gray-700 mb-3">
<b>Apply before:</b> {job.lastDate || "No deadline"}
</p>

{/* APPLY BUTTON */}

<a
href={job.applyLink}
target="_blank"
rel="noopener noreferrer"
className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
>

Apply Now

</a>

</div>

))}

</div>

</>

)

}

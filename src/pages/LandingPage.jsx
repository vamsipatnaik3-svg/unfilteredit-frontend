import API_URL from "../config"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"

export default function LandingPage(){

const navigate = useNavigate()

const startChat = () => {

navigate("/join")

}

return(

    <>
  <Helmet>
    <title>UnfilteredIT – Anonymous Chat for IT Employees</title>
    <meta 
      name="description" 
      content="Join UnfilteredIT to share anonymous IT experiences, confessions, and real workplace stories." 
    />
  </Helmet>

<div className="min-h-screen bg-slate-50 overflow-x-hidden">


{/* HERO */}

<section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center px-4 py-16 md:py-32">

<h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">
Talk Freely. Stay Anonymous.

</h2>

<p className="max-w-xl mx-auto mb-6 md:mb-10 text-sm md:text-lg opacity-90 px-2">

Join anonymous chat rooms, meet new people,  
and start conversations instantly.

</p>

<button
onClick={startChat}
className="bg-white text-indigo-600 font-semibold px-10 py-4 rounded-lg text-lg hover:scale-105 transition">

Start Chatting

</button>

</section>



{/* FEATURES */}

<section className="py-24">

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

<div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">

<h3 className="text-xl font-semibold mb-3">
Anonymous Chat Rooms
</h3>

<p className="text-gray-600">
Join chat rooms and talk with strangers without revealing your identity.
</p>

</div>


<div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">

<h3 className="text-xl font-semibold mb-3">
Make New Friends
</h3>

<p className="text-gray-600">
Meet interesting people from different cities,companies and build friendships.
</p>

</div>


<div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">

<h3 className="text-xl font-semibold mb-3">
Private Messaging
</h3>

<p className="text-gray-600">
Send direct private messages to users you connect with in chat rooms.
</p>

</div>

</div>

</section>



{/* CTA */}

<section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-24 text-center">

<h2 className="text-4xl font-bold mb-6">

Start Chatting Now

</h2>

<p className="mb-10 opacity-90">

Thousands of people are chatting right now.

</p>

<button
onClick={startChat}
className="bg-sky-500 hover:bg-sky-600 px-10 py-4 rounded-lg text-lg transition">

Enter Chat Room

</button>

</section>



{/* FOOTER */}

<footer className="bg-slate-900 text-gray-300 py-12">

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

<div>

<h4 className="text-white font-semibold mb-2">
Unfiltered IT
</h4>

<p className="text-sm">

Unfiltered IT is an anonymous social chat platform where you can meet new people and have real-time conversations.

</p>

</div>

<div>

<h4 className="text-white font-semibold mb-2">
Information
</h4>

<ul className="text-sm space-y-1">

<li>
<Link to="/privacy" className="hover:underline">
Privacy Policy
</Link>
</li>

<li>
<Link to="/rules" className="hover:underline">
Chat Rules
</Link>
</li>

<li>
<Link to="/about" className="hover:underline">
About Us
</Link>
</li>

</ul>

</div>

<div>

<h4 className="text-white font-semibold mb-2">
Feedback
</h4>

<p className="text-sm">

Have suggestions or issues?  
Contact us anytime.
unfilteredIT@gmail.com

</p>

</div>

</div>

</footer>

</div>

</>

)


}
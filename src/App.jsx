import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"

import LandingPage from "./pages/LandingPage"
import JoinChat from "./pages/JoinChat"
import ChatPage from "./pages/ChatPage"
import AboutUs from "./pages/AboutUs"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import ChatRules from "./pages/ChatRules"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import Confessions from "./pages/Confessions"
import ConfessionDetails from "./pages/ConfessionDetails"
import ITExperiences from "./pages/ITExperiences"
import ITExperiencePost from "./pages/ITExperiencePost"
import Jobs from "./pages/Jobs"






function App(){

return(


<>
<Navbar/>

<Routes>


<Route path="/" element={<LandingPage/>} />

<Route path="/join" element={<JoinChat/>} />

<Route path="/chat" element={<ChatPage/>} />

<Route path="/about" element={<AboutUs/>}/>
<Route path="/privacy" element={<PrivacyPolicy/>}/>
<Route path="/rules" element={<ChatRules/>}/>
<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin" element={<AdminDashboard />} />

<Route path="/confessions" element={<Confessions />} />
<Route path="/confession/:slug" element={<ConfessionDetails />} />
<Route path="/it-experiences" element={<ITExperiences/>}/>
<Route path="/it-experiences/:slug" element={<ITExperiencePost/>}/>
<Route path="/jobs" element={<Jobs/>}/>






</Routes>
</>



)

}

export default App
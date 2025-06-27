import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from "./components/Content"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ContestAIHelp from "./components/ContestAIHelp";
import Regform from "./components/Regform";
import Dashboard from "./components/Dashboard";


function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-blue-500">
        <Navbar />

        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/contest-ai-help" element={<ContestAIHelp />} />
          <Route path="/reg-form" element={<Regform />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>



        <Footer />
      </div>
    </Router>
  )
}

export default App

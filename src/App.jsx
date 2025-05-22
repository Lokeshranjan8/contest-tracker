import Content from "./components/Content"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

    return (
      <div className="min-h-screen flex flex-col bg-blue-500">
        <Navbar />
        <Content />
        <Footer />

      </div>
    )
}

export default App

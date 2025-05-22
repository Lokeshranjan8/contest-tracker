import Content from "./components/Content"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

    return (
      <div className="min-h-screen flex flex-col bg-blue-500">
        <Navbar />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto bg-white rounded-lg p-6 shadow-md mt-6 mb-6">
            <Content />
          </div>
        </main>

        <Footer />

      </div>
    )
}

export default App

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router"
import Home from "./scenes/Home"
import Posts from "./scenes/Posts"
import Contact from "./scenes/Contact"
import Post from "./scenes/Post";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wpisy" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
        <Route path="/kontakt" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header.jsx";
import Home from "../pages/Home.jsx";
import Post from "../pages/Post.jsx";
import Categories from "../pages/Categories.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;

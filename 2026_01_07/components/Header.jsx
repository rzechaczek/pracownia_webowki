import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <h1 className="logo">MyBlog</h1>
            <nav>
                <NavLink to="/">Strona główna</NavLink>
                <NavLink to="/categories">Kategorie</NavLink>
            </nav>
        </header>
    );
}

import { Link } from "react-router-dom";

export default function PostCard({ id, title, category }) {
    return (
        <Link to={`/post/${id}`} className="post-card">
            <h3>{title}</h3>
            <span>{category}</span>
        </Link>
    );
}

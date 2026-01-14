import PostCard from "../components/PostCard";

export default function Home() {
    return (
        <section>
            <h2>Najnowsze wpisy</h2>
            <div className="post-grid">
                <PostCard id={1} title="Pierwszy wpis" category="React" />
                <PostCard id={2} title="Stylowanie w SCSS" category="CSS" />
            </div>
        </section>
    );
}

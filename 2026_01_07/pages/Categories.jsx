export default function Categories() {
    const categories = ["React", "JavaScript", "CSS", "Frontend"];

    return (
        <section>
            <h2>Kategorie</h2>
            <ul className="categories">
                {categories.map(cat => (
                    <li key={cat}>{cat}</li>
                ))}
            </ul>
        </section>
    );
}

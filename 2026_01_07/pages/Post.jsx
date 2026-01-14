import { useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams();

    return (
        <article className="post">
            <h2>Tytuł wpisu #{id}</h2>
            <p className="meta">Kategoria: React • 12.01.2026</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Estetyczny wygląd i czytelna typografia to podstawa bloga.
            </p>
        </article>
    );
}

import { Link, useParams } from "react-router";
import { usePost } from "../../hooks/usePost";
import styles from "./Post.module.scss";

export default function PostPage() {
    const { id } = useParams();
    const { data: post, isLoading, isError } = usePost(id);

    if (isLoading) {
        return <p className={styles.PostLoading}>Ładowanie posta…</p>;
    }

    if (isError) {
        return <p className={styles.PostError}>Wystąpił błąd podczas ładowania 😢</p>;
    }

    if (!post) {
        return <p className={styles.PostError}>Nie znaleziono posta.</p>;
    }

    return (
        <section className={styles.Post}>
            <article className={styles.PostCard}>
                <h1 className={styles.PostTitle}>{post.title}</h1>
                <p className={styles.PostBody}>{post.body}</p>

                <div className={styles.PostActions}>
                    <Link to="/wpisy" className={styles.PostBackBtn}>
                        ⬅ Powrót do listy
                    </Link>
                </div>
            </article>
        </section>
    );
}
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import type { Post } from "../../types/Post/Post";
import styles from "./Post.module.scss";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((r) => r.json())
            .then((data: Post) => setPost(data))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [id]);

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
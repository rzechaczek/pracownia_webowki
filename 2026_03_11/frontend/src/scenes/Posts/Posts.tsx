import { Link } from "react-router";
import { usePosts } from "../../hooks/usePosts";
import type { Post } from "../../types/Post/Post";
import styles from "./Posts.module.scss";

export default function Posts() {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) {
    return (
        <section className={styles.Posts}>
          <p className={styles.PostsLoading}>Trwa ładowanie danych...</p>
        </section>
    );
  }

  if (isError) {
    return (
        <section className={styles.Posts}>
          <p className={styles.PostsError}>Wystąpił nieoczekiwany błąd 😢</p>
        </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
        <section className={styles.Posts}>
          <p className={styles.PostsError}>Brak wpisów</p>
        </section>
    );
  }

  return (
      <section className={styles.Posts}>
        {posts.map((p: Post) => (
            <article key={p.id} className={styles.PostsPost}>
              <h6 className={styles.PostsPostTitle}>{p.title}</h6>
              <p className={styles.PostsPostBody}>
                  {p.content?.length > 50 ? `${p.content.substring(0, 50)}...` : p.content}
              </p>
              <Link to={`/post/${p.id}`} className={styles.PostsPostLink}>
                Przejdź do wpisu
              </Link>
            </article>
        ))}
      </section>
  );
}
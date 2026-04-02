import { useState } from "react";
import { Link, useParams } from "react-router";
import { usePost } from "../../hooks/usePost";
import type { Comment } from "../../types/Post/Post";
import styles from "./Post.module.scss";

export default function PostPage() {
    const { id } = useParams();
    const [commentText, setCommentText] = useState("");

    const { post, isLoading, isError, addComment } = usePost(id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            await addComment.mutateAsync(commentText);
            setCommentText("");
        } catch (err) {
            console.error("Błąd podczas dodawania komentarza:", err);
        }
    };

    if (isLoading) {
        return <p className={styles.PostLoading}>Ładowanie posta…</p>;
    }

    if (isError || !post) {
        return <p className={styles.PostError}>Nie znaleziono posta lub wystąpił błąd 😢</p>;
    }

    return (
        <section className={styles.Post}>
            <article className={styles.PostCard}>
                <h1 className={styles.PostTitle}>{post.title}</h1>

                <p className={styles.PostBody}>{post.content}</p>

                <div className={styles.PostActions}>
                    <Link to="/wpisy" className={styles.PostBackBtn}>
                        ⬅ Powrót do listy
                    </Link>
                </div>

                <hr className={styles.Separator} />

                <div className={styles.CommentsSection}>
                    <h3>Komentarze ({post.comments?.length || 0})</h3>

                    <ul className={styles.CommentsList}>
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment: Comment) => (
                                <li key={comment.id} className={styles.CommentItem}>
                                    <p>{comment.content}</p>
                                    <small>{new Date(comment.createdAt).toLocaleString()}</small>
                                </li>
                            ))
                        ) : (
                            <p>Brak komentarzy. Bądź pierwszy!</p>
                        )}
                    </ul>

                    <form onSubmit={handleSubmit} className={styles.CommentForm}>
                        <textarea
                            placeholder="Napisz co myślisz o tym wpisie..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={addComment.isPending}
                            className={styles.SubmitBtn}
                        >
                            {addComment.isPending ? "Wysyłanie..." : "Dodaj komentarz"}
                        </button>
                    </form>

                    {addComment.isError && (
                        <p className={styles.ErrorMessage}>Nie udało się dodać komentarza.</p>
                    )}
                </div>
            </article>
        </section>
    );
}
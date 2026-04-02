import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../types/Post/Post";

const API_URL = "http://localhost:3000";

export function usePost(id: string | undefined) {
    const queryClient = useQueryClient();

    const postQuery = useQuery<Post>({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/posts/${id}`);
            if (!res.ok) throw new Error("Nie znaleziono posta");
            return res.json();
        },
        enabled: !!id
    });

    const addComment = useMutation({
        mutationFn: async (content: string) => {
            const res = await fetch(`${API_URL}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, postId: Number(id) })
            });
            if (!res.ok) throw new Error("Błąd podczas dodawania komentarza");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", id] });
        }
    });

    return {
        post: postQuery.data,
        isLoading: postQuery.isLoading,
        isError: postQuery.isError,
        addComment
    };
}
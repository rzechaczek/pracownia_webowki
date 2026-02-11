import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types/Post/Post";

export function usePost(id: string | undefined) {
    return useQuery<Post>({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if (!res.ok) throw new Error("Failed to fetch post");
            return res.json();
        },
        enabled: !!id
    });
}
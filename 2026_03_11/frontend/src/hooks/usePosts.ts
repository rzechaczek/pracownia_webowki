import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types/Post/Post";

const API_URL = "http://localhost:3000";

async function fetchPosts(): Promise<Post[]> {
    const res = await fetch(`${API_URL}/posts`);

    if (!res.ok) {
        throw new Error("Nie udało się pobrać postów z serwera.");
    }

    return res.json();
}

export function usePosts() {
    return useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });
}
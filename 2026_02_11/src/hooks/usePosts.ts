import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types/Post/Post";

async function fetchPosts(): Promise<Post[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}

export function usePosts() {
    console.log("React Query działa");
    return useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });
}


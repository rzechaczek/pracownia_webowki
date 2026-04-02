export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  categoryId: number;
  comments?: Comment[];
}
export interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
}

export type NewBlog = Omit<Blog, 'id' | 'likes'>;

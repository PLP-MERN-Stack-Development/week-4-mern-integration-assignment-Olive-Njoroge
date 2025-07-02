import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '../services/api';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post._id !== id));
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error.response?.data || error.message);
      alert("Something went wrong while deleting the post.");
    }
  };

  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => (
        <Card key={post._id} className="p-4 space-y-2">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt || post.content.slice(0, 100)}...</p>
          <p className="text-sm text-right text-gray-500">Author: {post.author || "Unknown"}</p>

          <div className="flex justify-end">
            <Button variant="destructive" onClick={() => deletePost(post._id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

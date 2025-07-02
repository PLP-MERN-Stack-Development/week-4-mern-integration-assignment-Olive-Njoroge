import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "../services/api";

export default function PostForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    category: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let user = null;

    try {
      if (storedUser && storedUser !== "undefined") {
        user = JSON.parse(storedUser);
      }
    } catch (error) {
      console.warn("Failed to parse user from localStorage:", error);
    }

    if (user?.name) {
      setForm((prev) => ({ ...prev, author: user.name }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");

    try {
      const res = await api.post("/posts", form);
      console.log("Post created:", res.data);
      alert("Post created successfully!");
      setForm((prev) => ({
        title: "",
        content: "",
        author: prev.author,
        category: ""
      }));
    } catch (error) {
      console.error("Failed to create post:", error.response?.data || error.message);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Tech, Health, etc."
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

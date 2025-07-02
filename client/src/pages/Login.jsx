// src/pages/Login.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      alert("Login failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4 mt-10">
      <div>
        <Label>Email</Label>
        <Input type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" name="password" value={form.password} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}

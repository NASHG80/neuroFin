import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        localStorage.setItem("nf_token", data.token);
        navigate("/");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign up</h1>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-white/60 focus:ring-1 focus:ring-white/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-white/60 focus:ring-1 focus:ring-white/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-white/60 focus:ring-1 focus:ring-white/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-lg bg-white text-black font-semibold py-2.5 text-sm shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-white/60">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-white underline-offset-2 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;

"use client";
import { cn } from "@/utils/util";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect, useState } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin0987";
const TOKEN_KEY = "authToken";

const ProtectedWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (stored === ADMIN_PASSWORD) setAuthed(true);
    }
  }, []);

  const handleLogin = () => {
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem(TOKEN_KEY, input);
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  if (!authed) {
    return (
      <div className="purplebg flex min-h-screen flex-col items-center justify-center gap-6 text-white">
        <h1 className="font-montserrat text-2xl font-bold">Admin Access</h1>
        <input
          type="password"
          placeholder="Enter admin password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="w-full max-w-sm rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/60"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          onClick={handleLogin}
          className="rounded-xl bg-[#8A0089] px-8 py-3 font-semibold hover:bg-[#6d0070] transition-colors"
        >
          Login
        </button>
      </div>
    );
  }

  return <div className={cn(className)}>{children}</div>;
};

export default ProtectedWrapper;

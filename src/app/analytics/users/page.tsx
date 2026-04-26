"use client";
import { fetchAllUsers } from "@/server/actions";
import { useEffect, useState } from "react";

interface UserRow {
  name: string;
  email: string;
  phone: string | null;
  faculty: string | null;
  department: string | null;
  reg_type: string;
  created_at: string;
}

export default function UsersAnalytics() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUsers()
      .then(({ data, error }) => {
        if (error) { setError(error); return; }
        setUsers(data as UserRow[]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="purplebg min-h-screen p-8 text-white">
      <h1 className="mb-2 font-montserrat text-3xl font-bold">Registered Users</h1>
      <p className="mb-6 text-white/50 text-sm">{users.length} total</p>

      {loading && <p className="text-white/60">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="text-white/60">No users registered yet.</p>
      )}

      {!loading && users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Faculty</th>
                <th className="px-4 py-3 font-semibold">Department</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Registered</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3 text-white/50">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-white/70">{u.email}</td>
                  <td className="px-4 py-3 text-white/70">{u.phone ?? "—"}</td>
                  <td className="px-4 py-3 text-white/70">{u.faculty ?? "—"}</td>
                  <td className="px-4 py-3 text-white/70">{u.department ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      u.reg_type === "participant"
                        ? "bg-[#8A0089]/40 text-purple-200"
                        : "bg-white/10 text-white/60"
                    }`}>
                      {u.reg_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/50 text-xs">
                    {new Date(u.created_at).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";
import { fetchUsers, fetchAllUsers } from "@/server/actions";
import { useEffect, useState } from "react";

interface UserRow {
  name: string;
  phone: string | null;
}

export default function UsersAnalytics() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUsers()
      .then(({ data, error }) => {
        if (error) { setError(error); return; }
        setUsers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="purplebg min-h-screen p-8 text-white">
      <h1 className="mb-6 font-montserrat text-3xl font-bold">Registered Participants</h1>
      {loading && <p className="text-white/60">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="text-white/60">No participants registered yet.</p>
      )}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3 text-white/50">{i + 1}</td>
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3 text-white/70">{u.phone ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

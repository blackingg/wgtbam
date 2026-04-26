import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types matching the Supabase schema ──────────────────────────────────────

export interface DbQuestion {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string; // 'a' | 'b' | 'c' | 'd'
  difficulty_level: number; // 2 or 3
  created_at: string;
}

export interface DbUser {
  id: number;
  name: string;
  email: string;
  faculty: string | null;
  department: string | null;
  phone: string | null;
  reg_type: "participant" | "attendee";
  created_at: string;
}

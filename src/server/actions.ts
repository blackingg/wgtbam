"use server";

import { supabase, DbQuestion } from "@/lib/supabase";

// ─── Question shape used throughout the app (matches old API response) ────────
export interface QuestionData {
  id: number;
  question: string;
  options: { a: string; b: string; c: string; d: string };
  answer: string;
  difficulty_level: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  faculty: string;
  department: string;
  phone: string;
  reg_type: string;
}

// ─── fetchQuestion ─────────────────────────────────────────────────────────────
// Fetches a random question at the given difficulty level, excluding any
// question IDs already used in this game session.
export async function fetchQuestion(
  difficulty_level: number,
  usedQuestionIds: number[] = []
): Promise<{ data: QuestionData | null; error: string | null }> {
  let query = supabase
    .from("questions")
    .select("*")
    .eq("difficulty_level", difficulty_level);

  // Exclude already-used questions so repeats can't happen
  if (usedQuestionIds.length > 0) {
    query = query.not("id", "in", `(${usedQuestionIds.join(",")})`);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  if (!data || data.length === 0) {
    // All questions at this level exhausted — fallback to full pool
    const { data: fallback, error: fallbackError } = await supabase
      .from("questions")
      .select("*")
      .eq("difficulty_level", difficulty_level);

    if (fallbackError || !fallback || fallback.length === 0) {
      return { data: null, error: "No questions found for this difficulty level" };
    }

    const raw: DbQuestion = fallback[Math.floor(Math.random() * fallback.length)];
    return { data: mapQuestion(raw), error: null };
  }

  const raw: DbQuestion = data[Math.floor(Math.random() * data.length)];
  return { data: mapQuestion(raw), error: null };
}

const mapQuestion = (raw: DbQuestion): QuestionData => ({
  id: raw.id,
  question: raw.question,
  options: {
    a: raw.option_a,
    b: raw.option_b,
    c: raw.option_c,
    d: raw.option_d,
  },
  answer: raw.answer,
  difficulty_level: String(raw.difficulty_level),
});

// ─── registerUser ──────────────────────────────────────────────────────────────
export async function registerUser(
  input: RegisterUserInput
): Promise<{ passed: boolean; error: Record<string, string> | null }> {
  const { error } = await supabase.from("users").insert({
    name: input.name,
    email: input.email,
    faculty: input.faculty,
    department: input.department,
    phone: input.phone,
    reg_type: input.reg_type,
  });

  if (error) {
    if (error.code === "23505") {
      return { passed: false, error: { email: "This email is already registered." } };
    }
    return { passed: false, error: { general: error.message } };
  }

  return { passed: true, error: null };
}

// ─── fetchAllUsers ─────────────────────────────────────────────────────────────
export async function fetchAllUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("name, email, phone, faculty, department, reg_type, created_at")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) return { data: [], error: error.message };
  return { data: data ?? [], error: null };
}
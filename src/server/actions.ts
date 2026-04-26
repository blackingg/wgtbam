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
// Replaces: POST /api/wgtbam/fetchquestion
// Fetches one random question at the given difficulty level.
// difficulty_level: 2 = easy (prize levels 1-4), 3 = hard (prize levels 5-15)
export async function fetchQuestion(
  difficulty_level: number
): Promise<{ data: QuestionData | null; error: string | null }> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("difficulty_level", difficulty_level);

  if (error) {
    return { data: null, error: error.message };
  }

  if (!data || data.length === 0) {
    return { data: null, error: "No questions found for this difficulty level" };
  }

  // Pick a random question from the result set
  const raw: DbQuestion = data[Math.floor(Math.random() * data.length)];

  const question: QuestionData = {
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
  };

  return { data: question, error: null };
}

// ─── registerUser ──────────────────────────────────────────────────────────────
// Replaces: POST /api/wgtbam/createuser
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
    // Supabase returns a unique violation code when email already exists
    if (error.code === "23505") {
      return { passed: false, error: { email: "This email is already registered." } };
    }
    return { passed: false, error: { general: error.message } };
  }

  return { passed: true, error: null };
}

// ─── fetchUsers ────────────────────────────────────────────────────────────────
// Replaces: POST /api/wgtbam/fetchuser
export async function fetchUsers(
  reg_type: "participant" | "attendee"
): Promise<{ data: { name: string; phone: string | null }[]; error: string | null }> {
  const { data, error } = await supabase
    .from("users")
    .select("name, phone")
    .eq("reg_type", reg_type);

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: data ?? [], error: null };
}


export async function fetchAllUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("name, phone, reg_type, email, created_at")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data: data ?? [], error: null };
}
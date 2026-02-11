import { getJSON, setJSON, makeId } from "./storage";
import { UserProfile } from "../models/types";

type StoredUser = {
  profile: UserProfile;
  password: string;
};

const USERS_KEY = "USERS_V1";
const SESSION_KEY = "SESSION_UID_V1";

export async function registerUser(payload: Omit<UserProfile, "uid">, password: string) {
  const users = await getJSON<Record<string, StoredUser>>(USERS_KEY, {});
  const existing = Object.values(users).find((u) => u.profile.email.toLowerCase() === payload.email.toLowerCase());
  if (existing) throw new Error("Email already registered.");

  const uid = makeId("uid");
  const profile: UserProfile = { uid, ...payload };
  users[uid] = { profile, password };
  await setJSON(USERS_KEY, users);
  await setJSON(SESSION_KEY, uid);
  return profile;
}

export async function login(email: string, password: string) {
  const users = await getJSON<Record<string, StoredUser>>(USERS_KEY, {});
  const match = Object.values(users).find((u) => u.profile.email.toLowerCase() === email.toLowerCase());
  if (!match || match.password !== password) throw new Error("Invalid email or password.");
  await setJSON(SESSION_KEY, match.profile.uid);
  return match.profile;
}

export async function logout() {
  await setJSON<string | null>(SESSION_KEY, null);
}

export async function getSessionProfile(): Promise<UserProfile | null> {
  const uid = await getJSON<string | null>(SESSION_KEY, null);
  if (!uid) return null;
  const users = await getJSON<Record<string, StoredUser>>(USERS_KEY, {});
  return users[uid]?.profile ?? null;
}

export async function updateProfile(updated: UserProfile) {
  const users = await getJSON<Record<string, StoredUser>>(USERS_KEY, {});
  const stored = users[updated.uid];
  if (!stored) throw new Error("User not found.");
  users[updated.uid] = { ...stored, profile: updated };
  await setJSON(USERS_KEY, users);
  return updated;
}

import { supabase } from "./supabase";

export type Profile = {
  id: string;
  email: string | null;
  company_linked: boolean;
  company_number: string | null;
  company_name: string | null;
  preferences_set: boolean;
  monitoring_active: boolean;
};

export async function getMyProfile(): Promise<Profile | null> {
  const { data: userRes } = await supabase.auth.getUser();
  const user = userRes.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data as Profile;
}

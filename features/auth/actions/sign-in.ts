"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:8000/auth/callback",
    },
  });

  if (error) {
    console.log(error);
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

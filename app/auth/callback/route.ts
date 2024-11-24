import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { APPLICATION_PATH } from "@/config/path";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.exchangeCodeForSession(code);
    if (!authError && session) {
      // Check if user exists in profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select()
        .eq("id", session.user.id)
        .single();

      // If no profile exists, create one
      if (!profile && !profileError) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: session.user.id,
          username: session.user.email?.split("@")[0],
          fullname: session.user.user_metadata.full_name,
          avatar: session.user.user_metadata.avatar_url,
          bio: null,
        });

        if (insertError) {
          console.error("Error creating profile:", insertError);
        }
      }
    }
    return NextResponse.redirect(`${origin}${APPLICATION_PATH.PROTECTED.HOME}`);
  }
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

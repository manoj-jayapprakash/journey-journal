// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the SSR package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/server-side/nextjs
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   const origin = requestUrl.origin;
//   const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

//   if (code) {
//     const supabase = await createClient();
//     await supabase.auth.exchangeCodeForSession(code);
//   }

//   if (redirectTo) {
//     return NextResponse.redirect(`${origin}${redirectTo}`);
//   }

//   // URL to redirect to after sign up process completes
//   return NextResponse.redirect(`${origin}/protected`);
// }

import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

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
    return NextResponse.redirect(`${origin}/protected`);
  }
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

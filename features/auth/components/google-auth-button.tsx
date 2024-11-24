"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Compass } from "lucide-react";

export const GoogleAuthButton = () => {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className='flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-50 border border-gray-200'
    >
      <img
        src='https://www.google.com/favicon.ico'
        alt='Google'
        className='w-4 h-4'
      />
      <span>Continue with Google</span>
      <Compass className='ml-2 w-4 h-4 text-blue-500' />
    </Button>
  );
};

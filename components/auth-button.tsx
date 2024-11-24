import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      {/* <form action={signOutAction}>
        <Button type='submit' variant={"outline"}>
          Sign out
        </Button>
      </form> */}
      <SignOutButton />
    </div>
  ) : (
    <Button asChild size='sm' variant={"outline"}>
      <Link href='/sign-in'>Sign in</Link>
    </Button>
  );
}

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "../actions";

export function SignOutButton() {
  return (
    <form
      action={signOut}
      className='flex items-center gap-2 hover:bg-destructive w-full p-2 hover:rounded-sm px-2 py-1.5 cursor-pointer text-sm'
    >
      <LogOut className='' />
      Sign Out
    </form>
  );
}

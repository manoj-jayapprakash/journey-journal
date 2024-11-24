import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "../actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <Button
        type='submit'
        variant='ghost'
        className='text-red-600 hover:text-red-700 hover:bg-red-50'
      >
        <LogOut className='w-4 h-4 mr-2' />
        Sign Out
      </Button>
    </form>
  );
}

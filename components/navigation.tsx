import Link from "next/link";
import AuthButton from "./auth-button";

export function Navigation() {
  return (
    <div className='container flex h-14 items-center'>
      <div className='mr-4 flex'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <span className='font-bold'>Journey Journal</span>
        </Link>
        <nav className='flex items-center space-x-6 text-sm font-medium'>
          <Link href='/explore'>Explore</Link>
          <Link href='/create'>Create</Link>
        </nav>
      </div>
      <AuthButton />
    </div>
  );
}

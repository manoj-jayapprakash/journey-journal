import Link from "next/link";
import AuthButton from "./auth-button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function Navigation() {
  return (
    <div className='w-full border-b border-border/40 backdrop-blur-md fixed top-0 z-50'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='flex items-center gap-2'>
            <span className='font-bold text-xl bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text'>
              Journey Journal
            </span>
          </Link>
          <div className='hidden md:flex relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
            <Input
              placeholder='Search destinations...'
              className='pl-10 w-[300px] bg-secondary/50 border-secondary'
            />
          </div>
        </div>
        <nav className='flex items-center gap-6'>
          <Link
            href='/explore'
            className='text-sm font-medium hover:text-primary transition-colors'
          >
            Explore
          </Link>
          <Link
            href='/create'
            className='text-sm font-medium hover:text-primary transition-colors'
          >
            Create
          </Link>
          <AuthButton />
        </nav>
      </div>
    </div>
  );
}
"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
      <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            Document Your Journey
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Create beautiful travel journals, share your adventures, and connect
            with fellow travelers around the world.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button asChild size='lg'>
              <Link href='/sign-up'>Start Your Journey</Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='/explore'>Explore Journals</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

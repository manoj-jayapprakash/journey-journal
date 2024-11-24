"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className='relative isolate'>
      <div className='mx-auto max-w-4xl py-32 sm:py-48 lg:py-56'>
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary via-primary/80 to-primary/50 text-transparent bg-clip-text'>
            Document Your Journey
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto'>
            Create beautiful travel journals, share your adventures, and connect
            with fellow travelers around the world.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button asChild size='lg' className='group'>
              <Link href='/sign-up'>
                Start Your Journey
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild className='glass-card'>
              <Link href='/explore'>Explore Journals</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute inset-0 bg-primary/5 backdrop-blur-3xl' />
      </div>
    </div>
  );
}
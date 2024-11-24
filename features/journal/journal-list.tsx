"use client";

import { motion } from "motion/react";
import { JournalCard } from "./journal-card";

interface Journal {
  id: string;
  title: string;
  content: string;
  location: string;
  created_at: string;
}

interface JournalListProps {
  journals: Journal[];
}

export function JournalList({ journals }: JournalListProps) {
  return (
    <motion.div
      className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {journals.map((journal, index) => (
        <motion.div
          key={journal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <JournalCard journal={journal} />
        </motion.div>
      ))}
      {journals.length === 0 && (
        <div className='col-span-full text-center py-10 text-muted-foreground'>
          No journals yet. Start by creating your first journal!
        </div>
      )}
    </motion.div>
  );
}

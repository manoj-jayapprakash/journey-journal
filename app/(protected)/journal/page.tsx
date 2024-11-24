import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { JournalList } from "@/features/journal/journal-list";
import { APPLICATION_PATH } from "@/config/path";

export default async function JournalsPage() {
  const supabase = await createClient();

  const { data: journals } = await supabase
    .from("journals")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className='container py-10'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>My Journals</h1>
        <Button asChild>
          <Link href={APPLICATION_PATH.PROTECTED.JOURNAL.CREATE}>
            <Plus className='mr-2 h-4 w-4' />
            New Journal
          </Link>
        </Button>
      </div>
      <JournalList journals={journals || []} />
    </div>
  );
}

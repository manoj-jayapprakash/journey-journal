import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

export default async function JournalPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: journal } = await supabase
    .from("journals")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!journal) {
    notFound();
  }

  return (
    <div className='container max-w-4xl py-10'>
      <Button variant='ghost' asChild className='mb-8'>
        <Link href='/journals'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Journals
        </Link>
      </Button>

      <article className='prose prose-stone dark:prose-invert max-w-none'>
        <h1 className='text-4xl font-bold mb-4'>{journal.title}</h1>

        <div className='flex items-center gap-4 text-muted-foreground mb-8'>
          <div className='flex items-center'>
            <MapPin className='mr-1 h-4 w-4' />
            {journal.location}
          </div>
          <div className='flex items-center'>
            <Calendar className='mr-1 h-4 w-4' />
            {new Date(journal.created_at).toLocaleDateString()}
          </div>
        </div>

        <div className='whitespace-pre-wrap'>{journal.content}</div>
      </article>
    </div>
  );
}

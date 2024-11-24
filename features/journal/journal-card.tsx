import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";

interface JournalCardProps {
  journal: {
    id: string;
    title: string;
    content: string;
    location: string;
    created_at: string;
  };
}

export function JournalCard({ journal }: JournalCardProps) {
  return (
    <Link href={`/journals/${journal.id}`}>
      <Card className='hover:shadow-lg transition-shadow'>
        <CardHeader>
          <CardTitle>{journal.title}</CardTitle>
          <div className='flex items-center text-sm text-muted-foreground'>
            <MapPin className='mr-1 h-4 w-4' />
            {journal.location}
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <Calendar className='mr-1 h-4 w-4' />
            {new Date(journal.created_at).toLocaleDateString()}
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground line-clamp-3'>
            {journal.content}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

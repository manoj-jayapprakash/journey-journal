"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalForm } from "@/features/journal/journal-form";

export default function CreateJournalPage() {
  return (
    <div className='container  py-10'>
      <Card>
        <CardHeader>
          <CardTitle>Create New Journal</CardTitle>
        </CardHeader>
        <CardContent>
          <JournalForm />
        </CardContent>
      </Card>
    </div>
  );
}

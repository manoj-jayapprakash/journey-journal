"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./image-upload";
import { LocationSearch } from "./location-search";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function JournalForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const location = formData.get("location") as string;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("journals").insert({
        title,
        content,
        location,
        user_id: user.id,
      });

      if (error) throw error;

      router.push("/journals");
      router.refresh();
    } catch (error) {
      console.error("Error creating journal:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className='space-y-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          name='title'
          placeholder='My Amazing Adventure'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='location'>Location</Label>
        <LocationSearch />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>Content</Label>
        <Textarea
          id='content'
          name='content'
          placeholder='Share your story...'
          className='min-h-[200px]'
          required
        />
      </div>

      <ImageUpload />

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Journal"}
      </Button>
    </motion.form>
  );
}

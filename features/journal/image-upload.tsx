"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { Upload, X } from "lucide-react";

export function ImageUpload() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      const files = event.target.files;
      if (!files) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const uploads = Array.from(files).map(async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("journal-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        return filePath;
      });

      const paths = await Promise.all(uploads);
      setImages((current) => [...current, ...paths]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    setImages((current) => current.filter((_, i) => i !== index));
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='images'>Images</Label>
        <div className='flex items-center gap-4'>
          <Button
            type='button'
            variant='outline'
            disabled={uploading}
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <Upload className='mr-2 h-4 w-4' />
            Upload Images
          </Button>
          <input
            id='image-upload'
            type='file'
            accept='image/*'
            multiple
            className='hidden'
            onChange={onUpload}
            disabled={uploading}
          />
        </div>
      </div>

      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {images.map((path, index) => (
              <motion.div
                key={path}
                className='relative aspect-square rounded-md overflow-hidden'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/journal-images/${path}`}
                  alt={`Upload ${index + 1}`}
                  className='object-cover w-full h-full'
                />
                <Button
                  type='button'
                  variant='destructive'
                  size='icon'
                  className='absolute top-2 right-2'
                  onClick={() => removeImage(index)}
                >
                  <X className='h-4 w-4' />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

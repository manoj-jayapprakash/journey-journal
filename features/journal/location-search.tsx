"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { MapPin } from "lucide-react";

export function LocationSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  async function handleSearch(value: string) {
    setSearchValue(value);
    // TODO: Implement location search API
    // For now, using mock data
    if (value.length > 2) {
      setSuggestions([
        "Paris, France",
        "Barcelona, Spain",
        "Tokyo, Japan",
        "New York, USA",
      ]);
    } else {
      setSuggestions([]);
    }
  }

  function selectLocation(location: string) {
    setSearchValue(location);
    setSuggestions([]);
  }

  return (
    <div className='relative'>
      <Input
        type='text'
        name='location'
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder='Search location...'
        className='w-full'
      />

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            className='absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className='flex items-center w-full px-4 py-2 text-sm hover:bg-accent'
                onClick={() => selectLocation(suggestion)}
                type='button'
              >
                <MapPin className='w-4 h-4 mr-2' />
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

export interface SearchBarProps {
  debounceMs?: number;
}

export function SearchBar({ debounceMs = 300 }: SearchBarProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const queryParam = searchParams.get("query") || "";

  const [queryInternalValue, setQueryInternalValue] = useState(queryParam);

  const handleQuery = useDebouncedCallback((term: string) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    if (term) {
      urlSearchParams.set("query", term);
    } else {
      urlSearchParams.delete("query");
    }
    replace(`${pathname}?${urlSearchParams.toString()}`);
  }, debounceMs);

  useEffect(() => {
    setQueryInternalValue(queryParam);
  }, [queryParam]);

  return (
    <div className="relative">
      <Input
        placeholder="Search..."
        className="pr-8"
        value={queryInternalValue}
        onChange={(e) => {
          setQueryInternalValue(e.target.value);
          handleQuery(e.target.value);
        }}
      />
      <Image
        className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground"
        src="/magnifing-glass.svg"
        alt="search"
        width={20}
        height={20}
      />
    </div>
  );
}

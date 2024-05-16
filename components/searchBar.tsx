"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
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
    <div className="relative max-w-[720px] w-full">
      <Input
        placeholder="Search..."
        className="pr-6"
        value={queryInternalValue}
        onChange={(e) => {
          setQueryInternalValue(e.target.value);
          handleQuery(e.target.value);
        }}
      />
      <FaSearch className="absolute top-2.5 right-2.5 w-[14px] h-[14px]" />
    </div>
  );
}

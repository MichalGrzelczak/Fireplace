"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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

  const handleQuery = useCallback(
    (term: string) => {
      const urlSearchParams = new URLSearchParams(searchParams);
      if (term) {
        urlSearchParams.set("query", term);
      } else {
        urlSearchParams.delete("query");
      }
      replace(`${pathname}?${urlSearchParams.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  useEffect(() => {
    setQueryInternalValue(queryParam);
  }, [queryParam]);

  return (
    <form
      role="search"
      aria-label="Search project"
      className="relative max-w-[720px] w-full"
    >
      <Input
        placeholder="Search..."
        aria-label={"Type for search project"}
        className="pr-space-4"
        value={queryInternalValue}
        type={"search"}
        onChange={(e) => {
          setQueryInternalValue(e.target.value);
          handleQuery(e.target.value);
        }}
      />
      <FaSearch className="absolute top-space-2 right-space-2 text-icon" />
    </form>
  );
}

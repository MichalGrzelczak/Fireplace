import { Suspense } from "react";

import { SearchBar } from "@/components/searchBar";

export default function Sandbox() {
  return (
    <div>
      <h1> Components sandbox: </h1>
      <h2>SearchBar:</h2>
      <Suspense>
        <SearchBar />
      </Suspense>
    </div>
  );
}

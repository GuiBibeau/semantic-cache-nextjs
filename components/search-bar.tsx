"use client";

import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface SearchResult {
  title: string;
  description: string;
  duration: number;
  cacheUsed: string;
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [useSemanticCacheB, setUseSemanticCacheB] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const startTime = performance.now();
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: searchQuery,
            cacheType: useSemanticCacheB ? "B" : "A",
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const endTime = performance.now();
        const duration = endTime - startTime;
        setSearchResults((prevResults) => [
          {
            title: searchQuery,
            description: data.description,
            duration,
            cacheUsed: data.cacheUsed,
          },
          ...prevResults,
        ]);
        setSearchQuery("");
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, useSemanticCacheB]
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium">Use Semantic Cache B</span>
        <Switch
          checked={useSemanticCacheB}
          onCheckedChange={setUseSemanticCacheB}
        />
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="block w-full pl-10 pr-4 py-2 rounded-md bg-background border-input focus:border-primary focus:ring-primary"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        )}
      </form>
      {searchResults.length > 0 && (
        <div className="mt-4 space-y-2">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="bg-muted/50 rounded-md p-4 hover:bg-muted/75 transition-colors"
            >
              <h3 className="text-lg font-medium">{result.title}</h3>
              <p className="text-muted-foreground">{result.description}</p>
              <p className="text-sm text-muted-foreground mt-2">
                API call duration: {result.duration.toFixed(2)}ms
              </p>
              <p className="text-sm text-muted-foreground">
                Cache used: {result.cacheUsed}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {}

function SearchIcon(props: SearchIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

import Image from "next/image";
import { SearchBar } from "../components/search-bar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchBar />
    </main>
  );
}

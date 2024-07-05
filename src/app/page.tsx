'use client'
import Nav from "@/components/Nav";
import Featured from "@/components/Featured";
import Latest from "@/components/Latest";

export default function Home() {
  return (
	  <main className="w-full h-full relative overflow-scroll">
		<Nav />
		<Featured />
		<Latest />
	  </main>
  );
}

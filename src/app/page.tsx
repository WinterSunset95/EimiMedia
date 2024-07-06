'use client'
import Nav from "@/components/Nav";
import Featured from "@/components/Featured";
import Latest from "@/components/Latest";
import Head from "next/head";
import Footer from "@/components/Footer";

export default function Home() {
  return (
	<>
	<Head>
		<title>Eimi Media</title>
		<meta name="description" content="Stream eimi movies and songs" />
	</Head>
	<main className="w-full h-full relative overflow-scroll">
		<Nav />
		<Featured />
		<section className="flex flex-col gap-4 p-6">
			<h1 className="font-bold text-4xl">Latest additions</h1>
			<Latest />
		</section>
		<Footer />
	</main>
	</>
  );
}

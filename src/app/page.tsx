"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Assuming you're using lucide-react for icons

import p from "@/assets/file (1).png";
import p2 from "@/assets/a_picture_for_my_website_landing_page_website_chat_with_pdf_functionality_its_a_interactive_playground_for_chating_with_pdf_with_ai.jpeg"
import logo from "@/assets/l2.png"
export default function Component() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col w-full overflow-x-hidden">
      <header className="bg-background w-full px-4 py-3 shadow-sm md:px-6 lg:px-8">
  <div className="max-w-screen-xl mx-auto flex items-center justify-between overflow-hidden">
    <Link href="#" className="flex items-center text-primary" prefetch={false}>
      <Image
        src={logo}
        height={50}
        width={50}
        alt="Chat with Pdf"
        className="h-auto w-auto" // Ensures the logo maintains its aspect ratio
      />
      {/* <span className="ml-2 text-xl font-bold">Chat with PDF</span>  */}
    </Link>

    {/* Mobile Menu Icon */}
    <div className="md:hidden">
      <button onClick={toggleMenu} className="text-primary">
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>

    {/* Desktop Menu */}
    <nav className="hidden space-x-7 md:flex">
      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
        Home
      </Link>
      <Link href="/play-ground" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
        Play ground
      </Link>
      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
        Pricing
      </Link>
      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
        Contact
      </Link>
    </nav>
    <Link href="/play-ground"className="hidden md:inline-block bg-black text-white rounded-md">
    <Button variant="default" >
      Get Started
    </Button>
    </Link>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden mt-2 bg-background shadow-lg rounded-lg p-4 space-y-2">
      <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
        Home
      </Link>
      <Link href="/play-ground" className="block text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
        Play ground
      </Link>
      <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
        Pricing
      </Link>
      <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
        Contact
      </Link>
      <Button variant="default" className="w-full bg-black text-white">
        Get Started
      </Button>
    </div>
  )}
</header>
      <main className="flex-1">
        <section className="bg-background py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 md:gap-12 lg:px-8">
            <div className="flex flex-col items-start justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Chat with PDF
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Unlock the power of your PDFs with our intuitive chat interface. Ask questions, get answers, and explore
                your documents like never before.
              </p>
              <Button variant="destructive" className="bg-black text-white">
                Try it Now
              </Button>
            </div>
            <div className="relative">
              <Image
                src={p2}
                width={800}
                height={600}
                alt="PDF Chat"
                className="mx-auto rounded-lg "
                style={{ aspectRatio: "800/600", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 md:gap-12 lg:px-8">
            <div className="relative">
              <Image
                src={p}
                width={800}
                height={600}
                alt="PDF Features"
                className="mx-auto rounded-lg "
                style={{ aspectRatio: "800/600", objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Powerful PDF Features
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Explore your PDFs like never before with our advanced features. Annotate, extract data, and collaborate
                seamlessly.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                  Intuitive chat interface
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                  Powerful PDF annotation tools
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                  Seamless collaboration features
                </li>
              </ul>
              <Button variant="default" className="bg-black text-white">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6 text-center text-muted-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <p>&copy; 2024 Chat with PDF. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

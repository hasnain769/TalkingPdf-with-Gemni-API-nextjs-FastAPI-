"use client";
import React, { useState } from 'react';
import ChatWindowScreen from '@/app/screens/chatWindow';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Assuming you're using lucide-react for icons
import logo from "@/assets/l2.png";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='h-screen w-full flex flex-col items-center'>
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
            <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              Chat with AI
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              Pricing
            </Link>
          </nav>
          <Link href="/play-ground" className="hidden md:inline-block bg-black text-white rounded-md">
            <Button variant="default">
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
      
      <div className='flex-1 flex justify-center items-center w-full'>
        <div className='h-[80%] w-[80%] border-3 border-l-3 border-s-slate-100 pt-4'>
          <ChatWindowScreen />
        </div>
      </div>
    </div>
  );
}

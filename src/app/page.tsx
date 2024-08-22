
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import p from "@/assets/a_picture_for_my_website_landing_page_website_chat_with_pdf_functionality_its_a_interactive_playground_for_chating_with_pdf_with_ai.jpeg"
export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="bg-background px-4 py-3 shadow-sm md:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="text-xl font-bold text-primary" prefetch={false}>
            Chat with PDF
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              Features
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              Pricing
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              Contact
            </Link>
          </nav>
          <Button>Get Started</Button>
        </div>
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
              <Button>Try it Now</Button>
            </div>
            <div className="relative">
              <Image
                src={p}
                width={800}
                height={600}
                alt="PDF Chat"
                className="mx-auto rounded-lg shadow-lg"
                style={{ aspectRatio: "800/600", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 md:gap-12 lg:px-8">
            <div className="relative">
              <img
                src="/placeholder.svg"
                width={800}
                height={600}
                alt="PDF Features"
                className="mx-auto rounded-lg shadow-lg"
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
              <Button>Learn More</Button>
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
  )
}

function CheckIcon(props : any) {
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
  )
}
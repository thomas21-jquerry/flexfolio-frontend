import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
    <Navbar />
    <div className="relative min-h-screen flex flex-col items-center px-6 py-12 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center"
      />

      {/* Fog Blur Effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Content */}
      <div className="relative w-full max-w-6xl">
        {/* Header */}
        
        

        {/* Hero Section */}
        <main className="flex flex-col items-center text-center mt-16">
          <h2 className="text-5xl font-extrabold mb-4">Showcase Your Portfolio with Style</h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            Create a stunning portfolio, share your work, and get recognized by the community.
          </p>
          <Link href="/signup" className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-full shadow-md">
            Get Started for Free
          </Link>
        </main>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-2xl font-bold">Customizable Portfolios</h3>
            <p className="text-gray-300 mt-2">Make your portfolio truly yours with unique designs.</p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-2xl font-bold">Engage with the Community</h3>
            <p className="text-gray-300 mt-2">Get likes, comments, and feedback from other creators.</p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-2xl font-bold">Easy Sharing</h3>
            <p className="text-gray-300 mt-2">Share your portfolio with a single click.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-gray-400 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} FlexFolio. All rights reserved.</p>
        </footer>
      </div>
    </div>
    </div>
  );
}

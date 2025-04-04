'use client'
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;
type UserProfile = {
  user_id: string;
  name: string;
  company?: string;
  role?: string;
  experience?: number;
  url_link?: string;
  linkedin_id?: string;
  github_id?: string;
  discord_id?: string;
  profile_photo?: string;
  created_at?: string;
};

export default function LandingPage() {
  const [portfolios, setPortfolios] = useState<UserProfile[]>([]);

  useEffect(() => {
    const getAllProfiles = async () => {
      const response = await fetch(`${url}/users/profiles`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const profiles = await response.json();
      setPortfolios(profiles);
    };
    getAllProfiles();
  }, []); // ✅ no infinite loop

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center px-6 py-12 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

        <div className="relative w-full max-w-6xl">
          {/* Hero Section */}
          <main className="flex flex-col items-center text-center mt-16">
            <h2 className="text-5xl font-extrabold mb-4">Showcase Your Portfolio with Style</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Create a stunning portfolio, share your work, and get recognized by the community.
            </p>
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

          {/* Portfolio Section */}
          <section className="mt-20 w-full">
            <h3 className="text-3xl font-bold text-center mb-10">Featured Portfolios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {portfolios.map((item ) => (
                <div
                  key={item.user_id}
                  className="bg-white/10 rounded-xl p-6 text-left shadow-md hover:shadow-lg transition duration-300"
                >
                  {item.profile_photo && (
                    <img
                      src={item.profile_photo}
                      alt={item.name}
                      className="w-16 h-16 rounded-full mb-4"
                    />
                  )}
                  <h4 className="text-xl font-semibold text-white mb-2">{item.name}</h4>
                  <p className="text-gray-300 mb-1">{item.role || "Developer"} at {item.company || "Company"}</p>
                  <p className="text-gray-400 text-sm mb-2">{item.experience} years experience</p>
                  <Link
                    href={item.url_link || "#"}
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Portfolio →
                  </Link>
                </div>
              ))}
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

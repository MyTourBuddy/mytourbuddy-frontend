"use client";

import logo from "@/../public/mytourbuddy.svg";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { useAuth } from "@/context/AuthContext";

const Footer = () => {
  const { isAuthenticated } = useAuth();
  return (
    <footer className="flex flex-col border-t mt-4 text-sm bg-white">
      <section className="max-w-5xl mx-auto w-full px-4 py-6 md:py-8 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-3">
          {/* logo and description */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex flex-col items-start">
              <Image
                src={logo}
                alt="mytourbuddy logo"
                className="h-18 w-fit aspect-square"
              />
              <h1 className="text-xl font-bold text-primary">MyTourBuddy</h1>
            </div>
            <p className="max-w-sm text-center md:text-left">
              Connect with local guides for personalized tours. Your ultimate
              tour buddy for unforgettable experiences.
            </p>
          </div>

          <Separator className="flex md:hidden" />

          {/* quick urls */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 w-full place-items-center md:place-items-end md:place-content-center gap-y-6">
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">Quick Links</h2>
              <div className="flex flex-col gap-1">
                <Link href="/">Home</Link>
                <Link href="/packages">Packages</Link>
                <Link
                  href={isAuthenticated ? "/dashboard/buddy-ai" : "/signin"}
                >
                  TourBuddy Ai
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">Support</h2>
              <div className="flex flex-col gap-1">
                <Link href={isAuthenticated ? "/dashboard" : "/signin"}>
                  Dashboard
                </Link>
                <Link
                  href={isAuthenticated ? "/dashboard/settings" : "/signin"}
                >
                  Settings
                </Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
            <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
              <h2 className="font-semibold">Legal</h2>
              <div className="flex flex-col gap-1">
                <Link href="/terms">Terms of Service</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/about">About Us</Link>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="text-center flex flex-col md:flex-row items-center justify-center gap-1">
          <p>Copyright &copy; MyTourBuddy {new Date().getFullYear()}.</p>
          <p>All Rights Reserved.</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

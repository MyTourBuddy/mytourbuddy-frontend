import logo from "@/../public/mytourbuddy.svg";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="flex flex-col border-t mt-4">
      <section className="max-w-5xl mx-auto w-full  py-6 md:py-8 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-3">
          {/* logo and description */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start">
              <Image
                src={logo}
                alt="mytourbuddy logo"
                className="h-18 w-fit aspect-square"
              />
              <h1 className="text-xl font-bold text-primary">MyTourBuddy</h1>
            </div>
            <p className="max-w-sm">
              Connect with local guides for personalized tours. Your ultimate
              tour buddy for unforgettable experiences.
            </p>
          </div>

          {/* quick urls */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
            <div>
              <h2>Explore</h2>
              <div className="flex flex-col">
                <Link href="/packages">Packages</Link>
                <Link href="/dashboard/experiences">Experiences</Link>
              </div>
            </div>
            <div>
              <h2>Support</h2>
              <div className="flex flex-col">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/settings">Settings</Link>
                <Link href="mailto:dev.sasmitha@gmail.com">Contact</Link>
              </div>
            </div>
            <div>
              <h2>Legal</h2>
              <div className="flex flex-col">
                <Link href="/terms">Terms of Service</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/about">About Us</Link>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="text-center">copyright C MyTourBuddy 2026</div>
      </section>
    </footer>
  );
};

export default Footer;

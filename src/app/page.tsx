import Image from "next/image";
import logo from "@/../public/mytourbuddy.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PackageCard from "@/components/PackageCard";
import ExperienceCard from "@/components/ExperienceCard";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your Perfect Tour Buddy
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Connect with local guides and fellow travelers for unforgettable
            experiences. Whether you're a tourist seeking adventure or a guide
            sharing your passion, MyTourBuddy makes it easy.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards - replace with real data later */}
            {/* <PackageCard />
            <PackageCard />
            <PackageCard /> */}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards - replace with real data later */}
            {/* <ExperienceCard />
            <ExperienceCard />
            <ExperienceCard /> */}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p>Create your profile as a tourist or guide.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p>Browse packages, experiences, and connect with buddies.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore</h3>
              <p>Enjoy personalized tours and create memories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of travelers and guides on MyTourBuddy today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/signup">Join Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

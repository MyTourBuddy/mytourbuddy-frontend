import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  TbArrowRight,
  TbMap,
  TbUsers,
  TbShield,
  TbSparkles,
} from "react-icons/tb";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <section className="bg-linear-to-br from-primary via-primary to-primary/80">
        <div className="max-w-6xl mx-auto">
          <div className="min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-10rem)] h-full max-w-3xl w-full px-4 flex flex-col justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground w-fit px-4 py-1.5 rounded-full">
              <TbMap />
              <p className="text-xs sm:text-sm">
                Experience Travel Like Never Before
              </p>
            </div>

            <h1 className="text-[40px] md:text-6xl font-bold text-primary-foreground leading-tight text-balance">
              Travel Authentic. Connect Local.
            </h1>

            <p className="text-base md:text-xl text-primary-foreground/90 max-w-2xl text-balance leading-relaxed">
              Discover unforgettable experiences with verified local guides.
              Skip the touristy traps and explore the real heart of any
              destination.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-48 sm:max-w-sm w-full mt-4 sm:mt-8">
              <Link
                href="/packages"
                className="bg-secondary inline-flex justify-center items-center px-4 py-2.5 text-primary font-semibold rounded-lg"
              >
                Start Exploring&nbsp;
                <TbArrowRight className="text-lg" />
              </Link>
              <Link
                href="/signup"
                className="border sm:border-2 border-secondary inline-flex justify-center items-center px-4 py-2.5 text-secondary font-semibold rounded-lg"
              >
                Become a Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto w-full py-4 px-4 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 place-items-center">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-primary mb-2">10K+</h3>
          <p className="text-foreground/75">Happy Travelers</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
          <p className="text-foreground/75">Expert Guides</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold text-primary mb-2">25+</h3>
          <p className="text-foreground/75">Destinations</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4">
        <Separator />
      </div>

      <div className="max-w-6xl mx-auto w-full py-8 px-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose MyTourBuddy?
          </h2>
          <p className="text-base sm:text-lg">
            Everything you need for authentic travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card className="cursor-pointer">
            <CardContent className="flex flex-col text-center items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg w-fit">
                <TbMap className="text-2xl text-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-lg">Local Expertise</h3>
                <p className="text-foreground/70 text-sm">
                  Connect with guides who know Sri Lanka&apos;s hidden gems and local
                  culture
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer">
            <CardContent className="flex flex-col text-center items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg w-fit">
                <TbUsers className="text-2xl text-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-lg mb-2">Verified Guides</h3>
                <p className="text-foreground/70 text-sm">
                  All guides are verified, trained, and passionate about sharing
                  their homeland
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer">
            <CardContent className="flex flex-col text-center items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg w-fit">
                <TbShield className="text-2xl text-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-lg mb-2">Safe & Secure</h3>
                <p className="text-foreground/70 text-sm">
                  Transparent pricing, secure payments, and 24/7 support for
                  peace of mind
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer">
            <CardContent className="flex flex-col text-center items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg w-fit">
                <TbSparkles className="text-2xl text-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-lg mb-2">
                  Authentic Experiences
                </h3>
                <p className="text-foreground/70 text-sm">
                  Skip tourist traps and discover real Sri Lankan culture and
                  traditions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4">
        <Separator />
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto w-full py-8 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-base sm:text-lg text-foreground/70">
            Simple steps to your authentic Sri Lankan adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Choose Your Experience
            </h3>
            <p className="text-foreground/70">
              Browse curated packages or custom experiences based on your
              interests
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Connect with a Guide</h3>
            <p className="text-foreground/70">
              Meet verified local guides who know the destination inside out
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Create Memories</h3>
            <p className="text-foreground/70">
              Enjoy authentic experiences and connect with local culture
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      {/* <div className="bg-primary/5 py-16">
        <div className="max-w-6xl mx-auto w-full px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Travelers Say
            </h2>
            <p className="text-base sm:text-lg text-foreground/70">
              Real experiences from real travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <TbStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-foreground/80 mb-4 italic">
                "Our guide knew every hidden temple and local secret. It felt
                like traveling with a friend who grew up here!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">S</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah M.</p>
                  <p className="text-sm text-foreground/60">USA</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <TbStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-foreground/80 mb-4 italic">
                "Finally experienced real Sri Lankan culture - cooking classes,
                tea plantations, and genuine connections."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">M</span>
                </div>
                <div>
                  <p className="font-semibold">Mike R.</p>
                  <p className="text-sm text-foreground/60">Australia</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <TbStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-foreground/80 mb-4 italic">
                "MyTourBuddy made our honeymoon unforgettable. Every moment felt
                special and authentic."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">J</span>
                </div>
                <div>
                  <p className="font-semibold">Jennifer L.</p>
                  <p className="text-sm text-foreground/60">UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Final CTA */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Real Sri Lanka?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Join thousands of travelers discovering authentic experiences with
            local guides
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center bg-secondary text-primary font-semibold px-4 py-2.5 rounded-lg"
            >
              Start Your Journey&nbsp;
              <TbArrowRight />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-secondary font-semibold px-4 py-2.5 rounded-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

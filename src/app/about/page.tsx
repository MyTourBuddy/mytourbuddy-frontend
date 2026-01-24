import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TbClock,
  TbMapPin,
  TbShield,
  TbSparkles,
  TbTrendingUp,
  TbUsers,
} from "react-icons/tb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AboutPage = () => {
  const features = [
    {
      icon: TbMapPin,
      title: "Local Expertise",
      description:
        "Connect with experienced local guides who know the hidden gems and best spots in every destination.",
    },
    {
      icon: TbUsers,
      title: "Verified Guides",
      description:
        "All our tourist guides are verified, trained, and committed to providing exceptional experiences.",
    },
    {
      icon: TbClock,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance to ensure your tours run smoothly and safely at all times.",
    },
    {
      icon: TbShield,
      title: "Secure Bookings",
      description:
        "Safe and secure booking system with transparent pricing and easy cancellation policies.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Travelers" },
    { value: "500+", label: "Expert Guides" },
    { value: "25+", label: "Sri Lankan Destinations" },
  ];

  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-primary via-primary to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium">
              <TbSparkles className="text-xl" />
              <span>Sri Lanka Travel Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Connecting Travelers with Authentic Experiences
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl text-balance">
              Bridge the gap between travelers seeking genuine connections and
              professional guides ready to share their local knowledge and
              passion.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full px-4 py-12">
        <div className="flex flex-col gap-8">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Mission Section */}
          <div className="space-y-6">
            <div>
              <p className="text-lg leading-relaxed text-foreground/80">
                MyTourBuddy connects travelers with Sri Lanka's best local
                guides. Discover authentic experiences, hidden gems, and create
                unforgettable memories.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-secondary/50"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-8 pt-8 border-t border-border">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Why Choose Us
              </h2>
              <p className="text-foreground/60">
                Industry-leading features designed for both travelers and guides
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title}>
                    <CardContent className="flex gap-3">
                      <div className="shrink-0">
                        <div className="p-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="text-xl text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Vision Section */}
          <div className="space-y-8 pt-8 border-t border-border">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  Our Vision
                </h2>
                <p className="text-foreground/60">
                  Making Sri Lanka travel authentic and accessible
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-accent">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <TbSparkles className="text-2xl text-primary shrink-0" />
                      <h3 className="font-semibold text-lg">For Travelers</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 leading-relaxed">
                      Discover Sri Lanka's real magic through local experts.
                      From ancient temples to hidden beaches, experience the
                      island like a local.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-accent">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <TbTrendingUp className="text-2xl text-primary shrink-0" />
                      <h3 className="font-semibold text-lg">
                        For Local Guides
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 leading-relaxed">
                      Share your knowledge, build your business, and connect
                      with travelers worldwide through our trusted platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-8 border-t border-border text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for Sri Lanka?</h2>
            <p className="text-foreground/60 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers discovering authentic Sri Lankan
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <Button size="lg" asChild className="w-full sm:w-fit">
                <Link href="/packages">Explore Packages</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-fit"
              >
                <Link href="/signup">Become a Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

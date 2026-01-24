import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <section className="max-w-5xl mx-auto w-full py-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: January 24, 2026
          </p>
        </div>

        <div className="flex flex-col gap-6 text-base leading-7">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
            <p className="text-gray-700">
              Welcome to MyTourBuddy. We are committed to protecting your
              privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Information We Collect
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">
                  Personal Information
                </h3>
                <p className="text-gray-700">
                  We may collect personal information such as your name, email
                  address, phone number, and payment details when you register
                  for an account or make a booking.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Usage Data</h3>
                <p className="text-gray-700">
                  We collect information about how you use our platform,
                  including pages visited, time spent, and interactions with our
                  services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Location Data</h3>
                <p className="text-gray-700">
                  With your consent, we may collect location data to provide
                  location-based services and recommendations.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To provide and maintain our services</li>
              <li>To process bookings and payments</li>
              <li>To communicate with you about your account and services</li>
              <li>To improve our platform and develop new features</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Information Sharing</h2>
            <p className="text-gray-700">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy or required by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, update, or delete your personal
              information. You can also opt out of certain data collection
              practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please
              contact us through our&nbsp;
              <Link className="underline text-primary" href="/contact">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;

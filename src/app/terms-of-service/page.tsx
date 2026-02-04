import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const TermsOfServicePage = () => {
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
              <BreadcrumbPage>Terms of Service</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: January 24, 2026
          </p>
        </div>

        <div className="flex flex-col gap-6 text-base leading-7">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using MyTourBuddy, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Use License</h2>
            <p className="text-gray-700">
              Permission is granted to temporarily use MyTourBuddy for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">User Accounts</h2>
            <p className="text-gray-700">
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Bookings and Payments
            </h2>
            <p className="text-gray-700">
              All bookings are subject to availability and confirmation. Payment
              terms are outlined in our booking process.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">User Conduct</h2>
            <p className="text-gray-700">
              You agree not to use the service for any unlawful purpose or to
              solicit others to perform unlawful acts.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Content</h2>
            <p className="text-gray-700">
              Our service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, or other
              material. You are responsible for content that you post.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Termination</h2>
            <p className="text-gray-700">
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Disclaimer</h2>
            <p className="text-gray-700">
              The information on this website is provided on an &apos;as is&apos; basis.
              To the fullest extent permitted by law, this Company excludes all
              representations and warranties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Limitations</h2>
            <p className="text-gray-700">
              In no event shall MyTourBuddy or its suppliers be liable for any
              damages arising out of the use or inability to use the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Governing Law</h2>
            <p className="text-gray-700">
              These terms shall be interpreted and governed by the laws of the
              jurisdiction in which MyTourBuddy operates.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please
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

export default TermsOfServicePage;

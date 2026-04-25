import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/metadata";
import { APP_NAME } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `Read our terms of service for using ${APP_NAME}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <article className="prose prose-lg mx-auto max-w-3xl dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: January 1, 2024</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using {APP_NAME}, you agree to be bound by these terms. If you do not agree,
          please do not use the service.
        </p>

        <h2>2. Service Description</h2>
        <p>
          {APP_NAME} provides breed recommendation tools, pet health education content, product
          reviews, and pet management features. Our services are intended for educational and
          informational purposes.
        </p>

        <h2>3. Medical Disclaimer</h2>
        <p>
          <strong>{APP_NAME} is not a substitute for professional veterinary advice.</strong> All
          health-related content, including our symptom helper, is for educational purposes only. You
          should always consult a licensed veterinarian for medical decisions regarding your pet.
        </p>

        <h2>4. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. You
          agree to provide accurate information when creating an account.
        </p>

        <h2>5. Acceptable Use</h2>
        <ul>
          <li>Do not use the service for any unlawful purpose</li>
          <li>Do not attempt to access other users&apos; data</li>
          <li>Do not scrape or automated access the service beyond normal use</li>
          <li>Do not post misleading or harmful content</li>
        </ul>

        <h2>6. Product Recommendations</h2>
        <p>
          Product reviews and recommendations are for informational purposes. We may earn affiliate
          commissions from purchases made through our links. This does not affect our editorial
          independence.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          All content on {APP_NAME}, including text, graphics, and software, is owned by {APP_NAME} or
          its licensors and is protected by copyright and other intellectual property laws.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          {APP_NAME} is provided &quot;as is&quot; without warranties of any kind. We are not liable
          for any damages arising from your use of the service, including decisions made based on our
          breed recommendations or health content.
        </p>

        <h2>9. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate these terms. You may
          delete your account at any time.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the service after changes
          constitutes acceptance of the updated terms.
        </p>
      </article>
    </Container>
  );
}

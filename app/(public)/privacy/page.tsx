import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/metadata";
import { APP_NAME, APP_PRIVACY_EMAIL } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `Read our privacy policy to understand how ${APP_NAME} handles your data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-16 sm:py-20">
      <article className="prose prose-lg mx-auto max-w-3xl dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: January 1, 2024</p>

        <h2>1. Information We Collect</h2>
        <p>
          When you create an account, we collect your name, email address, and password (stored
          securely using industry-standard hashing). When you use our breed quiz, we collect your
          quiz answers to generate recommendations. If you create dog profiles, we store the
          information you provide about your pets.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Provide personalized breed recommendations based on your quiz answers</li>
          <li>Allow you to manage dog profiles, favorites, and reminders</li>
          <li>Improve our recommendation algorithms</li>
          <li>Send optional email communications (only with your consent)</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>
          We do not sell your personal data. We do not share your information with third parties
          except as necessary to operate the service (e.g., hosting providers) or when required by
          law.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We use encryption, secure sessions, and role-based access controls to protect your data.
          However, no internet-based service can guarantee 100% security.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use essential cookies for authentication. We do not use third-party tracking cookies.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You can access, update, or delete your account and associated data at any time from your
          dashboard settings. Contact us at {APP_PRIVACY_EMAIL} for any data requests.
        </p>

        <h2>7. Children&apos;s Privacy</h2>
        <p>
          {APP_NAME} is not intended for children under 13. We do not knowingly collect information
          from children under 13.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We will notify registered users of material
          changes via email.
        </p>
      </article>
    </Container>
  );
}

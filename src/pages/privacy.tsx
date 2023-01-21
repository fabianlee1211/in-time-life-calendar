import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | In Time Life Calendar</title>
        <meta name="description" content="Learn about our privacy policy" />
      </Head>
      <article className="mx-auto prose prose-invert my-14 px-6">
        <Link href="/" className="btn btn-sm btn-ghost mb-4 -ml-2">
          Back
        </Link>
        <h1 className="text-digit">Privacy Policy</h1>
        <em>Last Updated: 21 Jan 2023</em>
        <p>
          We take your privacy seriously and are committed to protecting your
          personal information. This privacy policy explains how we collect,
          use, and disclose information about you when you use our website.
        </p>
        <h2>Collection of Information</h2>
        <p>
          We collect information about you when you use our website through the
          use of cookies. Cookies are small text files that are stored on your
          device when you visit a website. They are used to remember your
          preferences and to track your browsing activity. The information
          collected through cookies may include your IP address, browser type,
          and the pages you visit on our website.
        </p>
        <h2>Use of Information</h2>
        <p>
          The information collected through cookies is used to improve your
          browsing experience on our website. We may use it to personalize the
          content and ads that you see, to measure the effectiveness of our
          marketing campaigns, and to analyze website traffic.
        </p>
        <h2>Disclosure of Information</h2>
        <p>
          We do not share, sell, or disclose your personal information to any
          third parties, except as required by law.
        </p>
        <h2>Security</h2>
        <p>
          We take reasonable measures to protect the security of the information
          collected through cookies. However, please be aware that no method of
          transmitting or storing data is completely secure.
        </p>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new privacy policy on this page.
        </p>
      </article>
    </>
  );
}

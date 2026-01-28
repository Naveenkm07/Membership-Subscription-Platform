import type { Metadata } from "next";

export const siteName = "MemberStack";
export const siteUrl = "https://memberstack.example.com";

export function createMetadata(title?: string, description?: string, path = ""): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription =
    description ?? "A membership platform scaffold with gated content and subscriptions.";
  const url = `${siteUrl}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName,
      type: "website",
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${siteUrl}/og.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function membershipProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "MemberStack Membership",
    description: "Access premium courses, articles, and member-only resources.",
    brand: {
      "@type": "Brand",
      name: siteName,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Basic",
        price: "19",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        billingDuration: "P1M",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "49",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        billingDuration: "P1M",
      },
    ],
  };
}

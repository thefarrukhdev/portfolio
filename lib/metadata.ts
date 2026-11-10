import type { Metadata } from "next";

export const siteConfig = {
  name: "Farrukh Jumayev",
  description:
    "Full Stack Software Engineer specializing in Next.js 15, TypeScript, Node.js, Python, and PostgreSQL. Focused on architecting scalable backend APIs, deterministic data systems, and high-performance web platforms.",
  url: "https://thefarrukhdev.vercel.app",
  ogImage: "/og-image.png",
  creator: "@thefarrukhdev",
  authors: [
    {
      name: "Farrukh Jumayev",
      url: "https://thefarrukhdev.vercel.app",
    },
  ],
  keywords: [
    "Farrukh Jumayev",
    "Full Stack Software Engineer",
    "Software Engineer",
    "Next.js Developer",
    "TypeScript",
    "PostgreSQL",
    "Python",
    "Node.js",
    "React",
    "AWS",
    "School 21",
    "Web Performance",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Full Stack Software Engineer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const isHome = path === "/" || !title || title === "Home";
  const displayTitle = isHome
    ? `${siteConfig.name} — Full Stack Software Engineer`
    : `${title} | ${siteConfig.name}`;

  return {
    title: isHome
      ? { absolute: `${siteConfig.name} — Full Stack Software Engineer` }
      : title,
    description: description ?? siteConfig.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: displayTitle,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: displayTitle,
        },
      ],
    },
    twitter: {
      title: displayTitle,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

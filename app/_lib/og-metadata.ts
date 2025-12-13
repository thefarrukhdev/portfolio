import type { Metadata } from 'next';

interface OGMetadataOptions {
  title: string;
  description: string;
  path?: string;
  imageUrl?: string;
  type?: 'website' | 'article' | 'profile';
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://thefarrukhdev.vercel.app';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export function buildMetadata({
  title,
  description,
  path = '',
  imageUrl = DEFAULT_OG_IMAGE,
  type = 'website',
}: OGMetadataOptions): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Farrukh | Frontend Developer',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@thefarrukhdev',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
  };
}

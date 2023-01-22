import { DefaultSeoProps } from 'next-seo';

export const siteUrl =
  process.env.NEXT_PUBLIC_VERCEL_URL === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

const seoConfig: DefaultSeoProps = {
  title: 'In Time Life Calendar',
  description:
    'Visualize your remaining time of your life with the In Time Life Calendar. Make the most of every moment and never let another one slip away.',
  openGraph: {
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/in-time-life-calendar-social-card.png`,
        alt: 'In Time Life Calendar Social Card',
        type: 'image/png',
        width: 1200,
        height: 630
      }
    ]
  },
  canonical: siteUrl,
  twitter: {
    cardType: 'summary_large_image'
  },
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: '#333333'
    },
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml'
    },
    {
      name: 'msapplication-TileColor',
      content: '#333333'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png'
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#98d58c'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
    {
      rel: 'shortcut icon',
      href: '/favicon.ico'
    }
  ]
};

export default seoConfig;

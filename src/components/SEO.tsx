import { NextSeo, type NextSeoProps } from 'next-seo';
import { siteUrl } from 'next-seo.config';
import { useRouter } from 'next/router';

export default function SEO(props: NextSeoProps) {
  const router = useRouter();
  const { pathname } = router;
  const url = `${siteUrl}${pathname === '/' ? '' : pathname}`;

  return (
    <NextSeo
      canonical={url}
      openGraph={{
        url
      }}
      {...props}
    />
  );
}

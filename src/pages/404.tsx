import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="max-w-screen-2xl px-6 lg:px-12 mx-auto flex flex-1 flex-col items-center justify-center w-full">
      <h1 className="text-7xl md:text-9xl text-digit font-bold mb-2">404</h1>
      <h2 className="text-xl md:text-3xl text-zinc-500 text-center">
        Whoops! Couldn't find the page you're looking for.
      </h2>
      <Link href="/" className="btn btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}

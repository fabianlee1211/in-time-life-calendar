export default function InternalServerError() {
  return (
    <section className="max-w-screen-2xl px-6 lg:px-12 mx-auto flex flex-1 flex-col items-center justify-center w-full">
      <h1 className="text-5xl md:text-7xl text-digit font-bold mb-2">
        500 Internal Error
      </h1>
      <p className="text-xl md:text-2xl text-zinc-500 text-center">
        We are working on it. Please try again later.
      </p>
    </section>
  );
}

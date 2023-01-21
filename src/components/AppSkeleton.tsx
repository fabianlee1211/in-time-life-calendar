export default function AppSkeleton() {
  return (
    <div role="status" className="animate-pulse w-full">
      <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 max-w-[640px] mb-2.5 mx-auto"></div>
      <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 max-w-[640px] mb-2.5 mx-auto"></div>
      <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 max-w-[640px] mb-2.5 mx-auto"></div>
      <div className="h-2.5 mx-auto bg-zinc-300 rounded-full dark:bg-zinc-700 max-w-[540px]"></div>
      <div className="flex items-center justify-center mt-4">
        <div className="w-20 h-2.5 bg-zinc-200 rounded-full dark:bg-zinc-700 mr-3"></div>
        <div className="w-24 h-2 bg-zinc-200 rounded-full dark:bg-zinc-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

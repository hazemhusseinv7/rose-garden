export default function Page() {
  const link = process.env.NEXT_PUBLIC_RESERVATION_PAGE;

  return (
    <main className="bg-background">
      <div className="flex flex-col min-h-[calc(100vh-1rem)] sm:min-h-[4500px] md:min-h-[4200px] lg:min-h-[3400px] size-full overflow-hidden">
        <iframe
          src={link}
          width="100%"
          className="grow border-none pt-20 lg:pt-32 pb-28"
        />
      </div>
    </main>
  );
}

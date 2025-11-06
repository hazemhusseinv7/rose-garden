export default function Page() {
  const link = process.env.NEXT_PUBLIC_RESERVATION_PAGE;

  return (
    <main className="bg-background">
      <div className="flex flex-col min-h-[calc(100vh-1rem)] sm:min-h-[4400px] md:min-h-[4200px] lg:min-h-[3300px] xl:min-h-[3200px] size-full overflow-hidden">
        <iframe
          src={link}
          width="100%"
          className="grow border-none p-0 m-0 lg:pt-32 max-lg:pb-28"
        />
      </div>
    </main>
  );
}

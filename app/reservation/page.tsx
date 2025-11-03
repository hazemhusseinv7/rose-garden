export default function Page() {
  const link = process.env.NEXT_PUBLIC_RESERVATION_PAGE;

  return (
    <main className="bg-[#141416]">
      <div className="flex flex-col min-h-[4700px] sm:min-h-[4400px] md:min-h-[4200px] lg:min-h-[3300px] xl:min-h-[3200px] size-full overflow-hidden">
        <iframe
          src={link}
          width="100%"
          id="baabweb"
          className="grow border-none p-0 m-0 pt-32"
        />
      </div>
    </main>
  );
}

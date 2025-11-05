export default function Page() {
  const link = process.env.NEXT_PUBLIC_RESERVATION_PAGE;

  return (
    <main className="bg-background">
      <div className="flex flex-col min-h-screen size-full overflow-hidden">
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

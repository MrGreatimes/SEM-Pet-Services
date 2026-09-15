export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream py-6">
      <div className="mx-auto max-w-site px-6 flex flex-wrap items-center justify-between gap-3 text-[0.9rem]">
        <p>&copy; {year} Strol Pet Services. All rights reserved.</p>
        <a href="tel:12063075456" className="font-semibold text-cream">
          (206) 307-5456
        </a>
      </div>
    </footer>
  );
}

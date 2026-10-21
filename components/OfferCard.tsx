import Link from "next/link";
import PhotoViewer from "@/components/PhotoViewer";

type OfferCardProps = {
  image: string;
  fullImage?: string;
  alt: string;
  title: string;
  price: string;
  items?: string[];
  note?: string;
  imgClassName?: string;
  href: string;
};

// Desktop: photo on top, text below. Below the desktop breakpoint (<=860px) the card
// turns horizontal to halve its height: a 100px square thumbnail (cropped to fill) on
// the left, text stacked on the right. Tapping the photo opens it full screen (PhotoViewer);
// tapping anywhere else on the card follows `href` (its section on the Rates page). The
// title link is stretched over the whole card with an ::after layer, and the photo sits
// above that layer (z-10), so there are no nested interactive elements.
export default function OfferCard({ image, fullImage, alt, title, price, items = [], note, imgClassName, href }: OfferCardProps) {
  return (
    <div className="group/card relative bg-white border border-cream-alt rounded-site shadow-site overflow-hidden flex flex-col max-[860px]:flex-row max-[860px]:items-start max-[860px]:gap-3 max-[860px]:p-2.5 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary">
      <div className="relative z-10 aspect-square bg-gradient-to-br from-gold-light to-cream-alt overflow-hidden max-[860px]:w-[100px] max-[860px]:flex-none max-[860px]:rounded-[10px]">
        <PhotoViewer image={image} fullImage={fullImage} alt={alt} imgClassName={imgClassName} />
      </div>
      <div className="p-6 max-[860px]:p-0 max-[860px]:py-0.5 max-[860px]:min-w-0">
        <h3 className="text-[1.05rem] max-[860px]:text-[0.95rem] text-primary-dark font-heading font-bold mb-2 max-[860px]:mb-0.5">
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 after:content-[''] group-hover/card:underline underline-offset-4 decoration-2"
          >
            {title}
          </Link>
        </h3>
        <p className="font-heading font-bold text-[1.15rem] max-[860px]:text-[1rem] text-charcoal mb-3 max-[860px]:mb-1">{price}</p>
        {items.length > 0 && (
          <ul className="text-charcoal-soft text-[0.88rem] max-[860px]:text-[0.82rem] max-[860px]:leading-snug flex flex-col gap-1 max-[860px]:gap-0.5">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {note && <p className="text-[0.8rem] max-[860px]:text-[0.75rem] italic text-charcoal-soft mt-2.5 max-[860px]:mt-1 max-[860px]:leading-snug">{note}</p>}
      </div>
    </div>
  );
}

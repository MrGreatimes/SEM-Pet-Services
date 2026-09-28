import Image from "next/image";

type OfferCardProps = {
  image: string;
  alt: string;
  title: string;
  price: string;
  items?: string[];
  note?: string;
  imgClassName?: string;
};

// Desktop: photo on top, text below. Below the desktop breakpoint (<=860px) the card
// turns horizontal to halve its height: a 100px square thumbnail (cropped to fill) on
// the left, text stacked on the right.
export default function OfferCard({ image, alt, title, price, items = [], note, imgClassName }: OfferCardProps) {
  return (
    <div className="bg-white border border-cream-alt rounded-site shadow-site overflow-hidden flex flex-col max-[860px]:flex-row max-[860px]:items-start max-[860px]:gap-3 max-[860px]:p-2.5">
      <div className="relative aspect-square bg-gradient-to-br from-gold-light to-cream-alt overflow-hidden max-[860px]:w-[100px] max-[860px]:flex-none max-[860px]:rounded-[10px]">
        <Image src={image} alt={alt} fill sizes="(max-width: 860px) 100px, 300px" className={`object-cover ${imgClassName ?? ""}`} />
      </div>
      <div className="p-6 max-[860px]:p-0 max-[860px]:py-0.5 max-[860px]:min-w-0">
        <h3 className="text-[1.05rem] max-[860px]:text-[0.95rem] text-primary-dark font-heading font-bold mb-2 max-[860px]:mb-0.5">{title}</h3>
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

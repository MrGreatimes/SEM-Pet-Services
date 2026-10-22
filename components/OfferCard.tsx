import PhotoViewer from "@/components/PhotoViewer";
import OfferTitleLink from "@/components/OfferTitleLink";

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
// only the title is a link to `href` (its section on the Rates page) and underlines on
// hover or the instant a finger touches it (OfferTitleLink); the rest of the card is inert and doesn't move on hover (owner's choice).
// At <=860px the photo's tap area is widened with an ::after layer to the whole left
// strip (card edge to halfway into the gap, full card height; the card's overflow-hidden
// trims it), so a tap just below the thumbnail still opens the photo.
export default function OfferCard({ image, fullImage, alt, title, price, items = [], note, imgClassName, href }: OfferCardProps) {
  return (
    <div className="bg-card border border-cream-alt rounded-site shadow-site overflow-hidden flex flex-col max-[860px]:flex-row max-[860px]:items-start max-[860px]:gap-3 max-[860px]:p-2.5">
      <div className="relative aspect-square bg-gradient-to-br from-gold-light to-cream-alt overflow-hidden max-[860px]:overflow-visible max-[860px]:w-[100px] max-[860px]:flex-none max-[860px]:rounded-[10px]">
        <PhotoViewer
          image={image}
          fullImage={fullImage}
          alt={alt}
          imgClassName={imgClassName}
          buttonClassName="max-[860px]:after:absolute max-[860px]:after:content-[''] max-[860px]:after:-left-2.5 max-[860px]:after:-top-2.5 max-[860px]:after:-right-1.5 max-[860px]:after:-bottom-[1000px]"
        />
      </div>
      <div className="p-6 max-[860px]:p-0 max-[860px]:py-0.5 max-[860px]:min-w-0 max-[860px]:flex-1">
        {/* At <=860px the title link is a full-width block with 8px of invisible padding
            above and below (cancelled by negative margins), for a bigger tap target that
            doesn't change the layout; `relative` keeps it above the price line. */}
        <h3 className="text-[1.05rem] max-[860px]:text-[0.95rem] text-primary-dark font-heading font-bold mb-2 max-[860px]:mb-0.5">
          <OfferTitleLink href={href}>{title}</OfferTitleLink>
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

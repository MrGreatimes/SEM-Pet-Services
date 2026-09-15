import Image from "next/image";

type OfferCardProps = {
  image: string;
  alt: string;
  title: string;
  price: string;
  items: string[];
  note?: string;
  imgClassName?: string;
};

export default function OfferCard({ image, alt, title, price, items, note, imgClassName }: OfferCardProps) {
  return (
    <div className="bg-white border border-cream-alt rounded-site shadow-site overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-gradient-to-br from-gold-light to-cream-alt overflow-hidden">
        <Image src={image} alt={alt} fill className={`object-cover ${imgClassName ?? ""}`} />
      </div>
      <div className="p-6">
        <h3 className="text-[1.05rem] text-primary-dark font-heading font-bold mb-2">{title}</h3>
        <p className="font-heading font-bold text-[1.15rem] text-charcoal mb-3">{price}</p>
        <ul className="text-charcoal-soft text-[0.88rem] flex flex-col gap-1">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {note && <p className="text-[0.8rem] italic text-charcoal-soft mt-2.5">{note}</p>}
      </div>
    </div>
  );
}

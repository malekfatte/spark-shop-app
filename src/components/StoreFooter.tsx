import { Instagram, Facebook } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 3.76.92V6.69Z" />
  </svg>
);

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/solea.redlighttherapy", label: "Instagram" },
  { icon: TikTokIcon, href: "https://tiktok.com/@solea.redlighttherapy", label: "TikTok" },
  { icon: Facebook, href: "https://facebook.com/solea.redlighttherapy", label: "Facebook" },
];

export { socialLinks, TikTokIcon };

const PaymentIcons = () => (
  <div className="flex items-center justify-center gap-3 mt-5">
    {["Visa", "Mastercard", "PayPal", "Shop Pay"].map((name) => (
      <div
        key={name}
        className="h-7 px-3 rounded-full bg-warm/5 border border-border/15 flex items-center justify-center"
      >
        <span className="font-body text-[9px] font-light text-muted-foreground tracking-[0.1em] uppercase">
          {name}
        </span>
      </div>
    ))}
  </div>
);

export const StoreFooter = () => (
  <footer className="py-16 relative">
    <div className="section-divider" />
    <div className="container mx-auto px-5 text-center pt-14 relative">
      <p className="font-display font-medium text-3xl text-foreground mb-3">Soléa</p>
      <p className="text-muted-foreground text-xs max-w-sm mx-auto font-body font-light leading-relaxed">
        Professional red light therapy devices. FDA, CE, ROHS, FCC certified. Trusted by professionals worldwide.
      </p>
      <div className="flex items-center justify-center gap-4 mt-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="h-10 w-10 rounded-full border border-border/25 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-warm/30 transition-all duration-300"
          >
            <link.icon className="h-4 w-4" />
          </a>
        ))}
      </div>
      <PaymentIcons />
      <div className="mt-8 pt-8">
        <div className="section-divider mb-6" />
        <p className="text-muted-foreground/40 text-[10px] font-body tracking-[0.15em] uppercase font-light">
          © {new Date().getFullYear()} Soléa Technologies Inc.
        </p>
      </div>
    </div>
  </footer>
);
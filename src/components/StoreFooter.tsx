import thermaLogo from "@/assets/therma-logo.png";

export const StoreFooter = () => (
  <footer className="border-t border-border/30 py-14 relative">
    <div className="absolute inset-0 bg-noise" />
    <div className="container mx-auto px-5 text-center relative">
      <img src={thermaLogo} alt="Therma" className="h-10 w-10 object-contain mx-auto mb-4" width={40} height={40} loading="lazy" />
      <p className="font-display font-semibold text-lg text-foreground mb-2">Therma</p>
      <p className="text-muted-foreground text-xs max-w-sm mx-auto font-body font-light leading-relaxed">
        Professional red light therapy devices. FDA, CE, ROHS, FCC certified. Over 100 patents. Trusted by professionals worldwide.
      </p>
      <div className="mt-6 pt-6 border-t border-border/20">
        <p className="text-muted-foreground/40 text-[10px] font-body tracking-wider uppercase">
          © {new Date().getFullYear()} Therma Technologies Inc.
        </p>
      </div>
    </div>
  </footer>
);

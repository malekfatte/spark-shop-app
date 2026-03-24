export const StoreFooter = () => (
  <footer className="border-t border-border/30 py-14 relative">
    <div className="absolute inset-0 bg-noise" />
    <div className="container mx-auto px-5 text-center relative">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-primary font-display font-bold text-sm">K</span>
      </div>
      <p className="font-display font-semibold text-lg text-foreground mb-2">Kinreen</p>
      <p className="text-muted-foreground text-xs max-w-sm mx-auto font-body font-light leading-relaxed">
        Professional red light therapy devices. FDA, CE, ROHS, FCC certified. Over 100 patents. Trusted by professionals worldwide.
      </p>
      <div className="mt-6 pt-6 border-t border-border/20">
        <p className="text-muted-foreground/40 text-[10px] font-body tracking-wider uppercase">
          © {new Date().getFullYear()} Kinreen Technology (Shenzhen) Co., Ltd.
        </p>
      </div>
    </div>
  </footer>
);

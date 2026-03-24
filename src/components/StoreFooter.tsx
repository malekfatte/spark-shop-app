import { Zap } from "lucide-react";

export const StoreFooter = () => (
  <footer className="border-t border-border/50 py-10">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-primary" />
        <span className="font-heading font-bold">Kinreen</span>
      </div>
      <p className="text-muted-foreground text-xs max-w-sm mx-auto">
        Professional red light therapy devices. FDA, CE, ROHS, FCC certified. Over 100 patents.
      </p>
      <p className="text-muted-foreground/50 text-xs mt-4">
        © {new Date().getFullYear()} Kinreen Technology. All rights reserved.
      </p>
    </div>
  </footer>
);

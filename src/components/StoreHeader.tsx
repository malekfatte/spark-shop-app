import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Zap } from "lucide-react";

export const StoreHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-heading font-bold text-lg tracking-tight">Kinreen</span>
        </Link>
        <CartDrawer />
      </div>
    </header>
  );
};

import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { motion } from "framer-motion";
import thermaLogo from "@/assets/therma-logo.png";

export const StoreHeader = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30"
    >
      <div className="container mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={thermaLogo} alt="Therma" className="h-8 w-8 object-contain" width={32} height={32} />
          <span className="font-display font-semibold text-lg tracking-tight text-foreground">Therma</span>
        </Link>
        <CartDrawer />
      </div>
    </motion.header>
  );
};

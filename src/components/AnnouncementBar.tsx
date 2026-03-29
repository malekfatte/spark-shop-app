import { Truck, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 left-0 right-0 z-40 bg-lime text-foreground overflow-hidden"
        >
          <div className="container mx-auto px-5 py-2 flex items-center justify-center gap-2 relative">
            <Truck className="h-3.5 w-3.5 flex-shrink-0" />
            <p className="font-body text-[10px] sm:text-xs tracking-wider uppercase font-medium">
              Free shipping on orders over $500 · <span className="font-semibold">Shop Now</span>
            </p>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, Phone, Info, Home, Layers, Zap, Watch, Lamp, Package } from "lucide-react";
import { useState } from "react";
import { socialLinks } from "./StoreFooter";
import { useUIStore } from "@/stores/uiStore";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "#about", icon: Info },
  { label: "Certifications", href: "#certifications", icon: ShieldCheck },
  { label: "Contact", href: "#contact", icon: Phone },
];

const categoryLinks = [
  { label: "Panels", href: "#products", icon: Layers, filter: "Panels" },
  { label: "Full Body", href: "#products", icon: Zap, filter: "Full Body" },
  { label: "Wearables", href: "#products", icon: Watch, filter: "Wearables" },
  { label: "Lamps", href: "#products", icon: Lamp, filter: "Lamps" },
  { label: "Accessories", href: "#products", icon: Package, filter: "Accessories" },
];

export const StoreHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const id = href.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30"
      >
        <div className="container mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-semibold text-lg tracking-tight text-foreground">Soléa</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.href.startsWith("#") ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-xs text-muted-foreground hover:text-foreground tracking-wider uppercase transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-xs text-muted-foreground hover:text-foreground tracking-wider uppercase transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CartDrawer />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-full hover:bg-secondary/50 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-64 bg-background border-l border-border/30 pt-20 px-6"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  link.href.startsWith("#") ? (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl font-body text-sm text-foreground hover:bg-secondary/40 transition-colors"
                    >
                      <link.icon className="h-4 w-4 text-navy" />
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl font-body text-sm text-foreground hover:bg-secondary/40 transition-colors"
                    >
                      <link.icon className="h-4 w-4 text-navy" />
                      {link.label}
                    </Link>
                  )
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border/30">
                <p className="px-3 mb-2 font-body text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Shop by Category</p>
                <div className="space-y-0.5">
                  {categoryLinks.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => handleNavClick(cat.href)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl font-body text-sm text-foreground hover:bg-secondary/40 transition-colors"
                    >
                      <cat.icon className="h-4 w-4 text-muted-foreground" />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="h-8 w-8 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <link.icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
                <p className="text-muted-foreground/40 text-[10px] font-body tracking-wider uppercase text-center">
                  © {new Date().getFullYear()} Soléa
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

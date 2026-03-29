import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, Phone, Info, Home, Layers, Watch, Zap } from "lucide-react";
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
  { label: "Wearables", href: "#products", icon: Watch, filter: "Wearables" },
  { label: "Mats", href: "#products", icon: Layers, filter: "Mats" },
  { label: "Portable", href: "#products", icon: Zap, filter: "Portable" },
];

export const StoreHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const setActiveCategory = useUIStore((s) => s.setActiveCategory);

  const handleNavClick = (href: string, filter?: string) => {
    setMenuOpen(false);
    if (filter) {
      setActiveCategory(filter);
    }
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
        className="fixed top-0 left-0 right-0 z-50 bg-foreground/90 backdrop-blur-2xl border-b border-white/10"
      >
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-medium text-2xl tracking-tight text-white">Soléa</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith("#") ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-[11px] text-white/60 hover:text-white tracking-[0.15em] uppercase transition-colors duration-300"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-[11px] text-white/60 hover:text-white tracking-[0.15em] uppercase transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <CartDrawer />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/60 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-72 bg-foreground border-l border-white/10 pt-20 px-6"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  link.href.startsWith("#") ? (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center gap-3 w-full px-3 py-3.5 rounded-xl font-body text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      <link.icon className="h-4 w-4 text-lime" />
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-3.5 rounded-xl font-body text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      <link.icon className="h-4 w-4 text-lime" />
                      {link.label}
                    </Link>
                  )
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="px-3 mb-3 font-body text-[10px] text-white/40 tracking-[0.2em] uppercase font-light">Shop by Category</p>
                <div className="space-y-0.5">
                  {categoryLinks.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => handleNavClick(cat.href, cat.filter)}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl font-body text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      <cat.icon className="h-4 w-4 text-white/40" />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    >
                      <link.icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
                <p className="text-white/25 text-[10px] font-body tracking-[0.15em] uppercase text-center font-light">
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

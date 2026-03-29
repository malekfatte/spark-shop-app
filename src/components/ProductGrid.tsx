import { useMemo } from "react";
import { useUIStore } from "@/stores/uiStore";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import type { ShopifyProduct } from "@/lib/shopify";

const CATEGORIES = [
  { label: "All", keywords: [] },
  { label: "Panels", keywords: ["panel", "236w", "desktop", "100w"] },
  { label: "Wearables", keywords: ["mask", "cap", "baseball"] },
  { label: "Mats", keywords: ["mat", "single-sided"] },
  { label: "Portable", keywords: ["torch", "portable", "mini", "glowpocket"] },
] as const;

function matchesCategory(product: ShopifyProduct, keywords: readonly string[]) {
  if (keywords.length === 0) return true;
  const title = product.node.title.toLowerCase();
  return keywords.some((k) => title.includes(k));
}

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();
  const { activeCategory, setActiveCategory } = useUIStore();

  const filtered = useMemo(() => {
    if (!products) return [];
    const cat = CATEGORIES.find((c) => c.label === activeCategory);
    if (!cat || cat.keywords.length === 0) return products;
    return products.filter((p) => matchesCategory(p, cat.keywords));
  }, [products, activeCategory]);

  return (
    <section id="products" className="py-10 sm:py-16 relative">
      <div className="container mx-auto px-3 sm:px-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-body text-muted-foreground font-light tracking-[0.3em] uppercase text-[10px] mb-4">The Collection</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-foreground leading-tight">
            Precision-Engineered<br />
            <span className="text-muted-foreground font-light">Therapy Devices</span>
          </h2>
        </motion.div>

        {products && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.label;
              const count = cat.keywords.length === 0
                ? products.length
                : products.filter((p) => matchesCategory(p, cat.keywords)).length;

              if (count === 0 && cat.keywords.length > 0) return null;

              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`
                    font-body text-[11px] sm:text-xs px-5 sm:px-6 py-2.5 sm:py-3 rounded-full
                    transition-all duration-300 border font-light tracking-[0.1em] uppercase
                    ${isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                    }
                  `}
                >
                  {cat.label}
                  <span className={`ml-2 text-[10px] ${isActive ? "text-background/60" : "text-muted-foreground/50"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-24 text-destructive font-body">
            <p>Failed to load products. Please try again.</p>
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-24">
            <PackageOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg font-display">No products found</p>
            <p className="text-muted-foreground text-sm mt-2 font-body font-light">Products will appear here once added.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <PackageOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-base font-display">No products in this category</p>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.node.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import type { ShopifyProduct } from "@/lib/shopify";

// Categories inspired by Heilys structure: product type based
const CATEGORIES = [
  { label: "All", keywords: [] },
  { label: "Panels", keywords: ["panel", "kr1500", "kr600", "kr300", "kr15", "kr900"] },
  { label: "Full Body", keywords: ["full body", "kr1500", "mat"] },
  { label: "Wearables", keywords: ["mask", "wrap", "foldable", "go2"] },
  { label: "Lamps", keywords: ["bulb", "round"] },
  { label: "Accessories", keywords: ["bag", "sleeping", "stand", "door"] },
] as const;

function matchesCategory(product: ShopifyProduct, keywords: readonly string[]) {
  if (keywords.length === 0) return true;
  const title = product.node.title.toLowerCase();
  return keywords.some((k) => title.includes(k));
}

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (!products) return [];
    const cat = CATEGORIES.find((c) => c.label === activeCategory);
    if (!cat || cat.keywords.length === 0) return products;
    return products.filter((p) => matchesCategory(p, cat.keywords));
  }, [products, activeCategory]);

  return (
    <section id="products" className="py-10 sm:py-16 relative">
      <div className="absolute inset-0 bg-noise" />
      <div className="container mx-auto px-3 sm:px-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="font-body text-primary font-medium tracking-[0.3em] uppercase text-[10px] mb-3">The Collection</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Precision-Engineered<br />
            <span className="text-gradient-red italic">Therapy Devices</span>
          </h2>
        </motion.div>

        {/* Category filter tabs */}
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
                    font-body text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full
                    transition-all duration-300 border
                    ${isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-secondary/30 text-muted-foreground border-border/40 hover:border-primary/50 hover:text-foreground"
                    }
                  `}
                >
                  {cat.label}
                  <span className={`ml-1.5 text-[10px] sm:text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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

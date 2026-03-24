import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();

  return (
    <section id="products" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-noise" />
      <div className="container mx-auto px-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-primary font-medium tracking-[0.3em] uppercase text-[10px] mb-3">The Collection</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Precision-Engineered<br />
            <span className="text-gradient-red italic">Therapy Devices</span>
          </h2>
        </motion.div>

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
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.node.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

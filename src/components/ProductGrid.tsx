import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">Our Products</h2>
          <p className="text-muted-foreground text-sm mt-2">Professional-grade red light therapy devices</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">
            <p>Failed to load products. Please try again.</p>
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20">
            <PackageOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg font-heading">No products found</p>
            <p className="text-muted-foreground text-sm mt-1">Products will appear here once added to the store.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

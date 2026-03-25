import { StoreHeader } from "@/components/StoreHeader";
import { HeroSection } from "@/components/HeroSection";

import { ProductGrid } from "@/components/ProductGrid";
import { StoreFooter } from "@/components/StoreFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main>
        <HeroSection />
        <BenefitsBar />
        <ProductGrid />
      </main>
      <StoreFooter />
    </div>
  );
};

export default Index;

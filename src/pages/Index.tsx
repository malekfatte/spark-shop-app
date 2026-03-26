import { StoreHeader } from "@/components/StoreHeader";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { CertificationsSection } from "@/components/CertificationsSection";
import { CompanySection } from "@/components/CompanySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { StoreFooter } from "@/components/StoreFooter";
import { NewsletterPopup } from "@/components/NewsletterPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main>
        <HeroSection />
        <ProductGrid />
        <CertificationsSection />
        <TestimonialsSection />
        <CompanySection />
        <ContactSection />
      </main>
      <StoreFooter />
      <NewsletterPopup />
    </div>
  );
};

export default Index;

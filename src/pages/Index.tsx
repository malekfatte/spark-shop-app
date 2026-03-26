import { StoreHeader } from "@/components/StoreHeader";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { HeroSection } from "@/components/HeroSection";
import { SocialProofBar } from "@/components/SocialProofBar";
import { ProductGrid } from "@/components/ProductGrid";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { CompanySection } from "@/components/CompanySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { StoreFooter } from "@/components/StoreFooter";
import { NewsletterPopup } from "@/components/NewsletterPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <AnnouncementBar />
      <main>
        <HeroSection />
        <SocialProofBar />
        <ProductGrid />
        <CertificationsSection />
        <TestimonialsSection />
        <CompanySection />
        <FAQSection />
        <ContactSection />
      </main>
      <StoreFooter />
      <NewsletterPopup />
    </div>
  );
};

export default Index;

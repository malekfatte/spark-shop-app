import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Red Light Therapy Device" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center pt-14">
        <p className="text-primary font-heading font-medium tracking-[0.3em] uppercase text-xs mb-4">
          Professional Red Light Therapy
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
          Heal Deeper.<br />
          <span className="text-gradient-red">Recover Faster.</span>
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base mb-8 leading-relaxed">
          FDA-approved red & near-infrared therapy panels for pain relief, skin health, and cellular recovery.
        </p>
        <Button onClick={scrollToProducts} size="lg" className="glow-red rounded-full px-8">
          Shop Now <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

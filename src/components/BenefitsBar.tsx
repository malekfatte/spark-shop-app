import { Zap, Shield, Heart, Sun } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Pain Relief", desc: "Reduce inflammation and accelerate healing" },
  { icon: Heart, title: "Skin Health", desc: "Boost collagen production naturally" },
  { icon: Shield, title: "FDA Cleared", desc: "CE, ROHS, FCC, ISO certified" },
  { icon: Sun, title: "380-1070nm", desc: "Full spectrum customizable wavelengths" },
];

export const BenefitsBar = () => (
  <section className="py-12 border-y border-border/50 bg-gradient-radial-red">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {benefits.map((b) => (
          <div key={b.title} className="text-center">
            <b.icon className="h-6 w-6 text-primary mx-auto mb-2" />
            <h3 className="font-heading font-semibold text-sm">{b.title}</h3>
            <p className="text-muted-foreground text-xs mt-1">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

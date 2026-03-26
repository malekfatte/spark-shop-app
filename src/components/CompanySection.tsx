import { Users, Globe, Lightbulb, Clock } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { icon: Lightbulb, value: 100, suffix: "+", label: "Patents Filed" },
  { icon: Globe, value: 50, suffix: "+", label: "Countries Served" },
  { icon: Users, value: 500, suffix: "K+", label: "Happy Customers" },
  { icon: Clock, value: 10, suffix: "+", label: "Years of R&D" },
];

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => animate(motionValue, value, { duration: 1.5, ease: "easeOut" })}
      className="font-display text-3xl sm:text-4xl font-bold text-navy"
    >
      0{suffix}
    </motion.span>
  );
};

export const CompanySection = () => (
  <section className="py-14 sm:py-20 relative border-t border-border/20">
    <div className="absolute inset-0 bg-noise" />
    <div className="container mx-auto px-4 sm:px-5 relative">
      {/* Stats bar — full width, horizontal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-12 sm:mb-16 rounded-2xl overflow-hidden card-premium"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`p-5 sm:p-8 text-center ${
              i < stats.length - 1 ? "border-r border-border/20" : ""
            } ${i < 2 ? "border-b md:border-b-0 border-border/20" : ""}`}
          >
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="text-muted-foreground text-[10px] sm:text-xs font-body mt-1 tracking-wider uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Company story — asymmetric layout */}
      <div className="grid md:grid-cols-5 gap-6 md:gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3"
        >
          <p className="font-body text-navy font-medium tracking-[0.3em] uppercase text-[10px] mb-3">Our Story</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Pioneering Light Therapy<br />
            <span className="text-navy">Since 2014</span>
          </h2>
          <div className="space-y-3 text-muted-foreground text-xs sm:text-sm font-body font-light leading-relaxed">
            <p>
              Soléa Technologies was founded with a single mission: to make professional-grade red light therapy accessible to everyone. Our devices are engineered in collaboration with leading photobiomodulation researchers and manufactured under strict medical-device standards.
            </p>
            <p>
              Every panel undergoes rigorous third-party testing for irradiance output, wavelength accuracy, and EMF safety — ensuring you receive clinically effective doses with every session.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 space-y-3"
        >
          {[
            { title: "Precision Wavelengths", desc: "660nm red + 850nm near-infrared, verified by independent spectral analysis" },
            { title: "Zero EMF at 6\"", desc: "Electromagnetic field levels tested below detectable thresholds" },
            { title: "3rd-Party Tested", desc: "Every batch verified by independent labs for power output and safety" },
          ].map((item, i) => (
            <div
              key={item.title}
              className="bg-navy/[0.04] border border-navy/10 rounded-xl p-4 hover:border-navy/20 transition-colors"
            >
              <p className="font-display font-semibold text-sm text-foreground mb-1">{item.title}</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs font-body font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

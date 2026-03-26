import { Shield, Award, CheckCircle, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
  { icon: Shield, label: "FDA Cleared", desc: "Class II medical device clearance for therapeutic use" },
  { icon: Award, label: "CE Certified", desc: "European conformity for health & safety standards" },
  { icon: FileCheck, label: "ROHS Compliant", desc: "Restriction of hazardous substances directive" },
  { icon: CheckCircle, label: "FCC Certified", desc: "Electromagnetic compatibility verified" },
];

export const CertificationsSection = () => (
  <section className="py-12 sm:py-16 relative border-t border-border/20">
    <div className="absolute inset-0 bg-noise" />
    <div className="container mx-auto px-4 sm:px-5 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="font-body text-navy font-medium tracking-[0.3em] uppercase text-[10px] mb-3">Trusted & Certified</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          Industry-Leading Certifications
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-premium rounded-xl p-4 sm:p-6 text-center"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy/10 mb-3">
              <cert.icon className="h-5 w-5 text-navy" />
            </div>
            <h3 className="font-display font-semibold text-sm sm:text-base text-foreground mb-1">{cert.label}</h3>
            <p className="text-muted-foreground text-[10px] sm:text-xs font-body font-light leading-relaxed">{cert.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-muted-foreground text-xs font-body">
          Over <span className="text-navy font-semibold">100+ patents</span> · Trusted by professionals in <span className="text-navy font-semibold">50+ countries</span>
        </p>
      </motion.div>
    </div>
  </section>
);

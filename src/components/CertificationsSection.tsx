import { Shield, Award, CheckCircle, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
  { icon: Shield, label: "FDA", desc: "Class II Medical Device" },
  { icon: Award, label: "CE", desc: "European Conformity" },
  { icon: FileCheck, label: "ROHS", desc: "Hazard-Free Materials" },
  { icon: CheckCircle, label: "FCC", desc: "EMC Verified" },
];

export const CertificationsSection = () => (
  <section className="py-14 sm:py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-navy" />
    <div className="absolute inset-0 bg-noise opacity-[0.04]" />
    <div className="container mx-auto px-4 sm:px-5 relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left: big statement */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:max-w-md"
        >
          <p className="font-body text-white/50 font-medium tracking-[0.3em] uppercase text-[10px] mb-3">
            Certifications
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            Built to Medical-Grade Standards
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-body font-light leading-relaxed">
            Every device passes rigorous third-party testing. Over <span className="text-white font-medium">100 patents</span> protect our proprietary wavelength technology.
          </p>
        </motion.div>

        {/* Right: horizontal cert badges */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-5 py-3"
            >
              <cert.icon className="h-4 w-4 text-white/80" />
              <div>
                <p className="font-display font-bold text-sm text-white leading-none">{cert.label}</p>
                <p className="text-white/40 text-[9px] font-body">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

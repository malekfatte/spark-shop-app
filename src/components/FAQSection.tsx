import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is red light therapy and how does it work?",
    a: "Red light therapy (photobiomodulation) uses specific wavelengths of red (660nm) and near-infrared (850nm) light to penetrate the skin and stimulate cellular energy production (ATP). This promotes faster healing, reduces inflammation, and supports tissue repair at the cellular level.",
  },
  {
    q: "Are Soléa devices FDA cleared?",
    a: "Yes. All Soléa therapy panels are FDA cleared, CE certified, ROHS compliant, and FCC certified. We hold over 100 patents and meet the highest standards for safety and efficacy.",
  },
  {
    q: "How long should I use a red light therapy device per session?",
    a: "We recommend 10–20 minutes per treatment area, 3–5 times per week. For best results, position the device 6–12 inches from your skin. Always follow the user guide included with your specific device.",
  },
  {
    q: "What's the difference between red light and near-infrared light?",
    a: "Red light (660nm) is absorbed by the skin and is ideal for skin health, collagen production, and surface-level healing. Near-infrared light (850nm) penetrates deeper into muscles, joints, and tissues — making it better for pain relief and deep tissue recovery.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — every Soléa device comes with a 2-year manufacturer warranty covering defects in materials and workmanship. We also offer a 30-day satisfaction guarantee.",
  },
  {
    q: "Is red light therapy safe?",
    a: "Absolutely. Red light therapy is non-invasive, painless, and has no known side effects when used as directed. It's been studied extensively in over 4,000 peer-reviewed clinical trials.",
  },
];

export const FAQSection = () => (
  <section className="py-20 relative">
    <div className="absolute inset-0 bg-noise opacity-40" />
    <div className="container mx-auto px-5 relative max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="font-body text-navy font-medium tracking-[0.3em] uppercase text-[10px] mb-3">
          FAQ
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Common Questions
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border/30 rounded-xl px-5 data-[state=open]:bg-card/60 transition-colors"
            >
              <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline py-4 text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

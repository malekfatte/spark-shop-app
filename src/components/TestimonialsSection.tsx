import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const doctorTestimonials = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Sports Medicine Physician",
    quote: "I've recommended Soléa panels to over 200 patients for post-surgical recovery. The results in tissue healing and pain reduction are consistently remarkable.",
  },
  {
    name: "Dr. James Chen",
    title: "Dermatologist, MD",
    quote: "The wavelength precision of these devices sets them apart. My patients see visible improvements in skin texture and collagen production within 4–6 weeks.",
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Physical Therapist, DPT",
    quote: "Red light therapy from Soléa has become an essential part of my practice. Patients recover faster and report significantly less chronic pain.",
  },
];

const userTestimonials = [
  { name: "Michael T.", location: "Austin, TX", quote: "After 3 weeks of daily sessions, my knee pain from running is almost gone. I wish I'd found this years ago.", stars: 5 },
  { name: "Jessica L.", location: "Miami, FL", quote: "The full-body panel is incredible. My skin looks healthier, I sleep better, and my recovery after workouts has improved dramatically.", stars: 5 },
  { name: "David K.", location: "Denver, CO", quote: "As a competitive cyclist, recovery is everything. This device cut my downtime in half. Worth every penny.", stars: 5 },
  { name: "Anna W.", location: "Portland, OR", quote: "I bought the face mask for acne scarring. After 6 weeks, my dermatologist noticed the improvement before I even mentioned it.", stars: 5 },
  { name: "Robert M.", location: "Chicago, IL", quote: "Best investment in my health this year. My joint stiffness is noticeably reduced after just two weeks of consistent use.", stars: 5 },
  { name: "Lisa P.", location: "Seattle, WA", quote: "I was skeptical at first but the science backed it up. Now I'm a believer — my energy levels and skin clarity have both improved.", stars: 5 },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="h-3 w-3 fill-lime text-lime" />
    ))}
  </div>
);

export const TestimonialsSection = () => {
  const [activeDr, setActiveDr] = useState(0);

  return (
    <section className="py-12 sm:py-20 relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="font-body text-muted-foreground font-light tracking-[0.3em] uppercase text-[10px] mb-3">Expert Endorsed</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-medium text-foreground">
            Trusted by Healthcare Professionals
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-14"
        >
          <div className="relative bg-secondary border border-border rounded-2xl p-6 sm:p-8 mb-4">
            <Quote className="absolute top-5 left-5 h-8 w-8 text-border" />
            <p className="text-foreground text-base sm:text-lg font-body leading-relaxed text-center relative z-10 italic">
              "{doctorTestimonials[activeDr].quote}"
            </p>
            <div className="text-center mt-5">
              <p className="font-display text-sm font-medium text-foreground">{doctorTestimonials[activeDr].name}</p>
              <p className="text-muted-foreground text-xs font-body">{doctorTestimonials[activeDr].title}</p>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {doctorTestimonials.map((dr, i) => (
              <button
                key={dr.name}
                onClick={() => setActiveDr(i)}
                className={`px-4 py-2 rounded-full text-xs font-body transition-all duration-300 ${
                  i === activeDr
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-border"
                }`}
              >
                {dr.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="font-body text-muted-foreground font-light tracking-[0.3em] uppercase text-[10px] mb-3">Real Results</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-medium text-foreground">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
          {userTestimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="break-inside-avoid mb-3 sm:mb-4"
            >
              <div className="card-premium rounded-xl p-4 sm:p-5">
                <StarRating count={t.stars} />
                <p className="text-foreground text-xs sm:text-sm font-body leading-relaxed mt-3 mb-3">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-xs font-medium text-foreground">{t.name}</p>
                    <p className="text-muted-foreground text-[10px] font-body">{t.location}</p>
                  </div>
                  <div className="h-7 w-7 rounded-full bg-foreground flex items-center justify-center">
                    <span className="text-background font-display text-[10px] font-medium">{t.name.charAt(0)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

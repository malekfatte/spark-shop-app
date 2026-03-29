import { motion } from "framer-motion";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      if (error) throw error;
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground font-body text-sm max-w-md mx-auto leading-relaxed">
            Have questions about our red light therapy devices? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-lg font-medium text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <a href="mailto:info@solea.com" className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-border transition-colors">
                    <Mail className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-wider text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm font-body text-foreground">info@solea.com</p>
                  </div>
                </a>

                <a href="tel:+18001234567" className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-border transition-colors">
                    <Phone className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-wider text-muted-foreground mb-0.5">Phone</p>
                    <p className="text-sm font-body text-foreground">+1 (800) 123-4567</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-wider text-muted-foreground mb-0.5">Location</p>
                    <p className="text-sm font-body text-foreground">United States</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-secondary">
              <p className="text-xs font-body text-muted-foreground leading-relaxed">
                We typically respond within <span className="text-foreground font-medium">24 hours</span>. For urgent inquiries, please call us directly.
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div>
              <label className="text-[10px] font-body uppercase tracking-wider text-muted-foreground mb-1.5 block">Name</label>
              <Input
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                className="bg-secondary border-border font-body text-sm h-11 rounded-xl focus:border-foreground/40"
              />
            </div>
            <div>
              <label className="text-[10px] font-body uppercase tracking-wider text-muted-foreground mb-1.5 block">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                maxLength={255}
                className="bg-secondary border-border font-body text-sm h-11 rounded-xl focus:border-foreground/40"
              />
            </div>
            <div>
              <label className="text-[10px] font-body uppercase tracking-wider text-muted-foreground mb-1.5 block">Message</label>
              <Textarea
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                maxLength={1000}
                rows={5}
                className="bg-secondary border-border font-body text-sm rounded-xl resize-none focus:border-foreground/40"
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="w-full h-11 rounded-xl font-body text-sm gap-2 bg-foreground text-background hover:bg-foreground/90"
            >
              {sending ? "Sending..." : "Send Message"}
              <Send className="h-3.5 w-3.5" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

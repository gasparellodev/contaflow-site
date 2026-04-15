import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { VideoDemo } from "@/components/video-demo";
import { ProductShowcase } from "@/components/product-showcase";
import { SocialProof } from "@/components/social-proof";
import { PlansSection } from "@/components/plans-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollReveal />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <VideoDemo />
        <ProductShowcase />
        <SocialProof />
        <PlansSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

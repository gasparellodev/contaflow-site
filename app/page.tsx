import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { VideoDemo } from "@/components/video-demo";
import { ProductShowcase } from "@/components/product-showcase";
import { AboutSection } from "@/components/about-section";
import { PlansSection } from "@/components/plans-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <VideoDemo />
        <ProductShowcase />
        <AboutSection />
        <PlansSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

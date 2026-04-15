import { Header } from "@/components/header";
import { HeroCinematic } from "@/components/hero-cinematic";
import { BentoLive } from "@/components/bento-live";
import { ScrollStory } from "@/components/scroll-story";
import { VideoShowcase } from "@/components/video-showcase";
import { SocialProofPremium } from "@/components/social-proof-premium";
import { PricingAttio } from "@/components/pricing-attio";
import { FaqSection } from "@/components/faq-section";
import { CtaFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050B15]">
      <Header />
      <main>
        <HeroCinematic />
        <BentoLive />
        <ScrollStory />
        <VideoShowcase />
        <SocialProofPremium />
        <PricingAttio />
        <FaqSection />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}

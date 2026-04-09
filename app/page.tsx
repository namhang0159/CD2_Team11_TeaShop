import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ProductsSection } from "@/components/products-section";
import { BlogSection } from "@/components/blog-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <BlogSection />
        <CTASection />
      </main>
    </div>
  );
}

import { Header } from "@/components/header/header";
import { Header2 } from "@/components/header/header2";
import { HeroSection } from "@/components/sections/hero-section";
import { ShoppingSection } from "@/components/sections/shopping-section";

export default function Home() {
  return (
    <div className="bg-grey-200">
      <Header2 />
      <Header />
      <HeroSection />
      <ShoppingSection />
    </div>
  );
}

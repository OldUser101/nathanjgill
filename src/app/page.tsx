import { HeaderPanel } from "@/components/nathanjgill/header";
import { FooterPanel } from "@/components/nathanjgill/footer";
import { Hero } from "@/components/nathanjgill/hero";

export default function Home() {
  return (
    <div className="font-sans">
        <HeaderPanel />
        <div className="h-14"/>
        <main>
          <Hero />
          <FooterPanel />
        </main>
    </div>
  );
}

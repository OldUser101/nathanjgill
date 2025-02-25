import { HeaderPanel } from "@/components/nathanjgill/header";
import { FooterPanel } from "@/components/nathanjgill/footer";
import { Hero } from "@/components/nathanjgill/hero";
import { RepoGrid } from "@/components/nathanjgill/repo-grid";

export default function Home() {
  return (
    <div className="font-sans">
        <HeaderPanel />
        <div className="h-14"/>
        <main>
          <Hero />
          <RepoGrid />
          <FooterPanel />
        </main>
    </div>
  );
}

import { HeaderPanel } from "@/components/nathanjgill/header";
import { FooterPanel } from "@/components/nathanjgill/footer";
import { Hero } from "@/components/nathanjgill/hero";
import { RepoGrid } from "@/components/nathanjgill/repo-grid";
import { GitHubStats } from "@/components/nathanjgill/stats";

export default function Home() {
  return (
    <div>
        <HeaderPanel fixed/>
        <div className="h-14"/>
        <main>
          <Hero />
          <GitHubStats />
          <RepoGrid />
        </main>
        <FooterPanel/>
    </div>
  );
}

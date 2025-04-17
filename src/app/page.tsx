import { HeaderPanel } from "@/components/nathanjgill/header";
import { FooterPanel } from "@/components/nathanjgill/footer";
import { Hero } from "@/components/nathanjgill/hero";
import { RepoGrid } from "@/components/nathanjgill/repo-grid";
import { GitHubStats } from "@/components/nathanjgill/stats";

export default function Home() {
  const branch = (process.env.BRANCH_TYPE as "prod" | "dev") || "prod";
  return (
    <div className="font-sans">
        <HeaderPanel fixed/>
        <div className="h-14"/>
        <main>
          <Hero />
          <GitHubStats />
          <RepoGrid />
        </main>
        <FooterPanel branch={branch}/>
    </div>
  );
}

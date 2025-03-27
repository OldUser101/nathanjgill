import { HeaderPanel } from "@/components/nathanjgill/header";
import { FooterPanel } from "@/components/nathanjgill/footer";
import { ProjectGrid } from "@/components/nathanjgill/projects_grid";

export default function Home() {
  return (
    <div className="font-sans">
        <HeaderPanel fixed/>
        <div className="h-14"/>
        <main>
          <ProjectGrid />
        </main>
        <FooterPanel />
    </div>
  );
}

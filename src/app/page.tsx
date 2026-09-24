import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";

// A Writing section (components/sections/writing.tsx, latest Substack posts)
// is built but not shown for now. To bring it back, render <WritingSection />
// before <ContactSection /> and add { id: "writing", label: "Writing" } to
// navItems in src/content/profile.ts.
export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <Highlights />
        <About />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

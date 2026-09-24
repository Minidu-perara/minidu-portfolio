import { SectionBar, type NavSection } from "@/components/section-nav";
import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Highlights } from "@/components/sections/highlights";
import { Intro } from "@/components/sections/intro";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";

// A Writing section (components/sections/writing.tsx, latest Substack posts)
// is built but not shown for now. To bring it back, render <WritingSection />
// before <ContactSection /> and add { id: "writing", label: "Writing" } here.
const sections: readonly NavSection[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-16">
      <Intro sections={sections} />
      <SectionBar sections={sections} />
      <main id="main" className="flex max-w-2xl flex-col gap-24 pb-12 lg:w-[54%] lg:max-w-none lg:gap-28 lg:py-20">
        <div className="flex flex-col gap-16">
          <Highlights />
          <About />
        </div>
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

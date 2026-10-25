import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { JourneySection } from "@/components/journey-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <JourneySection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

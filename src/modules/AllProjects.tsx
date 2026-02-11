import CompletedProjectsSection from "@/app/_components/CompletedProjectSection";
import CurrentProjectSection from "@/app/_components/CurrentProjectSection";
import PendingProjectSection from "@/app/_components/PendingProjectSection";

export default function AllProjects() {
  return (
    <>
      <CompletedProjectsSection />
      <CurrentProjectSection />
      <PendingProjectSection />
    </>
  );
}

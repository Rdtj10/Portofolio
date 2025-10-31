import CompletedProjectsSection from "@/app/_components/CompletedProjectSection";
import CurrentProjectSection from "@/app/_components/CurrentProjectSection";
import PendingProjectSection from "@/app/_components/PendingProjectSection";
import HydrationQuery from "@/pkg/hydrationQuery";
import { getAllProjects } from "@/server/t-rpc/projects/project.query";

export default function AllProjects() {
  return (
    <HydrationQuery prefetchQuery={[getAllProjects()]}>
      <CompletedProjectsSection />
      <CurrentProjectSection />
      <PendingProjectSection />
    </HydrationQuery>
  );
}

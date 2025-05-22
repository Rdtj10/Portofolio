import CompletedProjectsSection from "@/components/partials/CompletedProjectSection";
import CurrentProjectSection from "@/components/partials/CurrentProjectSection";
import PendingProjectSection from "@/components/partials/PendingProjectSection";
import HydrationQuery from "@/pkg/hydrationQuery";
import { getAllProjects } from "@/service/t-rpc/projects/project.query";

export default function AllProjects() {
  return(
    <HydrationQuery prefetchQuery={[getAllProjects()]}>
      <CompletedProjectsSection />
      <CurrentProjectSection />
      <PendingProjectSection />
    </HydrationQuery>
  )
}
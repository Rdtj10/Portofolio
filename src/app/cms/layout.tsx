import SideBar from "@/components/SideBar";

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex flex-row">
        <SideBar />
        <div className="cms-layout">{children}</div>
      </div>
  )
}

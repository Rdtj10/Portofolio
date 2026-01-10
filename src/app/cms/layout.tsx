import SideBar from "@/components/SideBar";

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex flex-row">
        <SideBar />
        <div className="flex-1 w-full h-screen overflow-hidden bg-gray-50/50">{children}</div>
      </div>
  )
}

"use client";
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/utils/trpc";
import { usePathname } from "next/navigation";

const VisitorDisplay = () => {
  const pathname = usePathname();
  const hasVisitedCurrentPath = useRef(false);
  const utils = trpc.useUtils();

  const [yourVisitorNumber, setYourVisitorNumber] = useState<number | null>(null);

  const { data: allVisitors, isLoading, refetch } = trpc.visit.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    }
  );

  // Mutasi untuk membuat entri pengunjung baru
  const createVisitorMutation = trpc.visit.create.useMutation({
    onSuccess: async (data) => {
     
      if (data.success) {
        await utils.visit.getAll.invalidate();
        await refetch(); 
      }
    },
    onError: (error) => {
      console.warn("Failed to create visitor entry:", error.message);
      refetch();
    },
  });

  useEffect(() => {
    if (pathname === "/" && !hasVisitedCurrentPath.current) {
      const userAgent = navigator.userAgent;
      const url = window.location.href;

      createVisitorMutation.mutate({ userAgent, url });
      hasVisitedCurrentPath.current = true; 
    }
    if (pathname !== "/") {
      hasVisitedCurrentPath.current = false;
      setYourVisitorNumber(null);
    }

  }, [pathname, createVisitorMutation, refetch]); 

  useEffect(() => {
    if (allVisitors && !isLoading && yourVisitorNumber === null) {
      if (allVisitors?.length) {
        setYourVisitorNumber(allVisitors.length);
      }
    }
  }, [allVisitors, isLoading]); 
  const totalVisitorsCount = allVisitors?.length ?? 0; 

  return (
    <div className="flex flex-row fixed bottom-0 right-0 lg:m-6 w-fit translate-x-3 md:translate-none items-center gap-2 lg:scale-100 scale-75 z-10">
      <div className="flex flex-col">
        <p className="text-sm text-center">
          Total Visitors:{" "}
          <span className="font-bold text-yellow-500">
            {isLoading ? "Counting..." : totalVisitorsCount}
          </span>
        </p>
        <h1 className="text-lg bg-slate-700 text-white py-1 px-4 rounded-full border border-white font-bold">
          {yourVisitorNumber !== null
            ? `You're visitor #${yourVisitorNumber}`
            : isLoading ? "Thinking..." : "Reload to see your number"} {/* Lebih baik pesan ini */}
        </h1>
      </div>
    </div>
  );
};

export default VisitorDisplay;
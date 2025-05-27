// components/VisitorDisplay.tsx (atau file komponen Anda)
"use client";
import { useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { usePathname } from "next/navigation";

const VisitorDisplay = () => {
  const pathname = usePathname();
  const hasTriggeredInitialAction = useRef(false);
  const utils = trpc.useUtils();

  const { data: indexData, isPending: isIndexPending, refetch: refetchIndex } = trpc.visit.getIndexByIp.useQuery(undefined, {
    enabled: pathname === "/",
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const { data: allVisitors, isLoading, refetch } = trpc.visit.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    }
  );

  const createVisitorMutation = trpc.visit.create.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.visit.getAll.invalidate();
        await refetch();
        await refetchIndex();
      }
    },
    onError: (error) => {
      console.warn("Failed to create visitor entry:", error.message);
      refetch();
      refetchIndex();
    },
  });

  useEffect(() => {
    if (pathname === "/" && !hasTriggeredInitialAction.current) {
      const userAgent = navigator.userAgent;
      const url = window.location.href;

      createVisitorMutation.mutate({ userAgent, url });
      hasTriggeredInitialAction.current = true;
    }
    if (pathname !== "/") {
      hasTriggeredInitialAction.current = false;
    }
  }, [pathname, createVisitorMutation, refetch, refetchIndex]); 


  const totalVisitorsCount = allVisitors?.length ?? 0;
  const yourVisitorNumber = indexData?.index !== undefined && indexData.index !== -1
    ? indexData.index + 1
    : null; // Atur ke null jika -1 atau undefined

  return (
    <div className="flex flex-row fixed bottom-0 right-0 lg:m-6 w-fit translate-x-3 md:translate-none items-center gap-2 lg:scale-100 scale-75 z-10">
      <div className="flex flex-col">
        <p className="text-sm text-center">
          Total Visitors:{" "}
          <span className="font-bold text-yellow-500">
            {isLoading ? "Loading..." : totalVisitorsCount}
          </span>
        </p>
        <h1 className="text-lg bg-slate-700 text-white py-1 px-4 rounded-full border border-white font-bold">
          {isIndexPending || isLoading // Menampilkan loading jika salah satu query masih pending
            ? "Calculating..."
            : yourVisitorNumber !== null
              ? `You're visitor #${yourVisitorNumber}`
              : "Visitor Number Unavailable" // Ketika index -1 atau null
          }
        </h1>
      </div>
    </div>
  );
};

export default VisitorDisplay;
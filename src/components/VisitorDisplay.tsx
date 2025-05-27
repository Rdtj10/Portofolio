"use client";
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/utils/trpc";
import { usePathname } from "next/navigation";

const VisitorDisplay = () => {
  const pathname = usePathname();
  const hasCreated = useRef(false);
  const utils = trpc.useUtils();
  const [visitorNumber, setVisitorNumber] = useState<number | null>(null);

  const createVisitor = trpc.visit.create.useMutation({
    onSuccess: async () => {
      const visitors = await utils.visit.getAll.fetch();
      setVisitorNumber(visitors.length);
    },
  });

  const { data: visitor, refetch } = trpc.visit.getAll.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    const tryCreate = async () => {
      if (pathname === "/" && !hasCreated.current) {
        const userAgent = navigator.userAgent;
        const url = window.location.href;

        createVisitor.mutate({ userAgent, url });
        hasCreated.current = true;
      }

      if (pathname === "/") {
        await refetch();
      } else {
        hasCreated.current = false;
        setVisitorNumber(null);
      }
    };

    tryCreate();
  }, [pathname]);

  return (
    <div className="flex flex-row fixed bottom-0 right-0 lg:m-6 w-fit translate-x-3 md:translate-none items-center gap-2 lg:scale-100 scale-75 z-10">
      <div className="flex flex-col">
        <p className="text-sm text-center">
          Total Visitors:{" "}
          <span className="font-bold text-yellow-500">
            {visitor?.length || 0}
          </span>
        </p>
        <h1 className="text-lg bg-slate-700 text-white py-1 px-4 rounded-full border border-white font-bold">
          {visitorNumber !== null
            ? `You're visitor #${visitorNumber}`
            : "Calculating..."}
        </h1>
      </div>
    </div>
  );
};

export default VisitorDisplay;

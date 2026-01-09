"use client";

import { useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const VisitorDisplay = () => {
  const pathname = usePathname();
  const hasTriggeredInitialAction = useRef(false);
  const utils = trpc.useUtils();

  const {
    data: indexData,
    isPending: isIndexPending,
    refetch: refetchIndex,
  } = trpc.visit.getIndexByIp.useQuery(undefined, {
    enabled: pathname === "/",
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const {
    data: allVisitors,
    isLoading,
    refetch,
  } = trpc.visit.getAll.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

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
  const yourVisitorNumber =
    indexData?.index !== undefined && indexData.index !== -1
      ? indexData.index + 1
      : null;

  return (
    <div className="fixed bottom-10 right-10 z-50 pointer-events-none select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        {/* Floating Decorative Petals */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-secondary/10 rounded-full blur-lg animate-float" />

        <div className="paper-card px-10 py-5 flex items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-primary/10 bg-white/60 backdrop-blur-xl relative overflow-hidden group-hover:bg-white/80 transition-all duration-700">
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />

          <div className="flex flex-col gap-1 items-start border-r border-border/30 pr-8">
            <div className="flex items-center gap-3">
              <Icon
                icon="lucide:ghost"
                className="text-secondary text-2xl animate-float"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 font-serif">
                Spirits
              </span>
            </div>
            <span className="text-xl font-black text-secondary leading-none pl-1">
              {isLoading ? "..." : totalVisitorsCount}
            </span>
          </div>

          <div className="flex flex-col gap-1 items-start">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_oklch(var(--primary-params))]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 font-serif">
                Identity
              </span>
            </div>
            <p className="text-sm font-black text-primary font-serif italic leading-none pl-1">
              {isIndexPending || isLoading
                ? "Identifying Spirit..."
                : yourVisitorNumber !== null
                ? `Seeker #${yourVisitorNumber}`
                : "Nomadic Spirit"}
            </p>
          </div>

          {/* Hanging Bell Decor */}
          <div className="absolute top-0 right-4 flex flex-col items-center">
            <div className="w-[1px] h-6 bg-primary/20" />
            <Icon
              icon="lucide:bell"
              className="text-primary/40 text-xs animate-swing"
            />
          </div>
        </div>

        {/* Atmosphere Label */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-primary/40">
            The Meadow is Watching
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default VisitorDisplay;

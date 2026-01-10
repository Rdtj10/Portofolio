"use client";
import { trpc } from "@/utils/trpc";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import StatCard from "./_components/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Page() {
  const { data: visits, isLoading: loadVisits } = trpc.visit.getAll.useQuery();
  const { data: weekStats, isLoading: loadStats } = trpc.visit.getWeeklyStats.useQuery();
  
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;

  const sortedVisits = visits ? [...visits].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [];
  const paginatedData = sortedVisits.slice((page - 1) * pageSize, page * pageSize) || [];
  const totalPages = sortedVisits ? Math.ceil(sortedVisits.length / pageSize) : 1;

  const totalVisitors = visits?.length || 0;
  const thisWeek = weekStats?.[weekStats.length - 1];
  const weeklyCount = thisWeek?.count || 0;
  const dailyAvg = thisWeek?.avgPerDay.toFixed(1) || 0;

  function handlePrev() {
    setPage((prev: number) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setPage((prev: number) => Math.min(prev + 1, totalPages));
  }

  return (
    <section className="w-full h-full p-8 md:p-12 overflow-y-auto bg-gray-50/50">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here&apos;s your site overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loadStats || loadVisits ? (
             Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl bg-white" />
             ))
          ) : (
            <>
              <StatCard 
                title="Total Visitors" 
                value={totalVisitors} 
                icon="solar:users-group-rounded-bold-duotone" 
                trend="+12% from last month"
                trendUp={true}
              />
              <StatCard 
                title="Weekly Hits" 
                value={weeklyCount} 
                icon="solar:chart-2-bold-duotone" 
                trend={`${dailyAvg} avg / day`}
                trendUp={weeklyCount > 0}
              />
               <StatCard 
                title="System Status" 
                value="Active" 
                icon="solar:server-square-bold-duotone" 
                trend="All systems operational"
                trendUp={true}
              />
            </>
          )}
        </div>

        {/* Recent Visitors Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <h2 className="text-lg font-bold flex items-center gap-2">
                <Icon icon="solar:history-bold-duotone" className="text-blue-500" />
                Recent Visitors
             </h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[180px]">IP Address</TableHead>
                  <TableHead className="min-w-[200px]">User Agent</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead className="w-[180px]">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadVisits ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                       <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                       <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                       <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                       <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  paginatedData.map((row: any) => (
                    <TableRow key={row.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-mono text-xs">{row.ip}</TableCell>
                      <TableCell className="max-w-[300px]">
                        <div className="truncate text-xs text-gray-500" title={row.userAgent}>
                          {row.userAgent}
                        </div>
                      </TableCell>
                      <TableCell>
                         <a 
                            href={row.url} 
                            target="_blank" 
                            className="text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md"
                          >
                           {new URL(row.url).pathname}
                         </a>
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {new Date(row.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">
               Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
               <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-30 transition-colors"
               >
                 <Icon icon="solar:alt-arrow-left-linear" />
               </button>
                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-30 transition-colors"
               >
                 <Icon icon="solar:alt-arrow-right-linear" />
               </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

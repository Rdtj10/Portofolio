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
import { Card } from "@/components/ui/card";

export default function Page() {
  const { data } = trpc.visit.getAll.useQuery();
  const { data: visit } = trpc.visit.getWeeklyStats.useQuery();
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const paginatedData =
    data?.slice((page - 1) * pageSize, page * pageSize) || [];
  const totalPages = data ? Math.ceil(data.length / pageSize) : 1;

  function handlePrev() {
    setPage((prev: any) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setPage((prev: any) => Math.min(prev + 1, totalPages));
  }
  return (
    <section className="w-full h-full">
      <div className="flex flex-row gap-4 p-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold">Visitor</h2>
            <div className="flex items-center gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={handlePrev}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          <div className="rounded-lg border shadow-sm overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">IP</TableHead>
                  <TableHead className="min-w-[220px]">User Agent</TableHead>
                  <TableHead className="min-w-[220px]">URL</TableHead>
                  <TableHead className="min-w-[160px]">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.ip}</TableCell>
                    <TableCell
                      className="truncate max-w-[220px]"
                      title={row.userAgent}
                    >
                      {row.userAgent}
                    </TableCell>
                    <TableCell
                      className="truncate max-w-[220px]"
                      title={row.url}
                    >
                      <a
                        href={row.url}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleString()
                        : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {!paginatedData.length && (
              <div className="p-6 text-center text-muted-foreground">
                No visitors found.
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <Card>
            <div>
              <h2>Weekly Visit Stats</h2>
              <ul>
                {visit?.map((item) => (
                  <li key={item.week}>
                    {item.week}: {item.count} visits (avg/day:{" "}
                    {item.avgPerDay.toFixed(2)})
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

import BreadCrumb from "@/components/BreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockGameHistory } from "@/data/data";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useAuthStore } from "@/stores/authStore";

import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

// Route
export const Route = createFileRoute("/game-history")({
  beforeLoad: async () => {
    const { isAuthenticated, loading, fetchMe } = useAuthStore.getState();
    if (loading) {
      await fetchMe();
    }
    if (!isAuthenticated) {
      throw redirect({ to: "/login", replace: true });
    }
  },
  component: GameHistoryPage,
});

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Example: "Sep 25, 2025, 10:30 AM"
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

function GameHistoryPage() {
  const [title, _setTitle] = useState("Game History - LiveJam");

  useDocumentTitle(title);

  return (
    <div className="max-w-lg mx-auto flex flex-col">
      <BreadCrumb route="Game History" />

      <p className="text-xl font-semibold text-secondary">Game History</p>
      <p className="mb-5 mt-2 text-zinc-500 text-start">
        A list of Game History.
      </p>
      <Table className="!rounded border">
        <TableHeader className="bg-foreground border">
          <TableRow>
            <TableHead className="w-[100px] text-secondary">Game</TableHead>
            <TableHead className="text-secondary">Winner</TableHead>
            <TableHead className="text-secondary">Date</TableHead>
            <TableHead className="text-right text-secondary">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockGameHistory.map((data) => (
            <TableRow key={data.date}>
              <TableCell className="py-4 font-bold text-secondary">
                {data.gameName}
              </TableCell>
              <TableCell className="capitalize text-secondary">
                {data.winnerUsername}
              </TableCell>
              <TableCell className="text-secondary">
                {formatDate(data.date)}
              </TableCell>
              <TableCell className="text-right text-secondary">
                {data.winnerAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

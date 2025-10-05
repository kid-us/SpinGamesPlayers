import BreadCrumb from "@/components/BreadCrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { apiKey } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import type { GameHistory } from "@/types/types";

import { createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";

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
  const [history, setHistory] = useState<GameHistory>();
  const [page, setPage] = useState<number>(1);
  const [title, _setTitle] = useState("Game History - LiveJam");
  const { token } = useAuthStore();

  useDocumentTitle(title);

  // Transaction History
  useEffect(() => {
    if (token) {
      axios
        .get(`${apiKey}game-history?page=${page}&limit=10&game_name=wheel`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setHistory(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [token, page]);

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
          {history &&
            history.game &&
            history.game.map((data) => (
              <TableRow key={data.date}>
                <TableCell className={`py-4 font-bold`}>
                  <p
                    className={`${data.sign === "-" ? "bg-red-300" : "bg-green-300"} w-10 text-center ps-2 rounded py-1 text-black`}
                  >
                    {data.sign}
                  </p>
                </TableCell>
                <TableCell className="border overflow-hidden text-secondary">
                  <p className="w-60 text-wrap">{data.reason}</p>
                </TableCell>
                <TableCell className="text-secondary">
                  {formatDate(data.date)}
                </TableCell>
                <TableCell
                  className={`${data.sign === "-" ? "text-red-500" : "text-green-500"} text-right font-semibold`}
                >
                  {data.sign}
                  {data.amount}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination className="mt-5 flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                if (!history?.has_prev) e.preventDefault();
                else setPage(page - 1);
              }}
              className={
                !history?.has_prev
                  ? "pointer-events-none opacity-50 border text-secondary"
                  : "border text-secondary"
              }
              aria-disabled={!history?.has_prev}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink className="border text-secondary">
              {page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                if (!history?.has_next) e.preventDefault();
                else setPage(page + 1);
              }}
              className={
                !history?.has_next
                  ? "pointer-events-none opacity-50 border text-secondary"
                  : "border text-secondary"
              }
              aria-disabled={!history?.has_next}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

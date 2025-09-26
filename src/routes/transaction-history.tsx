import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createFileRoute } from "@tanstack/react-router";
import { formatDate } from "./game-history";
import BreadCrumb from "@/components/BreadCrumb";
import { useEffect, useState } from "react";
import type { TransactionHistory } from "@/types/types";
import { apiKey, token } from "@/services/api";
import axios from "axios";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Minus, Plus } from "lucide-react";

// Route
export const Route = createFileRoute("/transaction-history")({
  component: TransactionHistoryPage,
});

function TransactionHistoryPage() {
  const [page, setPage] = useState<number>(1);
  const [history, setHistory] = useState<TransactionHistory>();

  // Transaction History
  useEffect(() => {
    if (token) {
      axios
        .get(`${apiKey}transaction-history?page=${page}&limit=10`, {
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
    <div className="max-w-lg mx-auto flex flex-col mt-10">
      <BreadCrumb route="Transaction History" />

      <p className="text-xl font-semibold">Transaction History</p>
      <p className="mb-5 mt-2 text-zinc-500 text-start">
        A list of Transaction History.
      </p>
      <Table className="!rounded border">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {history &&
            history.transactions.map((data) => (
              <TableRow key={data.date}>
                <TableCell className={`py-4 font-bold`}>
                  <p
                    className={`${data.sign === "-" ? "bg-red-300" : "bg-green-300"} w-10 text-center ps-2 rounded py-1 text-black`}
                  >
                    {data.sign === "+" ? <Plus /> : <Minus />}
                  </p>
                </TableCell>
                <TableCell className="capitalize border overflow-hidden">
                  <p className="w-60 text-wrap">{data.reason}</p>
                </TableCell>
                <TableCell>{formatDate(data.date)}</TableCell>
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
                !history?.has_prev ? "pointer-events-none opacity-50" : ""
              }
              aria-disabled={!history?.has_prev}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                if (!history?.has_next) e.preventDefault();
                else setPage(page + 1);
              }}
              className={
                !history?.has_next ? "pointer-events-none opacity-50" : ""
              }
              aria-disabled={!history?.has_next}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

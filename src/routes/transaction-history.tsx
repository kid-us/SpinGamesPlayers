import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createFileRoute } from "@tanstack/react-router";
import { formatDate } from "./game-history";
import { mockTxnHistory } from "@/data/data";
import BreadCrumb from "@/components/BreadCrumb";

// Route
export const Route = createFileRoute("/transaction-history")({
  component: TransactionHistoryPage,
});

function TransactionHistoryPage() {
  return (
    <div className="max-w-lg mx-auto flex flex-col md:mt-20 mt-10">
      <BreadCrumb route="Transaction History" />

      <p className="text-xl mb-5 font-semibold">Transaction History</p>
      <Table className="!rounded border">
        <TableCaption>A list of Transaction History.</TableCaption>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockTxnHistory.map((data) => (
            <TableRow key={data.date}>
              <TableCell className="py-4 font-bold">
                {data.sign === "+" ? "Plus" : "Minus"}
              </TableCell>
              <TableCell className="capitalize">{data.reason}</TableCell>
              <TableCell>{formatDate(data.date)}</TableCell>
              <TableCell className="text-right">{data.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

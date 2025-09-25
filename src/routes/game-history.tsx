import BreadCrumb from "@/components/BreadCrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockGameHistory } from "@/data/data";

import { createFileRoute } from "@tanstack/react-router";

// Route
export const Route = createFileRoute("/game-history")({
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
  return (
    <div className="max-w-lg mx-auto flex flex-col md:mt-20 mt-10">
      <BreadCrumb route="Game History" />

      <p className="text-xl mb-5 font-semibold">Game History</p>
      <Table className="!rounded border">
        <TableCaption>A list of Game History.</TableCaption>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="w-[100px]">Game</TableHead>
            <TableHead>Winner</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockGameHistory.map((data) => (
            <TableRow key={data.date}>
              <TableCell className="py-4 font-bold">{data.gameName}</TableCell>
              <TableCell className="capitalize">
                {data.winnerUsername}
              </TableCell>
              <TableCell>{formatDate(data.date)}</TableCell>
              <TableCell className="text-right">{data.winnerAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

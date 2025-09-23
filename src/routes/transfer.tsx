import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transfer")({
  component: TransferPage,
});

function TransferPage() {
  return <div>Hello "/transfer"!</div>;
}

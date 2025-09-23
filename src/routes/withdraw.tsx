import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/withdraw")({
  component: WithdrawPage,
});

function WithdrawPage() {
  return <div>Hello "/Withdraw"!</div>;
}

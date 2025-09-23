import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game-history")({
  component: GameHistoryPage,
});

function GameHistoryPage() {
  return <div>Hello "/game-history"!</div>;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setting")({
  component: SettingPage,
});

function SettingPage() {
  return <div>Hello "/setting"!</div>;
}

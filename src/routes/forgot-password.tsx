import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="">
      <p>Forgot your password?</p>
      <p className="text-zinc-500">
        No problem! Just enter the phone number that you signed up with to reset
        it.
      </p>
    </div>
  );
}

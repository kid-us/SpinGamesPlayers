import useDocumentTitle from "@/hooks/useDocumentTitle";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/$")({
  component: () => <NotFoundPage />,
});

function NotFoundPage() {
  const [title, _setTitle] = useState("Page not Found");

  useDocumentTitle(title);
  return (
    <div className="flex mt-56 flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-secondary">404</h1>
      <p className="text-lg mb-6 text-secondary/50">Oops! Page not found.</p>
      <a href="/" className="text-primary hover:underline">
        Go back home
      </a>
    </div>
  );
}

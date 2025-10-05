import { useLayoutEffect } from "react";

function useDocumentTitle(title: string) {
  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;

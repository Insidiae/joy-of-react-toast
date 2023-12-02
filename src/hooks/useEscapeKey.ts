import React from "react";

export default function useEscapeKey(onEscapeKey: () => void) {
  React.useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onEscapeKey();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onEscapeKey]);
}

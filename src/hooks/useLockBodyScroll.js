import { useLayoutEffect, useState } from "react";

function useLockBodyScroll({ locked }) {
  const [isLocked, setIsLocked] = useState({ locked });

  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isLocked) {
      // Prevent scrolling on mount
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, [isLocked]); // Empty array ensures effect is only run on mount and unmount

  return [setIsLocked];
}

export { useLockBodyScroll };

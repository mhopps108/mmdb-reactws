import { useEffect, useRef, memo } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const el = useRef(null);
  if (!el.current) {
    el.current = document.createElement("div");
  }

  useEffect(() => {
    const mount = document.getElementById("portal-root");
    const { current } = el;
    mount.appendChild(current);
    return () => mount.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

export default memo(Portal);

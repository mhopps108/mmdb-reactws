import { useRef, useEffect, useMemo } from "react";

function useRenderCount(showRenderCount = true) {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  if (showRenderCount) console.log("render: ", renderRef.current);
}

export { useRenderCount };

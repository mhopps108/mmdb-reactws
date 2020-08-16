import React from "react";

// TODO: Fix: React Hook React.useEffect has missing dependencies: 'onIntersect', 'root', 'rootMargin', 'target', and 'threshold'. Either include them or remove the dependency array. Mutable values like 'target.current' aren't valid dependencies because mutating them doesn't re-render the component

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  // threshold = 1.0,
  threshold = 0,
  // rootMargin = "0px",
  rootMargin = "200px",
}) {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current]);
}

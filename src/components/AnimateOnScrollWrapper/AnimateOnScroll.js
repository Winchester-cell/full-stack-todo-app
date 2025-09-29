import { useInView } from "@/Hooks/Animate/useInView";
import React from "react";

export default function AnimateOnScroll({ children, delay = 0 }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform
        ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
      `}
    >
      {children}
    </div>
  );
}

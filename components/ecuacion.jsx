"use client";
import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function Equation({ math, display = true }) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      try {
        katex.render(math, elementRef.current, {
          throwOnError: false,
          displayMode: display,
          output: 'html'
        });
      } catch (e) {
        console.error('KaTeX error:', e);
      }
    }
  }, [math, display]);

  // No renderizamos el texto matemático directamente, solo el div que KaTeX utilizará
  return <div className="katex-container" ref={elementRef} aria-hidden="true" />;
}
import { RefObject, useEffect, useRef, useState } from "react";

type Props = RefObject<HTMLElement | null>;

const useIntersectionObserver = (element: Props) => {
  const [inView, setInView] = useState(false);
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { threshold: 1 }
    )
  );
  useEffect(() => {
    if (!element.current) return;

    observer.current.observe(element.current);
    return () => {
      if (!element.current) return;

      observer.current.unobserve(element.current);
    };
  }, []);

  return [inView, setInView];
};

export default useIntersectionObserver;

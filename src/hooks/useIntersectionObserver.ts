import { useRef } from "react";

type Props = () => void;

const useIntersectionObserver = (callback: Props) => {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = (element: Element | null) => {
    if (!element) return;

    observer.current.observe(element);
  };

  const unobserve = (element: Element | null) => {
    if (!element) return;

    observer.current.unobserve(element);
  };

  return [observe, unobserve];
};

export default useIntersectionObserver;

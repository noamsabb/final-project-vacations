import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Utility function that can be imported and used anywhere
export const scrollToTop = () => {
  window.scrollTo(0, 0);

  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.scrollTo(0, 0);
  }
};

export function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas setiap kali 'pathname' (URL) berubah
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;

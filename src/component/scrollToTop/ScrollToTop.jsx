import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, id]);

  return null;
}
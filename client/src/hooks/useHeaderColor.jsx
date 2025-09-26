import { useEffect, useState } from "react";

const useHeaderColor = () => {
  const [headerColor, setHeaderColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 8) {
        setHeaderColor("#302e2e");
      } else {
        setHeaderColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return headerColor;
};

export default useHeaderColor; 
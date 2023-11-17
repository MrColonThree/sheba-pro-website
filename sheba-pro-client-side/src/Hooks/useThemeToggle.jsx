import { useState, useEffect } from "react";
const useThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDark(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setDark((prevDark) => {
      const newTheme = !prevDark ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return !prevDark;
    });
  };

  return { dark, toggleTheme };
};

export default useThemeToggle;

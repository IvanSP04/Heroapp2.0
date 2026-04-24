import { createContext, useContext, useState, useEffect } from "react";

const HeroContext = createContext();

const API_URL = "https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json";

export function HeroProvider({ children }) {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("superhero-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la API");
        return res.json();
      })
      .then((data) => {
        setHeroes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("superhero-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(hero) {
    setFavorites((prev) => {
      const exists = prev.find((h) => h.id === hero.id);
      if (exists) return prev.filter((h) => h.id !== hero.id);
      return [...prev, hero];
    });
  }

  function isFavorite(heroId) {
    return favorites.some((h) => h.id === heroId);
  }

  return (
    <HeroContext.Provider value={{ heroes, loading, error, favorites, toggleFavorite, isFavorite }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHeroes() {
  return useContext(HeroContext);
}
import { useState, useEffect } from "react";
import { HeroProvider } from "./context/HeroContext";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Original from "./pages/Original";
import Info from "./pages/Info";
import User from "./pages/User";
import "./App.css";

const TABS = [
  { id: "home",      label: "Inicio" },
  { id: "favorites", label: "Favoritos" },
  { id: "original",  label: "Batalla" },
  { id: "info",      label: "Info" },
  { id: "user",      label: "Perfil" },
];

function AppContent() {
  const [tab, setTab] = useState("home");
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (splash) return <SplashScreen />;

  return (
    <>
      <nav className="bottom-nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? "nav-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "home"      && <Home />}
      {tab === "favorites" && <Favorites />}
      {tab === "original"  && <Original />}
      {tab === "info"      && <Info />}
      {tab === "user"      && <User />}
    </>
  );
}

export default function App() {
  return (
    <HeroProvider>
      <AppContent />
    </HeroProvider>
  );
}
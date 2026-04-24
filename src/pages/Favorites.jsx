import { useState } from "react";
import { useHeroes } from "../context/HeroContext";
import HeroRow from "../components/HeroRow";
import HeroDetail from "../components/HeroDetail";

export default function Favorites() {
  const { favorites } = useHeroes();
  const [selected, setSelected] = useState(null);

  if (favorites.length === 0) {
    return (
      <div className="page">
        <div className="home-header">
          <h1>Mis Favoritos</h1>
        </div>
        <div className="empty-msg">
          <p>Aun no tienes favoritos.</p>
          <p>Ve a Inicio y marca cualquier heroe para agregarlo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="home-header">
        <h1>Mis Favoritos</h1>
        <p>{favorites.length} registro{favorites.length !== 1 ? "s" : ""} guardado{favorites.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="heroes-list">
        <div className="heroes-list-header">
          <span>ID</span>
          <span></span>
          <span>SUJETO</span>
          <span>CLASIFICACION</span>
          <span>STATS</span>
          <span></span>
        </div>
        {favorites.map((hero) => (
          <HeroRow key={hero.id} hero={hero} onClick={setSelected} />
        ))}
      </div>

      {selected && <HeroDetail hero={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
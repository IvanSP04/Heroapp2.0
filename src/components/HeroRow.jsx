import { useHeroes } from "../context/HeroContext";

export default function HeroRow({ hero, onClick }) {
  const { toggleFavorite, isFavorite } = useHeroes();
  const fav = isFavorite(hero.id);
  const alignment = hero.biography?.alignment || "neutral";
  const alignColor = alignment === "good" ? "#00ff88" : alignment === "bad" ? "#ff4060" : "#ffd700";
  const alignLabel = alignment === "good" ? "HEROE" : alignment === "bad" ? "VILLANO" : "NEUTRAL";

  function handleFav(e) {
    e.stopPropagation();
    toggleFavorite(hero);
  }

  return (
    <div className="hero-row" onClick={() => onClick(hero)}>
      <span className="hero-row-id">#{String(hero.id).padStart(3, "0")}</span>
      <img
        className="hero-row-img"
        src={hero.images?.sm}
        alt={hero.name}
        onError={(e) => { e.target.src = "https://placehold.co/40x55?text=?"; }}
      />
      <div className="hero-row-info">
        <span className="hero-row-name">{hero.name}</span>
        <span className="hero-row-pub">{hero.biography?.publisher || "Desconocido"}</span>
      </div>
      <span className="hero-row-tag" style={{ borderColor: alignColor, color: alignColor }}>
        {alignLabel}
      </span>
      <div className="hero-row-stats">
        <span title="Fuerza">F:{hero.powerstats?.strength ?? "?"}</span>
        <span title="Inteligencia">I:{hero.powerstats?.intelligence ?? "?"}</span>
        <span title="Velocidad">V:{hero.powerstats?.speed ?? "?"}</span>
      </div>
      <button
        className={`fav-btn ${fav ? "fav-active" : ""}`}
        onClick={handleFav}
        title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {fav ? "♥" : "♡"}
      </button>
    </div>
  );
}
import { useHeroes } from "../context/HeroContext";

const STAT_LABELS = {
  intelligence: "Inteligencia",
  strength: "Fuerza",
  speed: "Velocidad",
  durability: "Durabilidad",
  power: "Poder",
  combat: "Combate",
};

const STAT_COLORS = {
  intelligence: "#818cf8",
  strength: "#f87171",
  speed: "#facc15",
  durability: "#34d399",
  power: "#a78bfa",
  combat: "#fb923c",
};

export default function HeroDetail({ hero, onClose }) {
  const { toggleFavorite, isFavorite } = useHeroes();
  const fav = isFavorite(hero.id);

  if (!hero) return null;

  const stats = hero.powerstats || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <img
            src={hero.images?.lg}
            alt={hero.name}
            className="modal-img"
            onError={(e) => { e.target.src = "https://placehold.co/200x300?text=?"; }}
          />
          <div className="modal-title-block">
            <h2>{hero.name}</h2>
            <p className="detail-fullname">{hero.biography?.fullName}</p>
            <span className={`badge badge-${hero.biography?.alignment}`}>
              {hero.biography?.alignment || "Neutral"}
            </span>
            <p className="detail-publisher">{hero.biography?.publisher}</p>
            <button
              className={`fav-btn-lg ${fav ? "fav-active" : ""}`}
              onClick={() => toggleFavorite(hero)}
            >
              {fav ? "♥ En favoritos" : "♡ Agregar a favoritos"}
            </button>
          </div>
        </div>

        <div className="modal-stats">
          <h4>Estadísticas de poder</h4>
          <div className="stats-grid">
            {Object.entries(stats).map(([key, val]) => (
              <div key={key} className="stat-item">
                <div className="stat-label">{STAT_LABELS[key] || key}</div>
                <div className="stat-bar-wrap">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${val}%`,
                      background: STAT_COLORS[key] || "#888",
                    }}
                  />
                </div>
                <div className="stat-value">{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-info-grid">
          <div className="info-block">
            <h4>Apariencia</h4>
            <p><strong>Género:</strong> {hero.appearance?.gender}</p>
            <p><strong>Raza:</strong> {hero.appearance?.race}</p>
            <p><strong>Altura:</strong> {hero.appearance?.height?.[1]}</p>
            <p><strong>Peso:</strong> {hero.appearance?.weight?.[1]}</p>
            <p><strong>Ojos:</strong> {hero.appearance?.eyeColor}</p>
            <p><strong>Cabello:</strong> {hero.appearance?.hairColor}</p>
          </div>
          <div className="info-block">
            <h4>Biografía</h4>
            <p><strong>Primera aparición:</strong> {hero.biography?.firstAppearance}</p>
            <p><strong>Lugar de nacimiento:</strong> {hero.biography?.placeOfBirth}</p>
            <p><strong>Alias:</strong> {hero.biography?.aliases?.join(", ")}</p>
          </div>
          <div className="info-block">
            <h4>Trabajo y conexiones</h4>
            <p><strong>Ocupación:</strong> {hero.work?.occupation}</p>
            <p><strong>Base:</strong> {hero.work?.base}</p>
            <p><strong>Grupos:</strong> {hero.connections?.groupAffiliation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
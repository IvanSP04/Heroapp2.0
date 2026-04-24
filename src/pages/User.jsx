import { useState } from "react";
import { useHeroes } from "../context/HeroContext";

export default function User() {
  const { favorites, heroes } = useHeroes();
  const [name, setName] = useState(() => localStorage.getItem("user-name") || "");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  function saveName() {
    localStorage.setItem("user-name", draft);
    setName(draft);
    setEditing(false);
  }

  const topHero = favorites.reduce((best, h) => {
    const score = Object.values(h.powerstats || {}).reduce((a, b) => a + (b || 0), 0);
    const bestScore = Object.values(best?.powerstats || {}).reduce((a, b) => a + (b || 0), 0);
    return score > bestScore ? h : best;
  }, null);

  const publisherCount = favorites.reduce((acc, h) => {
    const pub = h.biography?.publisher || "Desconocido";
    acc[pub] = (acc[pub] || 0) + 1;
    return acc;
  }, {});

  const alignmentCount = favorites.reduce((acc, h) => {
    const al = h.biography?.alignment || "neutral";
    acc[al] = (acc[al] || 0) + 1;
    return acc;
  }, {});

  const coveragePercent = heroes.length > 0
    ? ((favorites.length / heroes.length) * 100).toFixed(1)
    : 0;

  return (
    <div className="page">
      <div className="home-header">
        <h1>👤 Mi Perfil</h1>
      </div>

      <div className="user-card">
        <div className="user-avatar">{name ? name[0].toUpperCase() : "?"}</div>
        {editing ? (
          <div className="user-name-edit">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Tu nombre..."
              className="search-input"
              maxLength={30}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
            />
            <button className="battle-btn" onClick={saveName}>Guardar</button>
            <button className="clear-btn" onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        ) : (
          <div className="user-name-display">
            <h2>{name || "Sin nombre"}</h2>
            <button className="clear-btn" onClick={() => { setDraft(name); setEditing(true); }}>
              Editar nombre
            </button>
          </div>
        )}
      </div>

      <div className="user-stats-grid">
        <div className="user-stat-card">
          <div className="user-stat-num">{favorites.length}</div>
          <div className="user-stat-label">Héroes favoritos</div>
        </div>
        <div className="user-stat-card">
          <div className="user-stat-num">{heroes.length}</div>
          <div className="user-stat-label">Héroes en total</div>
        </div>
        <div className="user-stat-card">
          <div className="user-stat-num">{coveragePercent}%</div>
          <div className="user-stat-label">Colección completada</div>
        </div>
        <div className="user-stat-card">
          <div className="user-stat-num">{Object.keys(publisherCount).length}</div>
          <div className="user-stat-label">Editoriales distintas</div>
        </div>
      </div>

      {topHero && (
        <div className="user-top-hero">
          <h3>Tu héroe más poderoso en favoritos</h3>
          <div className="top-hero-row">
            <img
              src={topHero.images?.sm}
              alt={topHero.name}
              onError={(e) => { e.target.src = "https://placehold.co/80x120?text=?"; }}
            />
            <div>
              <strong>{topHero.name}</strong>
              <p>{topHero.biography?.publisher}</p>
              <p>
                Puntuación total:{" "}
                <strong>
                  {Object.values(topHero.powerstats || {}).reduce((a, b) => a + (b || 0), 0)}
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="user-breakdown">
          <div className="breakdown-block">
            <h4>Por editorial</h4>
            {Object.entries(publisherCount).sort((a, b) => b[1] - a[1]).map(([pub, count]) => (
              <div key={pub} className="breakdown-row">
                <span>{pub}</span>
                <div className="breakdown-bar-wrap">
                  <div className="breakdown-bar" style={{ width: `${(count / favorites.length) * 100}%` }} />
                </div>
                <span>{count}</span>
              </div>
            ))}
          </div>

          <div className="breakdown-block">
            <h4>Por alineación</h4>
            {Object.entries(alignmentCount).map(([al, count]) => {
              const colors = { good: "#22c55e", bad: "#ef4444", neutral: "#f59e0b" };
              const labels = { good: "Héroes", bad: "Villanos", neutral: "Neutral" };
              return (
                <div key={al} className="breakdown-row">
                  <span>{labels[al] || al}</span>
                  <div className="breakdown-bar-wrap">
                    <div
                      className="breakdown-bar"
                      style={{ width: `${(count / favorites.length) * 100}%`, background: colors[al] || "#888" }}
                    />
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {favorites.length === 0 && (
        <div className="empty-msg">
          <p>Aún no tienes estadísticas.</p>
          <p>Agrega héroes a favoritos para ver tu perfil completo.</p>
        </div>
      )}
    </div>
  );
}
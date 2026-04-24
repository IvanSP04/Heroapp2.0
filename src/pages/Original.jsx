import { useState, useMemo } from "react";
import { useHeroes } from "../context/HeroContext";

function calcScore(hero) {
  const s = hero.powerstats || {};
  return Object.values(s).reduce((a, b) => a + (b || 0), 0);
}

function StatBar({ label, val1, val2 }) {
  const max = Math.max(val1, val2, 1);
  return (
    <div className="battle-stat-row">
      <span className="battle-stat-val left" style={{ color: val1 >= val2 ? "#22c55e" : "#ef4444" }}>
        {val1}
      </span>
      <div className="battle-stat-bars">
        <div className="battle-bar-wrap left">
          <div className="battle-bar bar-left" style={{ width: `${(val1 / max) * 100}%` }} />
        </div>
        <span className="battle-stat-label">{label}</span>
        <div className="battle-bar-wrap right">
          <div className="battle-bar bar-right" style={{ width: `${(val2 / max) * 100}%` }} />
        </div>
      </div>
      <span className="battle-stat-val right" style={{ color: val2 >= val1 ? "#22c55e" : "#ef4444" }}>
        {val2}
      </span>
    </div>
  );
}

export default function Original() {
  const { heroes } = useHeroes();
  const [hero1Id, setHero1Id] = useState("");
  const [hero2Id, setHero2Id] = useState("");
  const [fought, setFought] = useState(false);

  const hero1 = heroes.find((h) => h.id === Number(hero1Id));
  const hero2 = heroes.find((h) => h.id === Number(hero2Id));

  const result = useMemo(() => {
    if (!fought || !hero1 || !hero2) return null;
    const s1 = calcScore(hero1);
    const s2 = calcScore(hero2);
    if (s1 > s2) return { winner: hero1, loser: hero2, s1, s2 };
    if (s2 > s1) return { winner: hero2, loser: hero1, s1, s2 };
    return { tie: true, s1, s2 };
  }, [fought, hero1, hero2]);

  function handleBattle() {
    if (hero1 && hero2 && hero1Id !== hero2Id) setFought(true);
  }

  function reset() {
    setHero1Id("");
    setHero2Id("");
    setFought(false);
  }

  const stats = ["intelligence", "strength", "speed", "durability", "power", "combat"];
  const statLabels = {
    intelligence: "Inteligencia",
    strength: "Fuerza",
    speed: "Velocidad",
    durability: "Durabilidad",
    power: "Poder",
    combat: "Combate",
  };

  return (
    <div className="page">
      <div className="home-header">
        <h1>⚔️ Simulador de Batalla</h1>
        <p>Elige dos héroes y descubre quién gana según sus estadísticas</p>
      </div>

      <div className="battle-selectors">
        <div className="battle-selector-wrap">
          <label>Héroe 1</label>
          <select value={hero1Id} onChange={(e) => { setHero1Id(e.target.value); setFought(false); }} className="filter-select">
            <option value="">-- Selecciona --</option>
            {heroes.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          {hero1 && (
            <div className="battle-hero-preview">
              <img src={hero1.images?.sm} alt={hero1.name} onError={(e) => { e.target.src = "https://placehold.co/80x120?text=?"; }} />
              <span>{hero1.biography?.publisher}</span>
            </div>
          )}
        </div>

        <div className="vs-divider">VS</div>

        <div className="battle-selector-wrap">
          <label>Héroe 2</label>
          <select value={hero2Id} onChange={(e) => { setHero2Id(e.target.value); setFought(false); }} className="filter-select">
            <option value="">-- Selecciona --</option>
            {heroes.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          {hero2 && (
            <div className="battle-hero-preview">
              <img src={hero2.images?.sm} alt={hero2.name} onError={(e) => { e.target.src = "https://placehold.co/80x120?text=?"; }} />
              <span>{hero2.biography?.publisher}</span>
            </div>
          )}
        </div>
      </div>

      {hero1Id && hero2Id && hero1Id !== hero2Id && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button className="battle-btn" onClick={handleBattle}>Iniciar batalla</button>
          <button className="clear-btn" onClick={reset} style={{ marginLeft: "0.5rem" }}>Reiniciar</button>
        </div>
      )}

      {hero1Id === hero2Id && hero1Id !== "" && (
        <p className="error-msg">Selecciona dos héroes diferentes.</p>
      )}

      {result && hero1 && hero2 && (
        <div className="battle-result">
          {result.tie ? (
            <div className="winner-banner tie">Empate — {result.s1} pts cada uno</div>
          ) : (
            <div className="winner-banner">
              Ganador: <strong>{result.winner.name}</strong>
              <span>({result.s1} vs {result.s2} pts)</span>
            </div>
          )}

          <div className="battle-stats-table">
            {stats.map((key) => (
              <StatBar
                key={key}
                label={statLabels[key]}
                val1={hero1.powerstats?.[key] ?? 0}
                val2={hero2.powerstats?.[key] ?? 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
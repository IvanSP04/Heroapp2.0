import { useState, useMemo } from "react";
import { useHeroes } from "../context/HeroContext";
import HeroRow from "../components/HeroRow";
import HeroDetail from "../components/HeroDetail";

const PUBLISHERS = ["Todos", "Marvel Comics", "DC Comics", "Dark Horse Comics", "NBC - Heroes", "Image Comics"];
const ALIGNMENTS = ["Todos", "good", "bad", "neutral"];

export default function Home() {
  const { heroes, loading, error } = useHeroes();
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("Todos");
  const [alignment, setAlignment] = useState("Todos");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return heroes.filter((h) => {
      const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
      const matchPub = publisher === "Todos" || h.biography?.publisher === publisher;
      const matchAlign = alignment === "Todos" || h.biography?.alignment === alignment;
      return matchSearch && matchPub && matchAlign;
    });
  }, [heroes, search, publisher, alignment]);

  if (loading) return <div className="loading-screen">Cargando heroes...</div>;
  if (error) return <div className="error-msg">Error: {error}</div>;

  return (
    <div className="page">
      <div className="home-header">
        <h1>Enciclopedia de Superheroes</h1>
        <p>{filtered.length} registros encontrados</p>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Buscar heroe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={publisher} onChange={(e) => setPublisher(e.target.value)} className="filter-select">
          {PUBLISHERS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={alignment} onChange={(e) => setAlignment(e.target.value)} className="filter-select">
          {ALIGNMENTS.map((a) => (
            <option key={a} value={a}>
              {a === "Todos" ? "Todos" : a === "good" ? "Heroes" : a === "bad" ? "Villanos" : "Neutral"}
            </option>
          ))}
        </select>
        {(search || publisher !== "Todos" || alignment !== "Todos") && (
          <button className="clear-btn" onClick={() => { setSearch(""); setPublisher("Todos"); setAlignment("Todos"); }}>
            Limpiar
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-msg">No se encontraron registros.</div>
      ) : (
        <div className="heroes-list">
          <div className="heroes-list-header">
            <span>ID</span>
            <span></span>
            <span>SUJETO</span>
            <span>CLASIFICACION</span>
            <span>STATS</span>
            <span></span>
          </div>
          {filtered.map((hero) => (
            <HeroRow key={hero.id} hero={hero} onClick={setSelected} />
          ))}
        </div>
      )}

      {selected && <HeroDetail hero={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
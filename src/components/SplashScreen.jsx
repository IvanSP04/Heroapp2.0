export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-icon">🦸</div>
        <h1 className="splash-title">SuperHeroes DB</h1>
        <p className="splash-subtitle">Cargando el universo...</p>
        <div className="splash-loader">
          <div className="splash-bar" />
        </div>
      </div>
    </div>
  );
}
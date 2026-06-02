import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <img
          src="/logo.png"
          alt="Eat in Elsa — Great Food. Minutes Away."
          className="hero-logo-gold"
        />
        <p className="hero-support">
          Visiting for a tournament? Find the best local spots just around the corner.
        </p>
        <div className="hero-actions">
          <a href="#quick-picks" className="btn-primary">Find Food Now</a>
          <a href="#map" className="btn-outline-white">View Map</a>
        </div>
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FFFFFF"/>
        </svg>
      </div>
    </section>
  )
}

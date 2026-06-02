import './BottomCTA.css'

export default function BottomCTA() {
  return (
    <section className="cta-section">
      <div className="cta-inner section">
        <h2 className="cta-title">Stay. Eat. Enjoy <span>Elsa.</span></h2>
        <p className="cta-support">Support local businesses while you're in town.</p>
        <div className="cta-actions">
          <a href="#quick-picks" className="btn-primary">Explore All Locations</a>
          <a href="#map" className="btn-outline-white">View Map</a>
        </div>
      </div>
    </section>
  )
}

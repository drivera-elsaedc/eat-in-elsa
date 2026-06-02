import restaurants from '../data/restaurants.json'
import './QuickPicks.css'

// Show locals first, then chains, limit to 6
const featured = [
  ...restaurants.filter(r => r.isLocal),
  ...restaurants.filter(r => !r.isLocal),
].slice(0, 6)

export default function QuickPicks() {
  return (
    <section className="section" id="quick-picks">
      <h2 className="section-title">Hungry Right Now?</h2>
      <p className="section-desc">Most popular spots near the fields.</p>
      <div className="picks-grid">
        {featured.map(r => (
          <div className="pick-card card" key={r.id}>
            <div className="pick-photo-placeholder">
              <span className="pick-emoji">{typeEmoji(r.type)}</span>
            </div>
            <div className="pick-body">
              <div className="pick-meta">
                <span className="pick-type">{r.type}</span>
                <span className="pick-distance">📍 {r.distance}</span>
              </div>
              <h3 className="pick-name">{r.name}</h3>
              <div className="pick-tags">
                {r.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <a
                href={r.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary pick-btn"
              >
                Get Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function typeEmoji(type) {
  const map = {
    'Mexican': '🌮', 'Tacos & Mexican': '🌮', 'Tex-Mex': '🌯',
    'Burgers': '🍔', 'Burgers & Fast Food': '🍔', 'Burgers & Drinks': '🍔',
    'Burgers & Tacos': '🍔', 'Ice Cream & Burgers': '🍦',
    'Pizza': '🍕', 'Fried Chicken': '🍗', 'Wings': '🍖',
    'Mexican & Seafood': '🦐', 'Seafood & Latin': '🐟',
    'Breakfast & Cafe': '☕', 'Coffee & Drinks': '☕',
    'Boba & Drinks': '🧋', 'Shaved Ice & Sweets': '🍧',
  }
  return map[type] ?? '🍽️'
}

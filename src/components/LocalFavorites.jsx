import restaurants from '../data/restaurants.json'
import './LocalFavorites.css'

const favorites = restaurants.filter(r => r.isLocal === true)

export default function LocalFavorites() {
  return (
    <section className="section" id="favorites">
      <h2 className="section-title">Local Favorites</h2>
      <p className="section-desc">Discover the spots locals love.</p>
      <div className="favorites-list">
        {favorites.map(r => (
          <div className="fav-card card" key={r.id}>
            <div className="fav-accent" />
            <div className="fav-body">
              <div className="fav-header">
                <div>
                  <span className="fav-type">{r.type}</span>
                  <h3 className="fav-name">{r.name}</h3>
                </div>
                <span className="fav-distance">📍 {r.distance}</span>
              </div>
              <p className="fav-desc">{r.description}</p>
              <div className="fav-love">
                <span className="fav-love-label">Why locals love it</span>
                <p className="fav-love-text">"{r.whyLocalsLoveIt}"</p>
              </div>
              <a
                href={r.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary fav-btn"
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

import restaurants from '../data/restaurants.json'
import './TeamFriendly.css'

const teamSpots = restaurants.filter(r => r.largeGroup)

export default function TeamFriendly() {
  return (
    <section className="team-section" id="team-spots">
      <div className="section">
        <h2 className="section-title">Feeding a Team?</h2>
        <p className="section-desc">These spots are ready for large groups.</p>
        <div className="team-grid">
          {teamSpots.map(r => (
            <a
              key={r.id}
              href={r.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card card"
            >
              <div className="team-icon">👥</div>
              <div className="team-info">
                <h3 className="team-name">{r.name}</h3>
                <p className="team-type">{r.type} · {r.distance}</p>
                <div className="team-tags">
                  {r.tags.map(t => (
                    <span key={t} className="tag tag-green">{t}</span>
                  ))}
                </div>
              </div>
              <span className="team-arrow">→</span>
            </a>
          ))}
        </div>
        <div className="team-tip">
          <span>💡</span>
          <p>Call ahead for groups of 15+ — most restaurants can reserve space with notice.</p>
        </div>
      </div>
    </section>
  )
}

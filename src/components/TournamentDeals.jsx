import deals from '../data/deals.json'
import './TournamentDeals.css'

export default function TournamentDeals() {
  return (
    <section className="deals-section" id="deals">
      <div className="deals-inner section">
        <h2 className="section-title" style={{ color: '#fff' }}>Tournament Specials</h2>
        <p className="section-desc" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Exclusive deals for visiting teams and families.
        </p>
        <div className="deals-grid">
          {deals.map(d => (
            <div className="deal-card" key={d.id}>
              <div className="deal-emoji">{d.emoji}</div>
              <div className="deal-body">
                <p className="deal-restaurant">{d.restaurant}</p>
                <p className="deal-offer">{d.deal}</p>
                <div className="deal-footer">
                  <span className="deal-valid">⏰ {d.validThrough}</span>
                  <span className="deal-show">{d.showNote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

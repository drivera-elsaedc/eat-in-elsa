import './MapSection.css'

export default function MapSection() {
  const mapsSearchUrl = 'https://maps.google.com/?q=restaurants+near+Elsa+TX+78543'

  return (
    <section className="section" id="map">
      <h2 className="section-title">Find It Fast</h2>
      <p className="section-desc">All locations within minutes of the fields.</p>
      <div className="map-container">
        <iframe
          title="Restaurants near Elsa TX"
          src="https://maps.google.com/maps?q=restaurants+near+Elsa+TX+78543&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={mapsSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary map-open-btn"
      >
        Open in Google Maps
      </a>
    </section>
  )
}

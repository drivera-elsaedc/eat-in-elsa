import { useState } from 'react'
import restaurants from '../data/restaurants.json'
import './FoodByType.css'

const categories = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'tacos', label: 'Tacos', emoji: '🌮' },
  { id: 'burgers', label: 'Burgers', emoji: '🍔' },
  { id: 'family', label: 'Family Dining', emoji: '👨‍👩‍👧‍👦' },
  { id: 'quickbites', label: 'Quick Bites', emoji: '⚡' },
  { id: 'desserts', label: 'Desserts', emoji: '🍦' },
]

export default function FoodByType() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? restaurants
    : restaurants.filter(r => r.categories.includes(active))

  return (
    <section className="section fbt-section" id="by-type">
      <h2 className="section-title">What Are You Craving?</h2>
      <p className="section-desc">Browse by food type.</p>

      <div className="fbt-tabs" role="tablist">
        {categories.map(c => (
          <button
            key={c.id}
            className={`fbt-tab ${active === c.id ? 'fbt-tab--active' : ''}`}
            onClick={() => setActive(c.id)}
            role="tab"
            aria-selected={active === c.id}
          >
            <span>{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      <div className="fbt-results">
        {filtered.map(r => (
          <a
            key={r.id}
            href={r.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fbt-row card"
          >
            <div className="fbt-row-info">
              <span className="fbt-row-name">{r.name}</span>
              <span className="fbt-row-type">{r.type} · {r.distance}</span>
            </div>
            <span className="fbt-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}

import { useState } from 'react'
import deals from '../data/deals.json'
import './HomeRunDerby.css'

const PITCHES = [
  { id: 'fastball', label: 'Fastball', emoji: '🔥', mph: '96 MPH', desc: 'Pure heat. Straight in.' },
  { id: 'slider',   label: 'Slider',   emoji: '🌀', mph: '87 MPH', desc: 'Breaks late, outside corner.' },
  { id: 'curveball',label: 'Curveball',emoji: '🪝', mph: '78 MPH', desc: '12-to-6 drop. Knee to nose.' },
]

const INITIAL_SWINGS = 3
const BONUS_SWINGS   = 3
const MAX_SWINGS     = 9
const IG_HANDLE      = 'eatinelsa'

function loadState() {
  try {
    const today = new Date().toDateString()
    if (localStorage.getItem('hrd_date') !== today) {
      localStorage.setItem('hrd_date', today)
      localStorage.setItem('hrd_swings', String(INITIAL_SWINGS))
      localStorage.removeItem('hrd_ig')
      localStorage.removeItem('hrd_share')
    }
    return {
      swings:    parseInt(localStorage.getItem('hrd_swings') ?? INITIAL_SWINGS),
      igDone:    localStorage.getItem('hrd_ig')    === '1',
      shareDone: localStorage.getItem('hrd_share') === '1',
    }
  } catch {
    return { swings: INITIAL_SWINGS, igDone: false, shareDone: false }
  }
}
function saveSwings(n) { try { localStorage.setItem('hrd_swings', String(n)) } catch {} }

export default function PitchGame() {
  const init = loadState()
  const [swings,    setSwings]    = useState(init.swings)
  const [phase,     setPhase]     = useState('picking')  // picking | revealing | hit | miss | empty
  const [chosen,    setChosen]    = useState(null)       // pitch id the user picked
  const [actual,    setActual]    = useState(null)       // pitch id that was thrown
  const [deal,      setDeal]      = useState(null)
  const [igDone,    setIgDone]    = useState(init.igDone)
  const [shareDone, setShareDone] = useState(init.shareDone)

  function pick(pitchId) {
    if (phase !== 'picking') return

    const thrownIdx = Math.floor(Math.random() * PITCHES.length)
    const thrown    = PITCHES[thrownIdx].id
    const correct   = pitchId === thrown
    const next      = swings - 1

    setChosen(pitchId)
    setActual(thrown)
    setSwings(next)
    saveSwings(next)
    setPhase('revealing')

    setTimeout(() => {
      if (correct) {
        const d = deals[Math.floor(Math.random() * deals.length)]
        setDeal(d)
        setPhase('hit')
      } else {
        setPhase('miss')
      }
    }, 1200)
  }

  function reset() {
    setChosen(null)
    setActual(null)
    setDeal(null)
    setPhase(swings > 0 ? 'picking' : 'empty')
  }

  function unlockIG() {
    window.open(`https://instagram.com/${IG_HANDLE}`, '_blank')
    setTimeout(() => {
      const next = Math.min(swings + BONUS_SWINGS, MAX_SWINGS)
      setSwings(next); saveSwings(next)
      setIgDone(true)
      try { localStorage.setItem('hrd_ig', '1') } catch {}
      setPhase('picking')
    }, 900)
  }

  async function unlockShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Eat in Elsa ⚾', text: 'Read the pitch, win a food deal!', url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
      }
      const next = Math.min(swings + BONUS_SWINGS, MAX_SWINGS)
      setSwings(next); saveSwings(next)
      setShareDone(true)
      try { localStorage.setItem('hrd_share', '1') } catch {}
      setPhase('picking')
    } catch { /* cancelled */ }
  }

  return (
    <section className="pitch-section" id="pitch-game">

      {/* Header */}
      <div className="pitch-header">
        <div className="pitch-eyebrow">⚾ EAT IN ELSA</div>
        <h2 className="pitch-title">Read the Pitch</h2>
        <p className="pitch-sub">Guess the pitch. Hit a homer. Win a deal.</p>
      </div>

      {/* Swing counter */}
      <div className="pitch-counter">
        <div className="pitch-dots">
          {Array.from({ length: MAX_SWINGS }).map((_, i) => (
            <span key={i} className={`pitch-dot ${i < swings ? 'pitch-dot--on' : ''}`} />
          ))}
        </div>
        <span className="pitch-dot-label">{swings} at-bat{swings !== 1 ? 's' : ''} left</span>
      </div>

      {/* Pitcher prompt */}
      {phase === 'picking' && (
        <p className="pitch-prompt">What's the pitcher throwing?</p>
      )}
      {phase === 'revealing' && (
        <p className="pitch-prompt pitch-prompt--winding">Pitcher winds up…</p>
      )}
      {phase === 'hit' && (
        <p className="pitch-prompt pitch-prompt--hit">You read it! 🎉</p>
      )}
      {phase === 'miss' && (
        <p className="pitch-prompt pitch-prompt--miss">Swing and a miss.</p>
      )}

      {/* Pitch cards */}
      {(phase === 'picking' || phase === 'revealing' || phase === 'hit' || phase === 'miss') && (
        <div className="pitch-cards">
          {PITCHES.map(p => {
            const isChosen  = chosen  === p.id
            const isActual  = actual  === p.id
            const revealed  = phase === 'hit' || phase === 'miss' || phase === 'revealing'
            const isCorrect = revealed && isActual
            const isWrong   = revealed && isChosen && !isActual

            return (
              <button
                key={p.id}
                className={[
                  'pitch-card',
                  phase === 'picking'            ? 'pitch-card--active'   : '',
                  isChosen && phase === 'revealing' ? 'pitch-card--chosen' : '',
                  isCorrect                      ? 'pitch-card--correct'  : '',
                  isWrong                        ? 'pitch-card--wrong'    : '',
                  revealed && !isCorrect && !isChosen ? 'pitch-card--dim' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => pick(p.id)}
                disabled={phase !== 'picking'}
              >
                <span className="pitch-card-emoji">{p.emoji}</span>
                <span className="pitch-card-label">{p.label}</span>
                <span className="pitch-card-mph">{p.mph}</span>
                <span className="pitch-card-desc">{p.desc}</span>
                {isCorrect && phase !== 'revealing' && (
                  <span className="pitch-card-badge">
                    {isChosen ? '✓ You got it!' : 'This was it'}
                  </span>
                )}
                {isWrong && <span className="pitch-card-badge pitch-card-badge--wrong">✕ Your pick</span>}
              </button>
            )
          })}
        </div>
      )}

      {/* Hit — deal reveal */}
      {phase === 'hit' && deal && (
        <div className="deal-reveal">
          <div className="deal-reveal-top">
            <span className="deal-homerun-label">HOME RUN! 🏆</span>
            <span className="deal-restaurant">{deal.restaurant}</span>
          </div>
          <span className="deal-big-emoji">{deal.emoji}</span>
          <p className="deal-offer">{deal.deal}</p>
          <p className="deal-valid">⏰ {deal.validThrough}</p>
          <div className="deal-show">📱 {deal.showNote}</div>
          <div className="deal-actions">
            <a href="#map" className="btn-primary">Get Directions</a>
            {swings > 0
              ? <button className="btn-secondary" onClick={reset}>Pitch Again</button>
              : <button className="btn-secondary" onClick={reset}>Unlock More</button>
            }
          </div>
        </div>
      )}

      {/* Miss — try again */}
      {phase === 'miss' && (
        <div className="miss-panel">
          <p className="miss-text">
            That was a <strong>{PITCHES.find(p => p.actual === actual || p.id === actual)?.label}</strong>.
          </p>
          {swings > 0
            ? <button className="pitch-again-btn" onClick={reset}>Try Again →</button>
            : <button className="pitch-again-btn" onClick={reset}>Unlock More →</button>
          }
        </div>
      )}

      {/* Empty — unlock screen */}
      {phase === 'empty' && (
        <div className="unlock-panel">
          <p className="unlock-title">Out of at-bats.</p>
          <p className="unlock-sub">Unlock more to keep playing:</p>
          <div className="unlock-opts">
            {!igDone && (
              <button className="unlock-btn" onClick={unlockIG}>
                <span>📸</span>
                <span>
                  <strong>Follow @EatInElsa on Instagram</strong>
                  <small>+{BONUS_SWINGS} at-bats</small>
                </span>
              </button>
            )}
            {!shareDone && (
              <button className="unlock-btn" onClick={unlockShare}>
                <span>📤</span>
                <span>
                  <strong>Share with your team</strong>
                  <small>+{BONUS_SWINGS} at-bats</small>
                </span>
              </button>
            )}
            {igDone && shareDone && (
              <p className="unlock-done">🏆 Max at-bats reached. Come back tomorrow!</p>
            )}
          </div>
        </div>
      )}

    </section>
  )
}

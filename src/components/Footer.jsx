import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Eat in Elsa</span>
          <p className="footer-tagline">Powered by the Elsa EDC</p>
        </div>
        <nav className="footer-nav">
          <a href="#quick-picks">Find Food</a>
          <a href="#deals">Deals</a>
          <a href="#favorites">Favorites</a>
          <a href="#map">Map</a>
          <a href="#team-spots">Group Dining</a>
        </nav>
        <div className="footer-bottom">
          <a href="mailto:info@elsaedc.com" className="footer-add-biz">
            + Add Your Business
          </a>
          <p className="footer-copy">© {new Date().getFullYear()} City of Elsa, Texas</p>
        </div>
      </div>
    </footer>
  )
}

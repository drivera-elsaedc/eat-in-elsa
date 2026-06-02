import Hero from './components/Hero'
import QuickPicks from './components/QuickPicks'
import LocalFavorites from './components/LocalFavorites'
import FoodByType from './components/FoodByType'
import MapSection from './components/MapSection'
import TeamFriendly from './components/TeamFriendly'
import BottomCTA from './components/BottomCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <main>
      <Hero />
      <QuickPicks />
      <LocalFavorites />
      <FoodByType />
      <MapSection />
      <TeamFriendly />
      <BottomCTA />
      <Footer />
    </main>
  )
}

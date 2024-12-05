
import './App.css'
import { FeaturesSection, Footer, Header, HeroSection, PricingSection, TestimonialsSection } from './components/Header'

function App() {

  return (
    <>
    <div className='w-full'>

      <Header/>
      <HeroSection/>
      <FeaturesSection/>
      <PricingSection/>
      <TestimonialsSection/>
      <Footer/>
    </div>

    </>
  )
}

export default App

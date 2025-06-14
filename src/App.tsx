import Hero from './components/client/Hero'
import About from './components/client/About'
import Skills from './components/client/Skills'
import Projects from './components/client/Projects'
import Blog from './components/client/Blog'
import Contact from './components/client/Contact'
import CTA from './components/client/CTA'
import Footer from './components/client/Footer'
// import BottomNav from './components/client/BottomNav'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
      <CTA />
      <Footer />
      {/* <BottomNav /> */}
    </div>
  )
}

export default App

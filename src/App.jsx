import { useState, useEffect } from 'react'
import API_BASE_URL from './config/api'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticlesBackground from './components/ParticlesBackground'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)

  // Debug: Log API_BASE_URL on mount
  useEffect(() => {
    console.log('🔗 App mounted - API_BASE_URL:', API_BASE_URL);
    window.API_BASE_URL = API_BASE_URL; // Make it globally available
  }, [])

  // Check if admin page is requested
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash
      if (hash === '#admin' || hash === '#/admin') {
        setShowAdmin(true)
      } else {
        setShowAdmin(false)
      }
    }

    // Check on mount
    checkHash()

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-fade-in')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    })

    // Observe all fade-up and fade-left elements
    document.querySelectorAll('.fade-up, .fade-left, .project-card, .skill-box, .contact-card, .education-item').forEach(element => {
      observer.observe(element)
    })

    // Also observe sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {showAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          <ParticlesBackground />
          <Navigation />
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default App

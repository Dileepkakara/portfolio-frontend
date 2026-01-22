import { useState, useEffect } from 'react'

const Navigation = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      document.body.classList.add('light-mode')
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    document.body.classList.toggle('light-mode')
    const isLight = document.body.classList.contains('light-mode')
    setTheme(isLight ? 'light' : 'dark')
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
  }

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive)
  }

  const closeMenu = () => {
    setIsMenuActive(false)
  }

  return (
    <nav>
      <div className="nav-container">
        <a href="#home" className="logo">DK</a>
        
        <div className={`nav-links ${isMenuActive ? 'active' : ''}`} id="navLinks">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#portfolio" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="#admin" className="admin-link" onClick={closeMenu}>Admin</a>
          <button className="theme-toggle" id="themeToggle" onClick={toggleTheme}>
            <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
          </button>
        </div>

        <button className="hamburger" id="hamburger" onClick={toggleMenu}>
          <i className={`fas fa-${isMenuActive ? 'times' : 'bars'}`}></i>
        </button>
      </div>
    </nav>
  )
}

export default Navigation

import { useState, useEffect } from 'react'

const Hero = () => {
  const [text, setText] = useState('')
  const [professions] = useState(['CSE Undergraduate', 'Web Developer', 'Programmer'])
  const [currentProfession, setCurrentProfession] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150
    const pauseSpeed = 2000

    const timeout = setTimeout(() => {
      const currentText = professions[currentProfession]
      
      if (!isDeleting && charIndex < currentText.length) {
        setText(currentText.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setText(currentText.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseSpeed)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setCurrentProfession((prev) => (prev + 1) % professions.length)
      }
    }, isDeleting ? 50 : (charIndex === professions[currentProfession].length ? pauseSpeed : 150))

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentProfession, professions])

  return (
    <section className="hero" id="home">
      <div className="section-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hi, I'm <span>Dileep Kakara</span></h1>
            <h2 className="typewriter">{text}<span style={{opacity: 1}}>|</span></h2>
            <p>I'm a passionate computer science student with skills in web development and programming. Currently pursuing my B-Tech at Vignan's Engineering College.</p>
            <div className="hero-btns">
              <a href="#portfolio" className="btn btn-primary glow">
                <i className="fas fa-eye"></i> View My Work
              </a>
              <a href="#contact" className="btn btn-outline">
                <i className="fas fa-paper-plane"></i> Contact Me
              </a>
            </div>
            <div className="skills">
              <span className="skill"><i className="fab fa-html5"></i> HTML5</span>
              <span className="skill"><i className="fab fa-css3-alt"></i> CSS3</span>
              <span className="skill"><i className="fab fa-js"></i> JavaScript</span>
              <span className="skill"><i className="fab fa-react"></i> React</span>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-container float">
              <img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Developer working" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

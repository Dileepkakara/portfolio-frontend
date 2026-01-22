import { useState } from 'react'
import API_BASE_URL from '../config/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to send message')

      const data = await response.json()
      setSuccessMessage(`Thank you, ${formData.name}! Your message has been sent successfully. I'll get back to you soon at ${formData.email}.`)
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again.')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact">
      <div className="section-container">
        <div className="section-title fade-up">
          <h2>Contact Me</h2>
          <p>Get in touch for collaborations or just to say hello!</p>
        </div>

        <div className="contact-container">
          <div className="contact-form fade-left">
            <h3>Send Me a Message</h3>
            {successMessage && <div className="success-message" style={{background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '4px', marginBottom: '1rem'}}>{successMessage}</div>}
            {errorMessage && <div className="error-message" style={{background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '4px', marginBottom: '1rem'}}>{errorMessage}</div>}
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <i className="fas fa-user"></i>
                <input type="text" className="form-control" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <i className="fas fa-envelope"></i>
                <input type="email" className="form-control" id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <i className="fas fa-phone"></i>
                <input type="tel" className="form-control" id="phone" placeholder="Your Phone (optional)" value={formData.phone} onChange={handleChange} disabled={loading} />
              </div>
              <div className="form-group">
                <i className="fas fa-comment"></i>
                <textarea className="form-control" id="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required disabled={loading}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={loading}>
                <i className="fas fa-paper-plane"></i> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-info fade-left" style={{animationDelay: '0.2s'}}>
            <h3>Contact Information</h3>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>Visakhapatnam, India</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>dileepkakara@gmail.com</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>+91 9182681959</p>
              </div>
            </div>

            <div className="social-cards">
              <a href="https://www.linkedin.com/in/dileep-kakara-20a45b294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-card">
                <div className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div className="social-text">
                  <h5>LinkedIn</h5>
                  <p>Connect professionally</p>
                </div>
              </a>

              <a href="https://github.com/kakaradileep" className="social-card">
                <div className="social-icon">
                  <i className="fab fa-github"></i>
                </div>
                <div className="social-text">
                  <h5>GitHub</h5>
                  <p>View my projects</p>
                </div>
              </a>

              <a href="#" className="social-card">
                <div className="social-icon">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="social-text">
                  <h5>Twitter</h5>
                  <p>Follow for updates</p>
                </div>
              </a>

              <a href="https://www.instagram.com/dileep._kakara" className="social-card">
                <div className="social-icon">
                  <i className="fab fa-instagram"></i>
                </div>
                <div className="social-text">
                  <h5>Instagram</h5>
                  <p>Personal life</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

import { useState, useEffect } from 'react'
import API_BASE_URL from '../config/api'

const About = () => {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch about section from backend
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about`)
        const data = await response.json()
        setAbout(data)
      } catch (error) {
        console.error('Error fetching about:', error)
        setAbout(null)
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  // Default demo data
  const defaultProfilePhoto = 'https://res.cloudinary.com/dpzgo1w9j/image/upload/v1740667299/1740230734075_jbkbcn.jpg'
  const defaultDateOfBirth = '20/09/2003'
  const defaultPhone = '+91 9182681959'
  const defaultLocation = 'Visakhapatnam, India'
  const defaultEducation = 'B-Tech in Computer Science Engineering'
  const defaultCvLink = 'https://drive.google.com/file/d/1tgsOdNs7RF-Nu3fuIScIj4SzX_jufCht/view?usp=drivesdk'

  const profilePhoto = about?.profilePhoto || defaultProfilePhoto
  const dateOfBirth = about?.dateOfBirth || defaultDateOfBirth
  const phone = about?.phone || defaultPhone
  const location = about?.location || defaultLocation
  const education = about?.education || defaultEducation
  const cvLink = about?.cvLink || defaultCvLink
  const bioText = about?.text

  return (
    <section id="about">
      <div className="section-container">
        <div className="section-title fade-up">
          <h2>About Me</h2>
          <p>Get to know more about my education and background</p>
        </div>
        <div className="about-content">
          <div className="about-image fade-left">
            <div className="profile-image-container float">
              <img src={profilePhoto} alt="Dileep Kakara" />
            </div>
          </div>
          <div className="about-text fade-left" style={{animationDelay: '0.2s'}}>
            {loading ? (
              <p>Loading about section...</p>
            ) : bioText ? (
              <div className="personal-details-container fade-left" style={{animationDelay: '0.3s'}}>
                <h3>Bio</h3>
                <p>{bioText}</p>
              </div>
            ) : (
              <div className="personal-details-container fade-left" style={{animationDelay: '0.3s'}}>
                <h3>Personal Details</h3>
                <div className="personal-details">
                  <p><i className="fas fa-birthday-cake"></i> <strong>Date of Birth:</strong> {dateOfBirth}</p>
                  <p><i className="fas fa-phone"></i> <strong>Phone:</strong> {phone}</p>
                  <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {location}</p>
                  <p><i className="fas fa-graduation-cap"></i> <strong>Education:</strong> {education}</p>
                </div>
              </div>
            )}

            <div className="education-container fade-left" style={{animationDelay: '0.4s'}}>
              <h3><i className="fas fa-university"></i> Education</h3>
              <div className="education-section">
                <div className="education-item">
                  <h4><i className="fas fa-graduation-cap"></i> B-Tech in Computer Science Engineering</h4>
                  <p className="institution">Vignan's Engineering College</p>
                  <p className="duration">2022 - 2026</p>
                  <p className="grade">CGPA: 7.56</p>
                </div>

                <div className="education-item">
                  <h4><i className="fas fa-certificate"></i> Diploma</h4>
                  <p className="institution">Gonna Engineering College | State Board of Technical Education</p>
                  <p className="duration">2020 - 2022</p>
                  <p className="grade">CGPA: 7.28</p>
                </div>

                <div className="education-item">
                  <h4><i className="fas fa-school"></i> School</h4>
                  <p className="institution">SBVN School</p>
                  <p className="duration">2019</p>
                  <p className="grade">CGPA: 8.2</p>
                </div>
              </div>
            </div>

            <a href={cvLink} className="btn btn-primary fade-left" style={{marginTop: '2rem', animationDelay: '0.5s'}}>
              <i className="fas fa-download"></i> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

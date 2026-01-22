import { useState, useEffect } from 'react'
import API_BASE_URL from '../config/api'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  // Default skills (fallback if database is empty)
  const defaultSkills = [
    { _id: 1, name: 'HTML5', icon: 'fab fa-html5' },
    { _id: 2, name: 'CSS3', icon: 'fab fa-css3-alt' },
    { _id: 3, name: 'JavaScript', icon: 'fab fa-js' },
    { _id: 4, name: 'React', icon: 'fab fa-react' },
    { _id: 5, name: 'Node.js', icon: 'fab fa-node-js' },
    { _id: 6, name: 'Express.js', icon: 'fas fa-code' },
    { _id: 7, name: 'Python', icon: 'fab fa-python' },
    { _id: 8, name: 'MongoDB', icon: 'fas fa-database' },
    { _id: 9, name: 'MySQL', icon: 'fas fa-database' },
    { _id: 10, name: 'Git', icon: 'fab fa-git-alt' },
    { _id: 11, name: 'GitHub', icon: 'fab fa-github' },
    { _id: 12, name: 'VS Code', icon: 'fas fa-code' }
  ]

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/skills`)
        const data = await response.json()
        // Show database data if available, otherwise show default
        setSkills(data && data.length > 0 ? data : defaultSkills)
      } catch (error) {
        console.error('Error fetching skills:', error)
        // Show default skills if API fails
        setSkills(defaultSkills)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section id="skills" className="skills-section">
        <div className="section-container">
          <p>Loading skills...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <div className="section-title fade-up">
          <h2>My Skills</h2>
          <p>Technologies and tools I work with</p>
        </div>

        <div className="skills-container">
          {skills.map((skill, index) => (
            <div key={skill._id || index} className="skill-box fade-left" style={{'--delay': `${0.1 * (index + 1)}s`}}>
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

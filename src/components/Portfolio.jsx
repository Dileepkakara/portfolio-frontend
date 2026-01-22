import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

const Portfolio = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    // Default projects (fallback if database is empty)
    const defaultProjects = [
        {
            _id: 1,
            title: 'Restaurant Management System',
            description: 'MERN Stack platform with role-based access, order tracking, and QR table allocation.',
            image: 'https://res.cloudinary.com/dpzgo1w9j/image/upload/v1769007885/IMG-20260121-WA0002_pg8cv0.jpg',
            tags: ['Reactjs', 'Nodejs', 'Express.js', 'MongoDB', 'JWT'],
            liveLink: 'https://restaurant-frontend-puce.vercel.app/',
            githubLink: 'https://github.com/Dileepkakara/restaurant-frontend'
        },
        {
            _id: 2,
            title: 'Alumni Interaction Platform ',
            description: 'Built a scalable alumni-student portal with job postings, mentorship, and event management. Developed using React, Node.js, MySQL with JWT authentication and Firebase integration, supporting 50+ concurrent users.',
            image: 'https://res.cloudinary.com/dpzgo1w9j/image/upload/v1744689363/IMG-20250415-WA0001_1_zidwbu.jpg',
            tags: ['React', 'Node.js', 'express.js', 'MySQL', 'Firebase'],
            liveLink: 'https://aluminifrontend-two.vercel.app/',
            githubLink: 'https://github.com/Dileepkakara/aluminifrontend'
        },
        {
            _id: 3,
            title: 'LLM Chatbot',
            description: 'Built a real-time LLM chatbot with backend-focused architecture using Node.js, Express, and Socket.io. Integrated multiple LLM APIs with React frontend, MongoDB for persistence, and Firebase authentication.',
            image: 'https://res.cloudinary.com/dpzgo1w9j/image/upload/v1744689363/IMG-20250415-WA0001_1_zidwbu.jpg',
            tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
            liveLink: 'https://dileepkakara.github.io/portfolio/',
            githubLink: 'https://github.com/Dileepkakara/portfolio'
        },

    ]

    // Fetch projects from backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/projects`)
                const data = await response.json()
                // Show database data if available, otherwise show default
                setProjects(data && data.length > 0 ? data : defaultProjects)
            } catch (error) {
                console.error('Error fetching projects:', error)
                // Show default projects if API fails
                setProjects(defaultProjects)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    return (
        <section id="portfolio">
            <div className="section-container">
                <div className="section-title fade-up">
                    <h2>Portfolio</h2>
                </div>

                <div className="portfolio-carousel-wrapper">
                    <div className="carousel-container">
                        <div className="carousel-track-auto">
                            {/* First set of projects */}
                            {projects.map((project, index) => (
                                <div key={`${project._id}-1`} className="project-card">
                                    <div className="project-img">
                                        <img src={project.image} alt={project.title} />
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <div className="project-tags">
                                            {project.tags && project.tags.map((tag, idx) => (
                                                <span key={idx} className="project-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="project-links">
                                            {project.liveLink && (
                                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="link-btn">
                                                    <i className="fas fa-external-link-alt"></i>
                                                </a>
                                            )}
                                            {project.githubLink && (
                                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="link-btn">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {projects.map((project, index) => (
                                <div key={`${project._id}-2`} className="project-card">
                                    <div className="project-img">
                                        <img src={project.image} alt={project.title} />
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <div className="project-tags">
                                            {project.tags && project.tags.map((tag, idx) => (
                                                <span key={idx} className="project-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="project-links">
                                            {project.liveLink && (
                                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="link-btn">
                                                    <i className="fas fa-external-link-alt"></i>
                                                </a>
                                            )}
                                            {project.githubLink && (
                                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="link-btn">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Portfolio

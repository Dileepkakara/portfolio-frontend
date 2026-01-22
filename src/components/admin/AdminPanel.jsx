import { useState, useEffect } from 'react'
import API_BASE_URL from '../../config/api'
import FormBuilder from './FormBuilder'

const AdminPanel = ({ token }) => {
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [about, setAbout] = useState(null)
  const [messages, setMessages] = useState([])
  const [visitorCount, setVisitorCount] = useState(0)
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  // Fetch data on mount and when tab changes
  useEffect(() => {
    fetchVisitorCount()
    if (activeTab === 'projects') fetchProjects()
    if (activeTab === 'skills') fetchSkills()
    if (activeTab === 'about') fetchAbout()
    if (activeTab === 'messages') fetchMessages()
  }, [activeTab])

  const fetchVisitorCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/visitors`)
      const data = await response.json()
      setVisitorCount(data.count || 0)
    } catch (error) {
      console.error('Error fetching visitor count:', error)
    }
  }

  // Fetch functions
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`)
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/skills`)
      const data = await response.json()
      setSkills(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }

  const fetchAbout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/about`)
      const data = await response.json()
      setAbout(data)
    } catch (error) {
      console.error('Error fetching about:', error)
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  // Project handlers
  const handleProjectSubmit = async (formData, editId, tokenParam) => {
    try {
      const authToken = tokenParam || token
      const url = editId
        ? `${API_BASE_URL}/api/projects/${editId}`
        : `${API_BASE_URL}/api/projects`
      
      const method = editId ? 'PUT' : 'POST'
      
      // Convert tags to array if it's a string
      let tagsArray = formData.tags
      if (typeof formData.tags === 'string') {
        tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t)
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save project')
      }
      await fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project: ' + error.message)
    }
  }

  const handleProjectDelete = async (id, tokenParam) => {
    if (!window.confirm('Delete this project?')) return
    
    try {
      const authToken = tokenParam || token
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete')
      }
      await fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project: ' + error.message)
    }
  }

  // Skill handlers
  const handleSkillSubmit = async (formData, editId, tokenParam) => {
    try {
      const authToken = tokenParam || token
      const url = editId
        ? `${API_BASE_URL}/api/skills/${editId}`
        : `${API_BASE_URL}/api/skills`
      
      const method = editId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save skill')
      }
      await fetchSkills()
    } catch (error) {
      console.error('Error saving skill:', error)
      alert('Failed to save skill: ' + error.message)
    }
  }

  const handleSkillDelete = async (id, tokenParam) => {
    if (!window.confirm('Delete this skill?')) return
    
    try {
      const authToken = tokenParam || token
      const response = await fetch(`${API_BASE_URL}/api/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete')
      }
      await fetchSkills()
    } catch (error) {
      console.error('Error deleting skill:', error)
      alert('Failed to delete skill: ' + error.message)
    }
  }

  // About handlers
  const handleAboutSubmit = async (formData, editId, tokenParam) => {
    try {
      const authToken = tokenParam || token
      const response = await fetch(`${API_BASE_URL}/api/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ text: formData.text })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update about')
      }
      await fetchAbout()
      alert('About section updated!')
    } catch (error) {
      console.error('Error updating about:', error)
      alert('Failed to update about: ' + error.message)
    }
  }

  // Message handlers
  const handleMessageDelete = async (id, tokenParam) => {
    if (!window.confirm('Delete this message?')) return
    
    try {
      const authToken = tokenParam || token
      const response = await fetch(`${API_BASE_URL}/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete')
      }
      await fetchMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Failed to delete message: ' + error.message)
    }
  }

  // Field configurations
  const projectFields = [
    { name: 'title', label: 'Project Title', placeholder: 'Enter project title', required: true },
    { name: 'description', label: 'Description', placeholder: 'Enter project description', type: 'textarea', required: true },
    { name: 'image', label: 'Image URL', placeholder: 'https://example.com/image.jpg', required: true },
    { name: 'tags', label: 'Tags', placeholder: 'React, Vite, Node.js (comma separated)', hint: 'Separate with commas' },
    { name: 'liveLink', label: 'Live Link', placeholder: 'https://your-project.com', type: 'url' },
    { name: 'githubLink', label: 'GitHub Link', placeholder: 'https://github.com/user/repo', type: 'url' }
  ]

  const skillFields = [
    { name: 'name', label: 'Skill Name', placeholder: 'e.g., React', required: true },
    { name: 'icon', label: 'Icon Class', placeholder: 'e.g., fab fa-react', required: true, hint: 'Use Font Awesome classes' }
  ]

  const aboutFields = [
    { name: 'text', label: 'About Text', placeholder: 'Write your bio...', type: 'textarea', required: true, rows: 6 },
    { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'DD/MM/YYYY', required: false },
    { name: 'phone', label: 'Phone Number', placeholder: '+91 XXXXXXXXXX', required: false },
    { name: 'location', label: 'Location', placeholder: 'City, Country', required: false },
    { name: 'education', label: 'Education', placeholder: 'B-Tech in Computer Science...', type: 'textarea', required: false, rows: 3 },
    { name: 'cvLink', label: 'CV Download Link', placeholder: 'https://drive.google.com/...', type: 'url', required: false }
  ]

  return (
    <div className="admin-content">
      {/* Visitor Count Header */}
      <div className="admin-header-stats">
        <div className="stat-card">
          <span className="stat-label">👥 Portfolio Visitors</span>
          <span className="stat-value">{visitorCount}</span>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'projects' ? 'tab-active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          📁 Projects ({projects.length})
        </button>
        <button 
          className={activeTab === 'skills' ? 'tab-active' : ''}
          onClick={() => setActiveTab('skills')}
        >
          🎯 Skills ({skills.length})
        </button>
        <button 
          className={activeTab === 'about' ? 'tab-active' : ''}
          onClick={() => setActiveTab('about')}
        >
          👤 About
        </button>
        <button 
          className={activeTab === 'messages' ? 'tab-active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          💬 Messages ({messages.length})
        </button>
      </div>

      {/* Project Navigator */}
      {activeTab === 'projects' && (
        <div className="project-navigator">
          <h3>Project Navigator</h3>
          <div className="project-numbers-grid">
            {projects.map((project, index) => (
              <button
                key={project._id}
                className={`project-num-btn ${selectedProjectId === project._id ? 'active' : ''}`}
                onClick={() => setSelectedProjectId(selectedProjectId === project._id ? null : project._id)}
                title={project.title}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {selectedProjectId && (
            <div className="project-detail-box">
              {projects.find(p => p._id === selectedProjectId) && (
                <div className="project-detail">
                  <button 
                    className="close-btn"
                    onClick={() => setSelectedProjectId(null)}
                  >
                    ✕
                  </button>
                  <h4>{projects.find(p => p._id === selectedProjectId).title}</h4>
                  <p>{projects.find(p => p._id === selectedProjectId).description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'projects' && (
        <FormBuilder 
          title="Project"
          fields={projectFields}
          onSubmit={handleProjectSubmit}
          items={projects}
          onDelete={handleProjectDelete}
          token={token}
        />
      )}

      {activeTab === 'skills' && (
        <FormBuilder 
          title="Skill"
          fields={skillFields}
          onSubmit={handleSkillSubmit}
          items={skills}
          onDelete={handleSkillDelete}
          token={token}
        />
      )}

      {activeTab === 'about' && (
        <div className="admin-manager">
          <div className="manager-header">
            <h3>📝 About Section</h3>
          </div>

          {/* Current About Details */}
          {about && (
            <div className="about-display">
              <div className="about-header">
                <h4>Personal Details</h4>
              </div>
              
              {/* Personal Details */}
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                {about.dateOfBirth && (
                  <div className="detail-item">
                    <strong style={{ color: 'var(--primary)' }}>📅 Date of Birth:</strong>
                    <p>{about.dateOfBirth}</p>
                  </div>
                )}
                {about.phone && (
                  <div className="detail-item">
                    <strong style={{ color: 'var(--primary)' }}>📱 Phone:</strong>
                    <p>{about.phone}</p>
                  </div>
                )}
                {about.location && (
                  <div className="detail-item">
                    <strong style={{ color: 'var(--primary)' }}>📍 Location:</strong>
                    <p>{about.location}</p>
                  </div>
                )}
              </div>

              {/* About Bio */}
              {about.text && (
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>👤 Bio</h4>
                  <p className="about-content">{about.text}</p>
                  <span className="about-stats" style={{ marginTop: '0.8rem' }}>
                    Words: {about.text?.split(/\s+/).length || 0} | 
                    Characters: {about.text?.length || 0}
                  </span>
                </div>
              )}

              {/* Education */}
              {about.education && (
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>🎓 Education</h4>
                  <p className="about-content">{about.education}</p>
                </div>
              )}

              {/* CV Download Link */}
              {about.cvLink && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>📄 CV</h4>
                  <a 
                    href={about.cvLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ display: 'inline-block' }}
                  >
                    <i className="fas fa-download"></i> Download CV
                  </a>
                </div>
              )}

              <div className="about-meta">
                <small>✏️ Last updated: {new Date(about.updatedAt).toLocaleString()}</small>
              </div>
            </div>
          )}

          {!about && (
            <div className="empty-message">
              📭 No about details added yet. Add your personal information below.
            </div>
          )}

          {/* Edit Form */}
          <FormBuilder 
            title="About"
            fields={aboutFields}
            onSubmit={handleAboutSubmit}
            items={about ? [about] : []}
            editorMode={true}
            token={token}
          />
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="admin-manager">
          <h3>Contact Messages</h3>
          <div className="admin-list">
            {messages.length === 0 ? (
              <p className="empty-message">No messages yet</p>
            ) : (
              messages.map(msg => (
                <div key={msg._id} className="admin-item message-item">
                  <div className="message-content">
                    <div className="message-header">
                      <strong>{msg.name}</strong>
                      <small>{new Date(msg.createdAt).toLocaleString()}</small>
                    </div>
                    <p><strong>Email:</strong> {msg.email}</p>
                    {msg.phone && <p><strong>Phone:</strong> {msg.phone}</p>}
                    <p><strong>Message:</strong></p>
                    <p className="message-text">{msg.message}</p>
                  </div>
                  <div className="admin-actions">
                    <button 
                      onClick={() => handleMessageDelete(msg._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel

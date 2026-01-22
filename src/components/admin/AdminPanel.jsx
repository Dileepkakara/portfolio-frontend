import { useState, useEffect } from 'react'
import FormBuilder from './FormBuilder'

const AdminPanel = ({ token }) => {
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [about, setAbout] = useState(null)
  const [messages, setMessages] = useState([])

  // Fetch data on mount and when tab changes
  useEffect(() => {
    if (activeTab === 'projects') fetchProjects()
    if (activeTab === 'skills') fetchSkills()
    if (activeTab === 'about') fetchAbout()
    if (activeTab === 'messages') fetchMessages()
  }, [activeTab])

  // Fetch functions
  const fetchProjects = async () => {
    try {
      const response = await fetch('\\\/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await fetch('\\\/api/skills')
      const data = await response.json()
      setSkills(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }

  const fetchAbout = async () => {
    try {
      const response = await fetch('\\\/api/about')
      const data = await response.json()
      setAbout(data)
    } catch (error) {
      console.error('Error fetching about:', error)
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch('\\\/api/messages', {
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
        ? `\\\/api/projects/${editId}`
        : '\\\/api/projects'
      
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
      const response = await fetch(`\\\/api/projects/${id}`, {
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
        ? `\\\/api/skills/${editId}`
        : '\\\/api/skills'
      
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
      const response = await fetch(`\\\/api/skills/${id}`, {
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
      const response = await fetch('\\\/api/about', {
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
      const response = await fetch(`\\\/api/messages/${id}`, {
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
    { name: 'text', label: 'About Text', placeholder: 'Write your bio...', type: 'textarea', required: true, rows: 6 }
  ]

  return (
    <div className="admin-content">
      <div className="admin-tabs">
        <button 
          className={activeTab === 'projects' ? 'tab-active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          📁 Projects
        </button>
        <button 
          className={activeTab === 'skills' ? 'tab-active' : ''}
          onClick={() => setActiveTab('skills')}
        >
          🎯 Skills
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
          💬 Messages
        </button>
      </div>

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
                <h4>Current About Text</h4>
                <span className="about-stats">
                  Words: {about.text?.split(/\s+/).length || 0} | 
                  Characters: {about.text?.length || 0}
                </span>
              </div>
              <p className="about-content">{about.text}</p>
              <div className="about-meta">
                <small>✏️ Last updated: {new Date(about.updatedAt).toLocaleString()}</small>
              </div>
            </div>
          )}

          {!about && (
            <div className="empty-message">
              📭 No about text added yet. Click "Edit About" to add one.
            </div>
          )}

          {/* Edit Button */}
          <div className="form-actions" style={{ marginTop: '1.5rem' }}>
            <button 
              onClick={() => {
                const newText = prompt('Enter your about text:', about?.text || '')
                if (newText !== null && newText.trim() !== '') {
                  handleAboutSubmit({ text: newText })
                }
              }}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              ✏️ Edit About Text
            </button>
          </div>
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

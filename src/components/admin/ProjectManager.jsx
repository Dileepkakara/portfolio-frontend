import { useState, useEffect } from 'react'
import API_BASE_URL from '../../config/api'

const ProjectManager = ({ token }) => {
  const [projects, setProjects] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    liveLink: '',
    githubLink: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    console.log('ProjectManager - API_BASE_URL:', API_BASE_URL);
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // Use hardcoded URL directly
      const url = 'https://portfolio-backend-ilcl.onrender.com/api/projects';
      console.log('Fetching from hardcoded URL:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Projects fetched successfully:', data);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = isEditing
        ? `${API_BASE_URL}/api/projects/${editId}`
        : `${API_BASE_URL}/api/projects`
      
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim())
        })
      })

      if (!response.ok) throw new Error('Failed to save project')
      
      setFormData({
        title: '',
        description: '',
        image: '',
        tags: '',
        liveLink: '',
        githubLink: ''
      })
      setIsEditing(false)
      setEditId(null)
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags.join(', '),
      liveLink: project.liveLink,
      githubLink: project.githubLink
    })
    setIsEditing(true)
    setEditId(project._id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (!response.ok) throw new Error('Failed to delete')
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <div className="admin-manager">
      <h3>Manage Projects</h3>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
        />
        <input
          type="url"
          name="liveLink"
          placeholder="Live Link"
          value={formData.liveLink}
          onChange={handleChange}
        />
        <input
          type="url"
          name="githubLink"
          placeholder="GitHub Link"
          value={formData.githubLink}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      <div className="admin-list">
        {projects.map(project => (
          <div key={project._id} className="admin-item">
            <div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
            </div>
            <div className="admin-actions">
              <button onClick={() => handleEdit(project)} className="btn-edit">Edit</button>
              <button onClick={() => handleDelete(project._id)} className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectManager

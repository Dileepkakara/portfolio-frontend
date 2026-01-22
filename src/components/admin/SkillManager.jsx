import { useState, useEffect } from 'react'

const SkillManager = ({ token }) => {
  const [skills, setSkills] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    icon: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/skills')
      const data = await response.json()
      setSkills(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
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
        ? `http://localhost:5000/api/skills/${editId}`
        : 'http://localhost:5000/api/skills'
      
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save skill')
      
      setFormData({ name: '', icon: '' })
      setIsEditing(false)
      setEditId(null)
      fetchSkills()
    } catch (error) {
      console.error('Error saving skill:', error)
    }
  }

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      icon: skill.icon
    })
    setIsEditing(true)
    setEditId(skill._id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return
    
    try {
      const response = await fetch(`http://localhost:5000/api/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (!response.ok) throw new Error('Failed to delete')
      fetchSkills()
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  return (
    <div className="admin-manager">
      <h3>Manage Skills</h3>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Skill Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="icon"
          placeholder="Icon Class (e.g., fab fa-react)"
          value={formData.icon}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>

      <div className="admin-list">
        {skills.map(skill => (
          <div key={skill._id} className="admin-item">
            <div>
              <i className={skill.icon}></i>
              <h4>{skill.name}</h4>
            </div>
            <div className="admin-actions">
              <button onClick={() => handleEdit(skill)} className="btn-edit">Edit</button>
              <button onClick={() => handleDelete(skill._id)} className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillManager

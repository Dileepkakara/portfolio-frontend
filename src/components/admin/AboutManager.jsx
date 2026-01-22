import { useState, useEffect } from 'react'

const AboutManager = ({ token }) => {
  const [about, setAbout] = useState({})
  const [text, setText] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/about')
      const data = await response.json()
      if (data) {
        setAbout(data)
        setText(data.text || '')
      }
    } catch (error) {
      console.error('Error fetching about:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      })

      if (!response.ok) throw new Error('Failed to update about')
      
      const data = await response.json()
      setAbout(data)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating about:', error)
    }
  }

  return (
    <div className="admin-manager">
      <h3>Manage About Section</h3>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="admin-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="About text"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline">Cancel</button>
        </form>
      ) : (
        <div>
          <p>{about.text}</p>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit About</button>
        </div>
      )}
    </div>
  )
}

export default AboutManager

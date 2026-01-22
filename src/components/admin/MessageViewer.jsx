import { useState, useEffect } from 'react'

const MessageViewer = ({ token }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return

    try {
      const response = await fetch(`\\\/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to delete')
      fetchMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  return (
    <div className="admin-manager">
      <h3>Messages</h3>

      <div className="admin-list">
        {messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          messages.map(msg => (
            <div key={msg._id} className="admin-item message-item">
              <div>
                <h4>{msg.name}</h4>
                <p><strong>Email:</strong> {msg.email}</p>
                {msg.phone && <p><strong>Phone:</strong> {msg.phone}</p>}
                <p>{msg.message}</p>
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
              <div className="admin-actions">
                <button onClick={() => handleDelete(msg._id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MessageViewer

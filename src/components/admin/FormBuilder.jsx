import { useState } from 'react'

const FormBuilder = ({ 
  title, 
  fields, 
  onSubmit, 
  isEditing, 
  items, 
  onEdit, 
  onDelete, 
  token,
  editorMode = false
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {})
  )
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [expandedItem, setExpandedItem] = useState(null) // State for expanded view

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddClick = () => {
    setFormData(fields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {}))
    setEditId(null)
    setIsFormOpen(true)
  }

  const handleEditClick = (item) => {
    const newFormData = {}
    fields.forEach(field => {
      newFormData[field.name] = item[field.name] || ''
    })
    setFormData(newFormData)
    setEditId(item._id)
    setIsFormOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    const hasEmptyRequired = fields.some(field => 
      field.required && !formData[field.name]
    )
    if (hasEmptyRequired) {
      alert('Please fill all required fields')
      return
    }

    await onSubmit(formData, editId, token)
    
    setFormData(fields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {}))
    setIsFormOpen(false)
    setEditId(null)
  }

  const handleCancel = () => {
    setIsFormOpen(false)
    setEditId(null)
  }

  return (
    <div className="admin-manager">
      {!editorMode && (
        <div className="manager-header">
          <h3>{title}</h3>
          <button 
            onClick={handleAddClick}
            className="btn btn-primary"
          >
            + Add {title}
          </button>
        </div>
      )}

      {!editorMode && (
        <div className="field-info">
          <strong>Required Fields:</strong>
          {fields.map((field, idx) => (
            <span key={idx} className="field-badge">
              {field.required && <span className="required-star">*</span>}
              {field.label}
            </span>
          ))}
        </div>
      )}

      {/* Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="admin-form">
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label>
                {field.label}
                {field.required && <span className="required-star">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  rows={field.rows || 4}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
              {field.hint && <small className="field-hint">{field.hint}</small>}
              
              {/* Image Preview for profilePhoto and image fields */}
              {(field.name === 'profilePhoto' || field.name === 'image') && formData[field.name] && (
                <div style={{ marginTop: '0.8rem', textAlign: 'center' }}>
                  <img 
                    src={formData[field.name]} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '150px', 
                      maxHeight: '150px',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(99, 102, 241, 0.3)'
                    }} 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL'
                    }}
                  />
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Preview</p>
                </div>
              )}
            </div>
          ))}
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editId ? 'Update' : 'Add'}
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Items List */}
      {!editorMode && (
        <div className="admin-list">
          {items.length === 0 ? (
            <p className="empty-message">No {title.toLowerCase()} added yet</p>
          ) : (
            items.map(item => (
              <div key={item._id} className="admin-item">
                <div className="item-content">
                  {fields.map(field => (
                    <div key={field.name} className="item-field">
                      <strong>{field.label}:</strong>
                      {field.type === 'textarea' || field.name === 'description' || field.name === 'text' ? (
                        <p>{item[field.name]}</p>
                      ) : field.name === 'icon' ? (
                        <i className={item[field.name]}></i>
                      ) : field.name === 'tags' && Array.isArray(item[field.name]) ? (
                        <div className="tag-list">
                          {item[field.name].map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                          ))}
                        </div>
                      ) : field.name === 'image' ? (
                        <img src={item[field.name]} alt="preview" className="item-image-preview" />
                      ) : (
                        <span>{item[field.name]}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="admin-actions">
                  <button 
                    onClick={() => setExpandedItem(item)}
                    className="btn-view"
                    title="View full details"
                  >
                    👁️ View
                  </button>
                  <button 
                    onClick={() => handleEditClick(item)}
                    className="btn-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => onDelete(item._id, token)}
                    className="btn-delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Editor Mode - Single Form */}
      {editorMode && (
        <div>
          <div className="form-actions" style={{ marginBottom: '1.5rem' }}>
            {items.length > 0 ? (
              <button 
                onClick={() => {
                  handleEditClick(items[0])
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                ✏️ Edit {title}
              </button>
            ) : (
              <button 
                onClick={handleAddClick}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                + Add {title}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Expanded View Modal */}
      {expandedItem && (
        <div className="modal-overlay" onClick={() => setExpandedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{title} Details</h2>
              <button 
                onClick={() => setExpandedItem(null)}
                className="btn-close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              {fields.map(field => (
                <div key={field.name} className="expanded-field">
                  <h4>{field.label}</h4>
                  {field.type === 'textarea' || field.name === 'description' || field.name === 'text' ? (
                    <p className="field-value">{expandedItem[field.name]}</p>
                  ) : field.name === 'icon' ? (
                    <div className="icon-display">
                      <i className={expandedItem[field.name]} style={{fontSize: '3rem'}}></i>
                    </div>
                  ) : field.name === 'image' ? (
                    <img src={expandedItem[field.name]} alt="full" className="expanded-image" />
                  ) : field.name === 'tags' && Array.isArray(expandedItem[field.name]) ? (
                    <div className="expanded-tags">
                      {expandedItem[field.name].map((tag, idx) => (
                        <span key={idx} className="expanded-tag">{tag}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="field-value">{expandedItem[field.name]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => {
                  handleEditClick(expandedItem)
                  setExpandedItem(null)
                }}
                className="btn btn-primary"
              >
                Edit
              </button>
              <button 
                onClick={() => setExpandedItem(null)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormBuilder

import { useState, useEffect } from 'react'

function App() {
  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '' })

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('clean-notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('clean-notes', JSON.stringify(notes))
  }, [notes])

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openModal = (note = null) => {
    if (note) {
      setEditingNote(note)
      setFormData({ title: note.title, content: note.content })
    } else {
      setEditingNote(null)
      setFormData({ title: '', content: '' })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingNote(null)
    setFormData({ title: '', content: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const saveNote = () => {
    if (!formData.title.trim() && !formData.content.trim()) {
      closeModal()
      return
    }

    if (editingNote) {
      setNotes(prev =>
        prev.map(note =>
          note.id === editingNote.id
            ? {
                ...note,
                title: formData.title.trim() || 'Untitled',
                content: formData.content.trim(),
                updatedAt: new Date().toISOString()
              }
            : note
        )
      )
    } else {
      const newNote = {
        id: Date.now(),
        title: formData.title.trim() || 'Untitled',
        content: formData.content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setNotes(prev => [newNote, ...prev])
    }

    closeModal()
  }

  const deleteNote = (id, e) => {
    e.stopPropagation()
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPreview = (content) => {
    if (!content) return 'No additional text'
    return content.length > 150 ? content.substring(0, 150) + '...' : content
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📝 Clean Notes</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <span>+</span> New Note
        </button>
      </header>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search your notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredNotes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>{searchQuery ? 'No notes found' : 'No notes yet'}</h3>
          <p>
            {searchQuery
              ? 'Try a different search term'
              : 'Create your first note to get started'}
          </p>
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => openModal(note)}
            >
              <div className="note-card-header">
                <h3 className="note-card-title">
                  {note.title || 'Untitled'}
                </h3>
                <button
                  className="btn btn-danger delete-btn"
                  onClick={(e) => deleteNote(note.id, e)}
                  title="Delete note"
                >
                  🗑️
                </button>
              </div>
              <p className="note-card-preview">{getPreview(note.content)}</p>
              <div className="note-card-footer">
                <span className="note-date">
                  {formatDate(note.updatedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingNote ? 'Edit Note' : 'New Note'}</h2>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  placeholder="Enter note title..."
                  value={formData.title}
                  onChange={handleInputChange}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="form-textarea"
                  placeholder="Write your note here..."
                  value={formData.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveNote}>
                {editingNote ? 'Save Changes' : 'Create Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

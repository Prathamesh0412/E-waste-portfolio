import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch('/api/assignments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 401) {
        logout();
        navigate('/admin/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch assignments');
      const data = await res.json();
      const parsedData = data.map(a => ({
        ...a,
        tags: typeof a.tags === 'string' ? JSON.parse(a.tags || '[]') : (a.tags || []),
        learning_outcomes: typeof a.learning_outcomes === 'string' ? JSON.parse(a.learning_outcomes || '[]') : (a.learning_outcomes || [])
      }));
      setAssignments(parsedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDeleteClick = (assignment) => {
    setAssignmentToDelete(assignment);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!assignmentToDelete) return;
    
    try {
      const res = await fetch(`/api/assignments/${assignmentToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.status === 401) {
        logout();
        navigate('/admin/login');
        return;
      }
      
      if (!res.ok) throw new Error('Failed to delete assignment');
      
      setAssignments(assignments.filter(a => a.id !== assignmentToDelete.id));
      setDeleteModalOpen(false);
      setAssignmentToDelete(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const openEditForm = (assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  const openNewForm = () => {
    setEditingAssignment(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingAssignment(null);
  };

  const onSave = () => {
    closeForm();
    fetchAssignments();
  };

  const publishedCount = assignments.filter(a => a.status === 'published').length;
  const draftCount = assignments.filter(a => a.status === 'draft').length;

  if (loading) {
    return <div className="min-h-screen bg-bg flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Top Bar */}
      <header className="bg-surface border-b border-border py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-10">
        <div>
          <p className="text-small font-heading font-bold text-primary tracking-widest uppercase mb-1">EW</p>
          <h1 className="text-subtitle font-heading font-bold text-dark">Assignment Management</h1>
        </div>
        <button onClick={handleLogout} className="btn-secondary text-small py-2 px-4">
          Logout
        </button>
      </header>

      <main className="container-main mt-12">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Stats & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex gap-6">
            <div className="bg-surface p-4 rounded-card border border-border shadow-sm min-w-[120px]">
              <p className="text-label text-secondary mb-1">Total</p>
              <p className="text-section font-heading font-bold text-dark">{assignments.length}</p>
            </div>
            <div className="bg-surface p-4 rounded-card border border-border shadow-sm min-w-[120px]">
              <p className="text-label text-secondary mb-1">Published</p>
              <p className="text-section font-heading font-bold text-primary">{publishedCount}</p>
            </div>
            <div className="bg-surface p-4 rounded-card border border-border shadow-sm min-w-[120px]">
              <p className="text-label text-secondary mb-1">Drafts</p>
              <p className="text-section font-heading font-bold text-amber-600">{draftCount}</p>
            </div>
          </div>
          
          <button onClick={openNewForm} className="btn-primary">
            + Add New Assignment
          </button>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-card border border-border">
              <p className="text-secondary text-body">No assignments found. Create one to get started.</p>
            </div>
          ) : (
            assignments.map(assignment => (
              <div key={assignment.id} className="bg-surface border border-border rounded-card p-4 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow">
                {/* Thumbnail */}
                <div className="w-full md:w-32 h-24 bg-gray-100 rounded flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {assignment.preview_image ? (
                    <img src={assignment.preview_image} alt={assignment.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-secondary text-tiny uppercase tracking-wider">No Image</span>
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-small font-bold text-primary">#{assignment.assignment_number}</span>
                    <span className={`text-tiny uppercase tracking-wider px-2 py-1 rounded ${assignment.status === 'published' ? 'bg-soft text-primary' : 'bg-gray-200 text-gray-700'}`}>
                      {assignment.status}
                    </span>
                    <span className="text-small text-secondary">{assignment.category}</span>
                  </div>
                  <h3 className="text-body-lg font-heading font-bold text-dark mb-1">{assignment.title}</h3>
                  <p className="text-small text-secondary">{new Date(assignment.date).toLocaleDateString()}</p>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0 justify-end">
                  <button onClick={() => openEditForm(assignment)} className="btn-secondary py-2 px-4 text-small">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(assignment)} className="bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2 px-4 rounded text-small font-medium transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-card p-6 max-w-md w-full shadow-lg">
            <h3 className="text-subtitle font-heading font-bold text-dark mb-4">Delete Assignment</h3>
            <p className="text-body text-secondary mb-6">
              Are you sure you want to delete "{assignmentToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setDeleteModalOpen(false)} className="btn-secondary py-2 px-4">
                Cancel
              </button>
              <button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 md:p-10 overflow-y-auto">
          <div className="bg-surface rounded-card w-full max-w-4xl shadow-xl mt-4 md:mt-10 mb-20">
            <AssignmentForm 
              assignment={editingAssignment} 
              onClose={closeForm} 
              onSave={onSave}
              token={token} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Inline Form Component
const AssignmentForm = ({ assignment, onClose, onSave, token }) => {
  const isEdit = !!assignment;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    assignment_number: assignment?.assignment_number || '',
    title: assignment?.title || '',
    category: assignment?.category || '',
    date: assignment?.date || new Date().toISOString().split('T')[0],
    description: assignment?.description || '',
    content: assignment?.content || '',
    tags: assignment?.tags ? (Array.isArray(assignment.tags) ? assignment.tags.join(', ') : JSON.parse(assignment.tags).join(', ')) : '',
    learning_outcomes: assignment?.learning_outcomes ? (Array.isArray(assignment.learning_outcomes) ? assignment.learning_outcomes.join('\n') : JSON.parse(assignment.learning_outcomes).join('\n')) : '',
    status: assignment?.status || 'published'
  });
  
  const [files, setFiles] = useState({
    preview_image: null,
    pdf_file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList.length > 0) {
      setFiles(prev => ({ ...prev, [name]: fileList[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const submitData = new FormData();
      
      // Append standard fields
      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          // Convert comma separated tags to JSON array
          const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
          submitData.append('tags', JSON.stringify(tagsArray));
        } else if (key === 'learning_outcomes') {
          // Convert newline separated outcomes to JSON array
          const outcomesArray = formData.learning_outcomes.split('\n').map(t => t.trim()).filter(Boolean);
          submitData.append('learning_outcomes', JSON.stringify(outcomesArray));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      // Append files
      if (files.preview_image) {
        submitData.append('preview_image', files.preview_image);
      }
      if (files.pdf_file) {
        submitData.append('pdf_file', files.pdf_file);
      }
      
      const url = isEdit 
        ? `/api/assignments/${assignment.id}` 
        : '/api/assignments';
        
      const method = isEdit ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save assignment');
      }
      
      onSave();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[85vh]">
      <div className="px-6 py-4 border-b border-border flex justify-between items-center sticky top-0 bg-surface z-10 rounded-t-card">
        <h2 className="text-subtitle font-heading font-bold text-dark">
          {isEdit ? 'Edit Assignment' : 'New Assignment'}
        </h2>
        <button onClick={onClose} className="text-secondary hover:text-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto flex-grow">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6 text-small">
            {error}
          </div>
        )}
        
        <form id="assignment-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-label text-secondary mb-1">Assignment Number *</label>
              <input type="number" name="assignment_number" value={formData.assignment_number} onChange={handleChange} required className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-label text-secondary mb-1">Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} required className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-white">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-label text-secondary mb-1">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary" />
          </div>
          
          <div>
            <label className="block text-label text-secondary mb-1">Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary" />
          </div>
          
          <div>
            <label className="block text-label text-secondary mb-1">Short Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={2} className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary" placeholder="Brief summary of the assignment..."></textarea>
          </div>
          
          <div>
            <label className="block text-label text-secondary mb-1">Full Content</label>
            <textarea name="content" value={formData.content} onChange={handleChange} rows={6} className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary" placeholder="Detailed content..."></textarea>
          </div>
          
          <div>
            <label className="block text-label text-secondary mb-1">Tags (comma-separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary" placeholder="Recycling, Hardware, Analysis" />
          </div>
          
          <div>
            <label className="block text-label text-secondary mb-1">Learning Outcomes (one per line)</label>
            <textarea name="learning_outcomes" value={formData.learning_outcomes} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary" placeholder="Understood X...&#10;Analyzed Y..."></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded border border-border">
            <div>
              <label className="block text-label text-dark font-medium mb-1">Preview Image</label>
              <p className="text-tiny text-secondary mb-2">Upload a thumbnail (JPG, PNG, WebP). Max 10MB.</p>
              <input type="file" name="preview_image" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} className="w-full text-small" />
              {isEdit && assignment.preview_image && !files.preview_image && (
                <p className="text-tiny text-primary mt-2">Current: {assignment.preview_image.split('/').pop()}</p>
              )}
            </div>
            
            <div>
              <label className="block text-label text-dark font-medium mb-1">PDF File</label>
              <p className="text-tiny text-secondary mb-2">Upload the assignment PDF document. Max 10MB.</p>
              <input type="file" name="pdf_file" accept="application/pdf" onChange={handleFileChange} className="w-full text-small" />
              {isEdit && assignment.pdf_file && !files.pdf_file && (
                <p className="text-tiny text-primary mt-2">Current: {assignment.pdf_file.split('/').pop()}</p>
              )}
            </div>
          </div>
        </form>
      </div>
      
      <div className="px-6 py-4 border-t border-border flex justify-end gap-4 sticky bottom-0 bg-surface rounded-b-card">
        <button type="button" onClick={onClose} className="btn-secondary py-2 px-6">
          Cancel
        </button>
        <button 
          type="submit" 
          form="assignment-form" 
          disabled={submitting} 
          className="btn-primary py-2 px-8 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save Assignment'}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

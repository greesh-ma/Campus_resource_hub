
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceAPI } from '../api/client';

function AddResourceForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('CSE3006');
  const [customCategory, setCustomCategory] = useState(''); // ✅ NEW
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Subject categories
  const categories = [
    { name: 'Database Management System', code: 'CSE3006' },
    { name: 'Data Structures', code: 'CSE2001' },
    { name: 'Operating Systems', code: 'CSE3005' },
    { name: 'Computer Networks', code: 'CSE3004' },
    { name: 'Machine Learning', code: 'CSE4003' },
    { name: 'Artificial Intelligence', code: 'CSE4001' },
    { name: 'Web Development', code: 'CSE2006' },
    { name: 'Software Engineering', code: 'CSE3001' },
    { name: 'Cloud Computing', code: 'CSE4002' },
    { name: 'Cyber Security', code: 'CSE4005' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ handle OTHER case
      const finalCategory = category;

      await resourceAPI.createResource({
        title,
        description,
        link,
        category: finalCategory
      });

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px 0' }}>
      <h1 style={{ marginBottom: '30px' }}>Add a New Resource</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Link */}
        <div className="form-group">
          <label className="form-label">Link (optional)</label>
          <input
            type="url"
            className="form-input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label">Subject</label>
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px' }}
          >
            {categories.map(cat => (
              <option key={cat.code} value={cat.code}>
                {cat.name} ({cat.code})
              </option>
            ))}

            {/* ✅ Correct way to add OTHER */}
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* ✅ Show input if OTHER selected */}
        {category === 'OTHER' && (
          <div className="form-group">
            <label className="form-label">Enter Subject</label>
            <input
              type="text"
              className="form-input"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="e.g., Blockchain (CSE4010)"
              required
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="form-submit"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Resource'}
        </button>
      </form>
    </div>
  );
}

export default AddResourceForm;


import { useState, useEffect } from 'react';
import { resourceAPI } from '../api/client';
import ResourceCard from './ResourceCard';
import Pagination from './Pagination';

function ResourceList({ sortType, subject }) { // ✅ receive subject
  const [resources, setResources] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ re-fetch when page OR sortType OR subject changes
  useEffect(() => {
    setPage(1); // 🔥 reset page when filter changes
  }, [sortType, subject]);

  useEffect(() => {
    fetchResources();
  }, [page, sortType, subject]);

  const fetchResources = async () => {
    setLoading(true);
    setError('');

    try {
      // ✅ send subject to backend
      const response = await resourceAPI.getResources(page, 10, sortType, subject);

      setResources(response.resources);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (resourceId) => {
    setResources(resources.map(r =>
      r._id === resourceId
        ? { ...r, upvotes: (r.upvotes || 0) + 1 }
        : r
    ));
  };

  if (loading && resources.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading resources...
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">Error: {error}</div>;
  }

  if (resources.length === 0) {
    return <div className="alert alert-info">No resources found.</div>;
  }

  return (
    <>
      {resources.map(resource => (
        <ResourceCard key={resource._id} resource={resource} onVote={handleVote} />
      ))}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}

export default ResourceList;
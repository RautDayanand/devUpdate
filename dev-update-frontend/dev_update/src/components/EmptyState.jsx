import React from 'react';

const EmptyState = () => {
  return (
    <div className="card shadow-sm text-center py-5">
      <div className="card-body">
        <div className="display-1 mb-3">🔍</div>
        <h3 className="h2 fw-semibold text-dark mb-2">No technologies found</h3>
        <p className="text-muted">Try adjusting your search or filter criteria</p>
      </div>
    </div>
  );
};

export default EmptyState;
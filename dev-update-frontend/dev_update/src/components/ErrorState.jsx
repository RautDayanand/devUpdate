import React from 'react';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="display-1 mb-3">❌</div>
        <h3 className="h2 fw-semibold text-dark mb-3">Failed to Load</h3>
        <p className="text-muted mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="btn btn-primary btn-lg px-4"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
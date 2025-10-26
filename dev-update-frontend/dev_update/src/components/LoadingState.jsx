import React from 'react';

const LoadingState = () => {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="h5 text-muted">Loading technologies and updates...</p>
      </div>
    </div>
  );
};

export default LoadingState;
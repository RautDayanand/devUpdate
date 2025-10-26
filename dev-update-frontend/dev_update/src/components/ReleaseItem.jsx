import React from 'react';

const ReleaseItem = ({ 
  release, 
  techId, 
  isExpanded, 
  onToggleRelease, 
  formatChangelog 
}) => {
  const displayText = isExpanded 
    ? release.rawChangelog 
    : (release.rawChangelog?.substring(0, 120) + (release.rawChangelog?.length > 120 ? '...' : ''));

  return (
    <div className="border rounded bg-white p-3">
      {/* Release Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-primary">v{release.version}</span>
          <span className="text-muted small">
            {new Date(release.publishedAt).toLocaleDateString()}
          </span>
        </div>
        {release.diffUrl && (
          <a
            href={release.diffUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-outline-primary"
          >
            Diff
          </a>
        )}
      </div>

      {/* Changelog Content */}
      <div className="text-dark small">
        <div style={{ 
          maxHeight: !isExpanded && release.rawChangelog?.length > 120 ? '3em' : 'none',
          overflow: 'hidden'
        }}>
          {formatChangelog(displayText)}
        </div>
        
        {release.rawChangelog?.length > 120 && (
          <button
            onClick={() => onToggleRelease(techId, release.id)}
            className="btn btn-link btn-sm p-0 text-primary text-decoration-none mt-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
            <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} ms-1`}></i>
          </button>
        )}
      </div>

      {/* AI Summary Badge */}
      {release.aiSummary && (
        <div className="alert alert-success mt-2 mb-0 py-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              <span className="small">AI Summary</span>
            </div>
            <button className="btn btn-sm btn-outline-success">
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReleaseItem;
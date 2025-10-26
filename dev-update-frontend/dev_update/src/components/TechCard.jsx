import React from 'react';
import ReleaseItem from './ReleaseItem';

const TechCard = ({ 
  tech, 
  releases, 
  latestRelease, 
  recentReleases30, 
  recentReleases90, 
  isFavorite, 
  isSelectedForCompare, 
  compareMode, 
  onToggleFavorite, 
  onToggleCompare, 
  onToggleRelease, 
  expandedReleases, 
  formatChangelog,
  getTechIcon 
}) => {
  
  const sortedReleases = releases?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0,3);

  return (
    <div className="col-sm-6 col-lg-4 mb-4">
      <div className={`card h-100 border-0 shadow-lg position-relative overflow-hidden ${isSelectedForCompare ? 'border-primary border-3' : ''}`}>
        
        {/* Compare Button */}
        {compareMode && (
          <button 
            className={`btn position-absolute top-0 end-0 m-3 rounded-circle ${isSelectedForCompare ? 'btn-primary text-white shadow' : 'btn-light text-secondary border'}`} 
            style={{ width: '36px', height: '36px' }}
            onClick={() => onToggleCompare(tech.id)}
            aria-label={isSelectedForCompare ? 'Remove from comparison' : 'Add to comparison'}
          >
            {isSelectedForCompare ? '✓' : '+'}
          </button>
        )}

        {/* Card Header */}
        <div className="card-header text-white p-4" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)' }}>
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-center gap-3">
              {tech.logoUrl ? (
                <img src={tech.logoUrl} alt={tech.name} className="rounded bg-white p-1" style={{ width: '50px', height: '50px', objectFit: 'contain' }}/>
              ) : (
                <span style={{ fontSize: '1.5rem' }}>{getTechIcon(tech.name)}</span>
              )}
              <h5 className="mb-0 fw-bold">{tech.name}</h5>
            </div>
            <button 
              className="btn btn-link text-white p-0 border-0 fs-5"
              onClick={(e) => onToggleFavorite(tech.id, e)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>

          {tech.description && <p className="text-white-50 mt-2 mb-2 small">{tech.description}</p>}

          {/* Tech Links */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            {tech.website && <a href={tech.website} target="_blank" rel="noopener noreferrer" className="badge bg-light text-dark">🌐 Website</a>}
            {tech.primarySource && <a href={tech.primarySource} target="_blank" rel="noopener noreferrer" className="badge bg-light text-dark">💻 GitHub</a>}
            {tech.packageId && <a href={`https://www.npmjs.com/package/${tech.packageId}`} target="_blank" rel="noopener noreferrer" className="badge bg-light text-dark">📦 NPM</a>}
            {tech.apiUrl && <a href={tech.apiUrl} target="_blank" rel="noopener noreferrer" className="badge bg-light text-dark">🔗 API</a>}
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-4">
          {/* Tech Stats */}
          <div className="row text-center mb-3 g-2">
            <div className="col bg-light rounded py-2 shadow-sm">
              <h6 className="mb-0 fw-bold">{releases?.length || 0}</h6>
              <small className="text-muted">Total Releases</small>
            </div>
            <div className="col bg-light rounded py-2 shadow-sm">
              <h6 className="mb-0 fw-bold">{recentReleases30}</h6>
              <small className="text-muted">Last 30 days</small>
            </div>
            <div className="col bg-light rounded py-2 shadow-sm">
              <h6 className="mb-0 fw-bold">{recentReleases90}</h6>
              <small className="text-muted">Last 90 days</small>
            </div>
          </div>

          {latestRelease && <p className="text-center text-muted small mb-3">Last updated: {new Date(latestRelease.publishedAt).toLocaleDateString()}</p>}

          {/* Release List */}
          <div className="mt-3">
            {(!releases || releases.length === 0) ? (
              <div className="text-center py-4 text-muted">
                <div style={{ fontSize: '2rem' }}>📭</div>
                <p className="mb-0 small">No releases available yet</p>
                <small className="text-secondary">Updates will appear here automatically</small>
              </div>
            ) : (
              <>
                {sortedReleases.map((release) => (
                  <ReleaseItem
                    key={release.id}
                    release={release}
                    techId={tech.id}
                    isExpanded={expandedReleases[`${tech.id}-${release.id}`]}
                    onToggleRelease={onToggleRelease}
                    formatChangelog={formatChangelog}
                  />
                ))}
                {releases.length > 3 && (
                  <div className="text-center mt-2">
                    <button 
                      onClick={() => onToggleRelease(tech.id, 'all')} 
                      className="btn btn-link btn-sm"
                    >
                      View all {releases.length} releases →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCard;

import React from 'react';

const AnalyticsOverview = ({ 
  recentlyUpdatedTechs, 
  topTechsByActivity, 
  getLatestRelease, 
  getTechIcon, 
  getReleaseFrequency, 
  getActivityLevel, 
  releasesMap,
  ActivityBar 
}) => {
  return (
    <div className="row g-4 mb-5">
      {/* Recently Updated */}
      <div className="col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center mb-3">
              <span className="bg-success rounded-circle me-2" style={{ width: "8px", height: "8px" }}></span>
              Recently Updated
            </h5>
            <div className="d-flex flex-column gap-2">
              {recentlyUpdatedTechs.map(tech => {
                const latestRelease = getLatestRelease(tech.id);
                return (
                  <div key={tech.id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                    <div className="d-flex align-items-center gap-3">
                      <span className="fs-5">{getTechIcon(tech.name)}</span>
                      <span className="fw-medium text-dark">{tech.name}</span>
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold text-primary small">v{latestRelease?.version}</div>
                      <div className="text-muted small">
                        {new Date(latestRelease?.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Most Active */}
      <div className="col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center mb-3">
              <span className="bg-primary rounded-circle me-2" style={{ width: "8px", height: "8px" }}></span>
              Most Active
            </h5>
            <div className="d-flex flex-column gap-3">
              {topTechsByActivity.map(tech => {
                const releaseCount = releasesMap[tech.id]?.length || 0;
                const recentReleases = getReleaseFrequency(releasesMap[tech.id], 30);
                const activityLevel = getActivityLevel(recentReleases);
                
                return (
                  <div key={tech.id} className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <span className="small">{getTechIcon(tech.name)}</span>
                        <span className="fw-medium text-dark small">{tech.name}</span>
                      </div>
                      <span className="text-muted small">{releaseCount} total</span>
                    </div>
                    <ActivityBar level={activityLevel} recentReleases={recentReleases} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
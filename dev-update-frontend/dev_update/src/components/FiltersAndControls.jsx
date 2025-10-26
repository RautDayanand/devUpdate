import React from 'react';

const FiltersAndControls = ({
  searchTerm,
  onSearchChange,
  selectedTech,
  onTechChange,
  view,
  onViewChange,
  compareMode,
  onCompareModeToggle,
  selectedForCompare,
  techList
}) => {
  return (
    <div className="card shadow-sm mb-5">
      <div className="card-body">
        <div className="row g-3 align-items-center">
          <div className="col-lg-6">
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                placeholder="Search technologies..."
                className="form-control form-control-lg"
                value={searchTerm}
                onChange={onSearchChange}
              />
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
              <select
                className="form-select form-select-lg"
                style={{ width: "auto" }}
                value={selectedTech}
                onChange={onTechChange}
              >
                <option value="all">All Technologies</option>
                {techList.map(tech => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </select>

              <div className="btn-group" role="group">
                {[
                  { key: "all", label: "All", icon: "📚" },
                  { key: "recent", label: "Recent", icon: "🆕" },
                  { key: "favorites", label: "Favorites", icon: "⭐" }
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onViewChange(key)}
                    className={`btn btn-lg ${view === key ? 'btn-primary' : 'btn-outline-primary'}`}
                  >
                    <span className="me-1">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={onCompareModeToggle}
                className={`btn btn-lg ${compareMode ? 'btn-warning' : 'btn-outline-warning'}`}
              >
                <span className="me-2">🔍</span>
                Compare {selectedForCompare.length > 0 && `(${selectedForCompare.length}/2)`}
              </button>
            </div>
          </div>
        </div>

        {compareMode && (
          <div className="alert alert-warning mt-3 mb-0">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Compare Mode:</strong> Select up to 2 technologies to compare their releases
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersAndControls;
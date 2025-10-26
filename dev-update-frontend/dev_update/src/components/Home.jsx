import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AnalyticsOverview from './AnalyticsOverview';
import FiltersAndControls from './FiltersAndControls';
import TechCard from './TechCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

const Home = () => {
  const [techList, setTechList] = useState([]);
  const [releasesMap, setReleasesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");
  const [expandedReleases, setExpandedReleases] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [view, setView] = useState("all");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  // Load favorites
  useEffect(() => {
    const savedFavorites = localStorage.getItem("techFavorites");
    if (savedFavorites) setFavorites(new Set(JSON.parse(savedFavorites)));
  }, []);

  // Save favorites
  useEffect(() => {
    localStorage.setItem("techFavorites", JSON.stringify([...favorites]));
  }, [favorites]);

  // Fetch techs and releases
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        // Fetch all techs
        const techResponse = await fetch("http://localhost:8080/api/tech/getAll");
        if (!techResponse.ok) {
          throw new Error(`HTTP error! status: ${techResponse.status}`);
        }
        const techData = await techResponse.json();
        setTechList(techData);

        // Fetch releases for each tech
        const allReleases = await Promise.all(
          techData.map(async (tech) => {
            try {
              const releaseResponse = await fetch(`http://localhost:8080/api/releases/tech/${tech.id}`);
              if (!releaseResponse.ok) {
                console.warn(`No releases found for ${tech.name}`);
                return { techId: tech.id, releases: [] };
              }
              const releases = await releaseResponse.json();
              return { techId: tech.id, releases };
            } catch (err) {
              console.error(`Error fetching releases for ${tech.name}:`, err);
              return { techId: tech.id, releases: [] };
            }
          })
        );

        // Map releases by techId
        const releasesObj = {};
        allReleases.forEach((item) => {
          releasesObj[item.techId] = item.releases;
        });
        setReleasesMap(releasesObj);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load technologies. Please check if the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler functions
  const toggleRelease = (techId, releaseId) => {
    setExpandedReleases((prev) => ({
      ...prev,
      [`${techId}-${releaseId}`]: !prev[`${techId}-${releaseId}`],
    }));
  };

  const toggleFavorite = (techId, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(techId)
        ? newFavorites.delete(techId)
        : newFavorites.add(techId);
      return newFavorites;
    });
  };

  const toggleCompare = (techId) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(techId)) return prev.filter((id) => id !== techId);
      else if (prev.length < 2) return [...prev, techId];
      return prev;
    });
  };

  const getReleaseFrequency = (releases, days = 30) => {
    if (!releases) return 0;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return releases.filter(
      (release) => new Date(release.publishedAt) > cutoffDate
    ).length;
  };

  const getLatestRelease = (techId) => {
    const releases = releasesMap[techId];
    return releases?.length > 0 ? releases[0] : null;
  };

  const getActivityLevel = (recentReleases) => {
    if (recentReleases >= 5) return "high";
    if (recentReleases >= 2) return "medium";
    return "low";
  };

  const filteredTechList = techList.filter((tech) => {
    const matchesSearch = tech.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedTech === "all" || tech.id.toString() === selectedTech;
    const matchesView =
      view === "all" ||
      (view === "favorites" && favorites.has(tech.id)) ||
      (view === "recent" && getReleaseFrequency(releasesMap[tech.id], 7) > 0);

    return matchesSearch && matchesFilter && matchesView;
  });

  const recentlyUpdatedTechs = techList
    .filter((tech) => {
      const latestRelease = getLatestRelease(tech.id);
      if (!latestRelease) return false;
      const daysAgo =
        (new Date() - new Date(latestRelease.publishedAt)) /
        (1000 * 60 * 60 * 24);
      return daysAgo <= 7;
    })
    .slice(0, 5);

  const topTechsByActivity = [...techList]
    .sort(
      (a, b) => (releasesMap[b.id]?.length || 0) - (releasesMap[a.id]?.length || 0)
    )
    .slice(0, 5);

  const formatChangelog = (text) => {
    if (!text) return "No changelog available";
    return text.split("\n").map((line, index) => {
      if (line.startsWith("- ") || line.startsWith("* "))
        return <li key={index} className="ms-4">{line.substring(2)}</li>;
      if (line.startsWith("## ") || line.startsWith("### "))
        return (
          <h6 key={index} className="fw-semibold mt-2 text-dark">
            {line.replace(/^#+\s*/, "")}
          </h6>
        );
      return <p key={index} className="my-1">{line}</p>;
    });
  };

  const getTechIcon = (techName) => {
    const icons = {
      react: "⚛️",
      bootstrap: "🎨",
      vue: "🟢",
      angular: "🅰️",
      node: "📦",
      python: "🐍",
      java: "☕",
      docker: "🐳",
    };
    return icons[techName.toLowerCase()] || "🔧";
  };

  const ActivityBar = ({ level, recentReleases }) => {
    const levels = {
      low: { width: "33%", color: "bg-success" },
      medium: { width: "66%", color: "bg-warning" },
      high: { width: "100%", color: "bg-danger" },
    };
    const config = levels[level] || levels.low;
    return (
      <div className="d-flex align-items-center gap-2">
        <div className="flex-grow-1 bg-light rounded" style={{ height: "8px" }}>
          <div
            className={`h-100 rounded ${config.color}`}
            style={{ width: config.width }}
          ></div>
        </div>
        <span className="text-muted small">{recentReleases} releases</span>
      </div>
    );
  };

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const techResponse = await fetch("http://localhost:8080/api/tech/getAll");
        const techData = await techResponse.json();
        setTechList(techData);

        const allReleases = await Promise.all(
          techData.map(async (tech) => {
            try {
              const releaseResponse = await fetch(`http://localhost:8080/api/releases/tech/${tech.id}`);
              const releases = await releaseResponse.json();
              return { techId: tech.id, releases };
            } catch (err) {
              console.error(`Error fetching releases for ${tech.name}:`, err);
              return { techId: tech.id, releases: [] };
            }
          })
        );

        const releasesObj = {};
        allReleases.forEach((item) => {
          releasesObj[item.techId] = item.releases;
        });
        setReleasesMap(releasesObj);
      } catch (err) {
        setError("Failed to load data. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  // Render states
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={retryFetch} />;

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container-fluid">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="bg-primary rounded d-flex align-items-center justify-content-center me-3" style={{ width: "60px", height: "60px" }}>
              <span className="fs-3 text-white">🚀</span>
            </div>
            <h1 className="display-4 fw-bold text-primary">
              Developer Update Tracker
            </h1>
          </div>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Stay updated with the latest releases, changelogs, and AI-powered summaries
          </p>
        </div>

        {/* Analytics Overview */}
        <AnalyticsOverview
          recentlyUpdatedTechs={recentlyUpdatedTechs}
          topTechsByActivity={topTechsByActivity}
          getLatestRelease={getLatestRelease}
          getTechIcon={getTechIcon}
          getReleaseFrequency={getReleaseFrequency}
          getActivityLevel={getActivityLevel}
          releasesMap={releasesMap}
          ActivityBar={ActivityBar}
        />

        {/* Filters & Controls */}
        <FiltersAndControls
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          selectedTech={selectedTech}
          onTechChange={(e) => setSelectedTech(e.target.value)}
          view={view}
          onViewChange={setView}
          compareMode={compareMode}
          onCompareModeToggle={() => setCompareMode(!compareMode)}
          selectedForCompare={selectedForCompare}
          techList={techList}
        />

        {/* Tech Grid */}
        {filteredTechList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="row g-4">
            {filteredTechList.map((tech) => {
              const latestRelease = getLatestRelease(tech.id);
              const recentReleases30 = getReleaseFrequency(releasesMap[tech.id], 30);
              const recentReleases90 = getReleaseFrequency(releasesMap[tech.id], 90);
              const isFavorite = favorites.has(tech.id);
              const isSelectedForCompare = selectedForCompare.includes(tech.id);
              
              return (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  releases={releasesMap[tech.id]}
                  latestRelease={latestRelease}
                  recentReleases30={recentReleases30}
                  recentReleases90={recentReleases90}
                  isFavorite={isFavorite}
                  isSelectedForCompare={isSelectedForCompare}
                  compareMode={compareMode}
                  onToggleFavorite={toggleFavorite}
                  onToggleCompare={toggleCompare}
                  onToggleRelease={toggleRelease}
                  expandedReleases={expandedReleases}
                  formatChangelog={formatChangelog}
                  getTechIcon={getTechIcon}
                />
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-5 pt-4 border-top">
          <p className="text-muted">
            🔄 Auto-updated • 🚀 Built for developers •{" "}
            <a
              href="#"
              className="text-primary text-decoration-none fw-medium"
            >
              Add your technology
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
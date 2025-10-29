import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [techList, setTechList] = useState([]);
  const [releasesMap, setReleasesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiSummary, setAiSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const aiSectionRef = React.useRef(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const techRes = await fetch("http://localhost:8080/api/tech/getAll");
        if (!techRes.ok) throw new Error("Failed to fetch technologies");

        const techData = await techRes.json();
        setTechList(techData);

        const allReleases = await Promise.all(
          techData.map(async (tech) => {
            try {
              const relRes = await fetch(
                `http://localhost:8080/api/releases/tech/${tech.id}`
              );
              const releases = relRes.ok ? await relRes.json() : [];
              return { techId: tech.id, releases };
            } catch {
              return { techId: tech.id, releases: [] };
            }
          })
        );

        const releasesObj = {};
        allReleases.forEach(({ techId, releases }) => {
          releasesObj[techId] = releases;
        });
        setReleasesMap(releasesObj);
      } catch (err) {
        setError("Unable to load data. Please check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate AI Summary
  const generateSummary = async () => {
    try {
      setSummaryLoading(true);
      setAiSummary("");
      const response = await fetch("http://localhost:8080/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ releasesMap }),
      });

      if (!response.ok) throw new Error("Failed to generate summary");
      const data = await response.json();
      setAiSummary(data.summary || "No summary generated.");
    } catch {
      setAiSummary("⚠️ Error generating summary. Try again.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const scrollToSummary = () => {
    aiSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5">
        <h5 className="text-danger">{error}</h5>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="d-inline-flex align-items-center mb-3">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: 50, height: 50 }}
          >
            🚀
          </div>
          <h2 className="fw-bold text-primary m-0">
            Developer Update Tracker
          </h2>
        </div>
        <p className="text-muted">
          Stay updated with the latest releases & changelogs
        </p>
      </div>

      {/* Tech Grid */}
      {techList.length === 0 ? (
        <div className="text-center text-muted">No technologies available.</div>
      ) : (
        <div className="row g-4">
          {techList.map((tech) => {
            const releases = releasesMap[tech.id] || [];
            const latest = releases[0];
            return (
              <div className="col-md-4" key={tech.id}>
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title d-flex align-items-center">
                      <span className="me-2">🔧</span>
                      {tech.name}
                    </h5>
                    <p className="text-muted small mb-3">
                      {tech.description || "No description available."}
                    </p>
                    {latest ? (
                      <>
                        <p className="mb-1">
                          <strong>Latest:</strong> {latest.version}
                        </p>
                        <p className="text-muted small">
                          Released on{" "}
                          {new Date(latest.publishedAt).toLocaleDateString()}
                        </p>
                      </>
                    ) : (
                      <p className="text-muted small">No releases yet.</p>
                    )}

                    {/* Know More Button */}
                    <button
                      className="btn btn-sm btn-outline-primary mt-auto"
                      onClick={scrollToSummary}
                    >
                      Know More →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Summary Section */}
      <div ref={aiSectionRef} className="card my-5 shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title d-flex align-items-center mb-3">
            <span className="me-2">🧠</span> AI Summary of Latest Updates
          </h5>
          {summaryLoading ? (
            <div className="d-flex align-items-center">
              <div
                className="spinner-border text-primary me-3"
                role="status"
              ></div>
              <span>Generating summary...</span>
            </div>
          ) : aiSummary ? (
            <p className="text-muted">{aiSummary}</p>
          ) : (
            <p className="text-muted">
              Click below to generate an AI summary of the latest updates.
            </p>
          )}
          <button
            className="btn btn-outline-primary mt-2"
            onClick={generateSummary}
            disabled={summaryLoading}
          >
            {summaryLoading ? "Generating..." : "Generate Summary"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 pt-4 border-top">
        <p className="text-muted small mb-0">
          © 2025 Dev Tracker • Built with ❤️ using React + Bootstrap
        </p>
      </footer>
    </div>
  );
};

export default Home;

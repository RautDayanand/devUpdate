// Home.jsx
import React, { useEffect, useState } from "react";

const Home = () => {
  const [tech, setTech] = useState(null);
  const [releases, setReleases] = useState([]);

  // Fetch React tech
  useEffect(() => {
    fetch("http://localhost:8080/api/tech/getAll")
      .then((res) => res.json())
      .then((data) => {
        // Take the first tech (React)
        setTech(data[0]);
        if (data[0]) {
          fetch(`http://localhost:8080/api/releases/tech/${data[0].id}`)
            .then((res) => res.json())
            .then((releasesData) => setReleases(releasesData));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Developer Update Tracker</h1>

      {tech ? (
        <div>
          <h2>Tech: {tech.name}</h2>
          <h3>Releases:</h3>
          {releases.length > 0 ? (
            <ul>
              {releases.map((r) => (
                <li key={r.id}>
                  <strong>{r.version}</strong> - {new Date(r.publishedAt).toDateString()}
                  <br />
                  {r.rawChangelog}
                  <br />
                  <a href={r.diffUrl} target="_blank" rel="noreferrer">
                    View Diff
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No releases yet.</p>
          )}
        </div>
      ) : (
        <p>Loading tech...</p>
      )}
    </div>
  );
};

export default Home;

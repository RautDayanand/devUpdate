import React, { useState } from "react";

function AiSummary({ onGenerate, summary, loading }) {
  return (
    <div className="card my-5 shadow-sm border-0" id="ai-summary">
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center mb-3">
          <span className="me-2">🧠</span> AI Summary of Latest Updates
        </h5>

        {loading ? (
          <div className="d-flex align-items-center">
            <div
              className="spinner-border text-primary me-3"
              role="status"
            ></div>
            <span>Generating summary...</span>
          </div>
        ) : summary ? (
          <p className="text-muted">{summary}</p>
        ) : (
          <p className="text-muted">
            Click below to generate an AI summary of the latest updates.
          </p>
        )}

        <button
          className="btn btn-outline-primary mt-2"
          onClick={onGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </div>
    </div>
  );
}

export default AiSummary;

import React from "react";

export default function Results({ results, queryImage }) {
  if (!results.length) return null;

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "10px", color: "#333" }}>Uploaded Image:</h2>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src={queryImage}
          alt="Uploaded"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px",
            border: "3px solid #4a90e2",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      <h2 style={{ marginBottom: "15px", color: "#333" }}>
        Top Matching Products:
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {results.map((res, index) => (
          <div
            key={res.id}
            style={{
              border: index === 0 ? "3px solid #4CAF50" : "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              backgroundColor: index === 0 ? "#e8f5e9" : "#fff",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={res.src}
              alt={`Product ${res.id}`}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "contain",
                borderRadius: "8px",
                backgroundColor: "#f7f7f7",
              }}
            />
            <p style={{ marginTop: "10px", fontSize: "15px", color: "#333" }}>
              Similarity:{" "}
              <span style={{ color: "#4a90e2", fontWeight: "bold" }}>
                {(res.score * 100).toFixed(2)}%
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

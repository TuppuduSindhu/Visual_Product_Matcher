import React, { useState, useEffect } from "react";
import Upload from "./components/Upload";
import Results from "./components/Results";
import { getEmbedding, cosineSimilarity } from "./utils/embeddings";
import * as tf from "@tensorflow/tfjs";

export default function App() {
  const [queryImage, setQueryImage] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    src: `/products/product${i + 1}.jpeg`,
  }));

  const handleImageUpload = async (file) => {
    setLoading(true);
    setResults([]);
    setProgress(0);
    setQueryImage(URL.createObjectURL(file));

    try {
      const queryImg = document.createElement("img");
      queryImg.src = URL.createObjectURL(file);
      await new Promise((res) => (queryImg.onload = res));
      document.body.appendChild(queryImg);

      const queryEmbedding = await getEmbedding(queryImg);
      document.body.removeChild(queryImg);

      const scores = [];

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const prodImg = document.createElement("img");
        prodImg.src = product.src;
        await new Promise((res) => (prodImg.onload = res));
        document.body.appendChild(prodImg);

        const prodEmbedding = await getEmbedding(prodImg);
        document.body.removeChild(prodImg);

        const simTensor = cosineSimilarity(queryEmbedding, prodEmbedding);
        const simValue = (await simTensor.data())[0];
        tf.dispose(simTensor);

        scores.push({ ...product, score: simValue });
        setProgress(((i + 1) / products.length) * 100);
      }

      scores.sort((a, b) => b.score - a.score);
      setResults(scores.slice(0, 10));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const handleClear = () => {
    setQueryImage(null);
    setResults([]);
    setProgress(0);
    setLoading(false);
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        backgroundImage: `url("/bg.jpeg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ NAVBAR */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 40px",
          color: "#060606ff",
          fontSize: "22px",
          fontWeight: "600",
          zIndex: 1000,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transition: "all 0.4s ease",
          backgroundColor: isScrolled
            ? "rgba(0, 0, 0, 0.75)"
            : "rgba(0, 0, 0, 0.25)",
          boxShadow: isScrolled
            ? "0 2px 10px rgba(0,0,0,0.4)"
            : "none",
        }}
      >
        {/* Left side - Logo or Title */}
        <div style={{ fontSize: "44px", fontWeight: "800" ,fontFamily:"cursive"}}>
          Visual Product Matcher
        </div>

        {/* Right side - Navigation Buttons */}
        <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <a
            href="#home"
            style={{
              color: "#0c0c0cff",
              textDecoration: "none",
              fontWeight: "550",
              transition: "color 0.3s",
               fontFamily:"cursive",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#4a90e2")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            Home
          </a>
          <a
            href="#products"
            style={{
              color: "#040404ff",
              textDecoration: "none",
              fontWeight: "550",
              fontFamily:"cursive",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#4a90e2")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            Products
          </a>
          <a
            href="#about"
            style={{
              color: "#000000ff",
              textDecoration: "none",
              fontWeight: "550",
              transition: "color 0.3s",
               fontFamily:"cursive",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#4a90e2")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            About
          </a>
          <button
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#118363ff",
              color: "black",
              fontWeight: "550",
              cursor: "pointer",
               fontFamily:"cursive",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#357ABD")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#4a90e2")
            }
          >
            Login
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "120px 20px 40px", // 🧠 extra top padding for navbar
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: "1000px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "35px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <Upload onUpload={handleImageUpload} />

          {(queryImage || results.length > 0) && (
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <button
                onClick={handleClear}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#f44336",
                  color: "white",
                   fontFamily:"cursive",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#14a573ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0d845aff")
                }
              >
                🔄 Clear / Upload Another
              </button>
            </div>
          )}

          {loading && (
            <>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#ddd",
                  borderRadius: "10px",
                  height: "12px",
                  marginTop: "25px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "#4a90e2",
                    height: "100%",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  color: "#333",
                  fontWeight: "500",
                   fontFamily:"cursive",
                }}
              >
                Processing images... {Math.floor(progress)}%
              </p>
            </>
          )}

          {!loading && results.length > 0 && (
            <Results results={results} queryImage={queryImage} />
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          marginTop:"20px",
          padding: "19px 0",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          width: "100%",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "500",
          backdropFilter: "blur(8px)",
           fontFamily:"cursive",
          WebkitBackdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        © 2025 Visual Matcher | Built by <b>Sindhu Tuppudu</b>
      </footer>
    </div>
  );
}

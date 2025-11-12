import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Upload({ onUpload }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #4a90e2",
        backgroundColor: "#f9fbff",
        borderRadius: "15px",
        padding: "40px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#eaf3ff";
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#f9fbff";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <input {...getInputProps()} />
      <p style={{ fontSize: "16px", color: "#333", margin: 0,fontFamily:"cursive" }}>
        <b>Drag & drop</b> an image here, or click to upload
      </p>
    </div>
  );
}





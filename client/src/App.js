import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card } from "antd";

function App() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getImages();
  }, []);
  const getImages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getImages");
      setImages(response?.data?.urls);
    } catch (error) {
      console.log(error);
      setError("Something went wrong...Please try again after sometimes...");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axios
        .post("http://localhost:3001/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          getImages();
          fileInputRef.current.value = "";
        });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="App">
      <div className="imgupload">
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ marginBottom: "1rem" }}
            required
          />
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Upload
          </button>
          {error && <div>{error}</div>}
        </form>
      </div>
      {error ? (
        <p style={{ color: "red" }} className="text-center">
          {error}
        </p>
      ) : (
        ""
      )}
      <div className="cards">
        {images
          ? images?.map((data, index) => {
              return (
                <div key={index}>
                  <Card
                    hoverable
                    style={{
                      display: "grid",
                      gridGap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        alt="uploadedImg"
                        src={data}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  </Card>
                </div>
              );
            })
          : "No image found"}
      </div>
    </div>
  );
}

export default App;

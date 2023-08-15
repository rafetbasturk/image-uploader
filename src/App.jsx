import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { DropZone, DroppedImage, Footer, Modal, Title } from "./components";

const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

function App() {
  const [url, setUrl] = useState("");
  const [alert, setAlert] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileRef = useRef(null);

  const handleUpload = async () => {
    if (!fileRef.current) return;
    try {
      const formData = new FormData();
      formData.append("file", fileRef.current);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESET_NAME
      );
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/upload`,
        formData
      );
      setUrl(data.secure_url);
      fileRef.current = null;
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (allowedTypes.includes(e.dataTransfer.files[0]?.type)) {
      fileRef.current = e.dataTransfer.files[0];
      setIsUploading(true);
      handleUpload();
    } else {
      setIsDragActive(false);
      setAlert(true);
    }
  };

  const handleChange = (e) => {
    setIsUploading(true);
    fileRef.current = e.target.files[0];
    handleUpload();
  };

  useEffect(() => {
    if (alert) {
      const id = setTimeout(() => {
        setAlert(false);
      }, 3000);
      return () => clearTimeout(id);
    }
  }, [alert]);

  return (
    <>
      {isUploading ? (
        <Modal />
      ) : (
        <section className="container">
          {url && <FaCheckCircle className="icon" />}

          <Title url={url} alert={alert} />

          {!url ? (
            <DropZone
              handleDrop={handleDrop}
              handleChange={handleChange}
              isDragActive={isDragActive}
              setIsDragActive={setIsDragActive}
            />
          ) : (
            <DroppedImage url={url} />
          )}
        </section>
      )}
      <Footer />
    </>
  );
}

export default App;

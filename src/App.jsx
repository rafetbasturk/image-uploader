import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { fetchApi } from "./config/axios";
import { DropZone, DroppedImage, Footer, Modal, Title } from "./components";

const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

function App() {
  const [image, setImage] = useState(null);
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
      const { data } = await fetchApi.post(`/upload`, formData);
      setImage({
        url: data.secure_url,
        public_id: data.public_id.split("/")[1],
      });
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
      setIsUploading(true);
      setAlert(true);
    }
  };

  const handleChange = (e) => {
    if (allowedTypes.includes(e.target.files[0]?.type)) {
      fileRef.current = e.target.files[0];
      setIsUploading(true);
      handleUpload();
    } else {
      setAlert(true);
    }
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
          {image && <FaCheckCircle className="icon" />}

          <Title url={image?.url} alert={alert} />

          {!image ? (
            <DropZone
              handleDrop={handleDrop}
              handleChange={handleChange}
              isDragActive={isDragActive}
              setIsDragActive={setIsDragActive}
            />
          ) : (
            <DroppedImage image={image} />
          )}
        </section>
      )}
      <Footer />
    </>
  );
}

export default App;

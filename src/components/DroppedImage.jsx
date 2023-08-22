import { AdvancedImage, placeholder } from "@cloudinary/react";
import { useEffect, useState } from "react";
import { cld } from "../config/cloudinary";

const DroppedImage = ({ image }) => {
  const [isCopied, setIsCopied] = useState(false);
  const img = cld.image(`drag-and-drop-challenge/${image?.public_id}`);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(image?.url);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
      return () => clearTimeout(id);
    }
  }, [isCopied]);

  return (
    <>
      <AdvancedImage
        cldImg={img}
        className="dropped"
        alt="uploaded image"
        plugins={[placeholder({ mode: "blur" })]}
      />
      <div className="link-container">
        <p className="link">{image?.url}</p>
        <button type="button" className="copy" onClick={copyToClipboard}>
          Copy link
        </button>
        {isCopied && <div className="copied">Copied to clipboard!</div>}
      </div>
    </>
  );
};
export default DroppedImage;

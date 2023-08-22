import { AdvancedImage, placeholder } from "@cloudinary/react";
import { cld } from "../config/cloudinary";
import CopyLink from "./CopyLink";

const DroppedImage = ({ image }) => {
  const img = cld.image(`drag-and-drop-challenge/${image?.public_id}`);

  return (
    <>
      <AdvancedImage
        cldImg={img}
        className="dropped"
        alt="uploaded image"
        plugins={[placeholder({ mode: "blur" })]}
      />
      <CopyLink url={image?.url} />
    </>
  );
};
export default DroppedImage;

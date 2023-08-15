import { useEffect, useState } from "react";

const DroppedImage = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
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
      <img className="dropped" src={url} alt="uploaded image" />
      <div className="link-container">
        <p className="link">{url}</p>
        <button type="button" className="copy" onClick={copyToClipboard}>
          Copy link
        </button>
        {isCopied && <div className="copied">Copied to clipboard!</div>}
      </div>
    </>
  );
};
export default DroppedImage;

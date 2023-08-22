import { useEffect, useState } from "react";

const CopyLink = ({ url }) => {
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
    <div className="link-container">
      <p className="link">{url}</p>
      <button type="button" className="copy" onClick={copyToClipboard}>
        Copy link
      </button>
      {isCopied && <div className="copied">Copied to clipboard!</div>}
    </div>
  );
};
export default CopyLink;

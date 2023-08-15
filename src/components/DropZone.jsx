import image from "/image.png";

const DropZone = ({
  handleDrop,
  handleChange,
  isDragActive,
  setIsDragActive,
}) => {
  return (
    <>
      <div className="drop-zone-container">
        <div
          className={`drop-zone ${isDragActive && "active"}`}
          onDragEnter={() => setIsDragActive(true)}
          onDragLeave={() => setIsDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        ></div>
        <div className={`drop ${isDragActive && "active"}`}>
          <img src={image} alt="drag and drop" />
          <p>
            {isDragActive
              ? "Leave Your File Here"
              : "Drag & Drop your image here"}
          </p>
        </div>
      </div>

      <span>Or</span>

      <label className="file-upload">
        <input type="file" onChange={handleChange} />
        Choose a file
      </label>
    </>
  );
};
export default DropZone;

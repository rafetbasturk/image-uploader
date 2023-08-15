import Alert from "./Alert";

const Title = ({ url, alert }) => {
  return (
    <>
      <h2 className="title">
        {!url ? "Upload your image" : "Uploaded successfully!"}
      </h2>

      {!url && !alert && <p>File should be Jpeg, Png,...</p>}

      {alert && <Alert />}
    </>
  );
};
export default Title;

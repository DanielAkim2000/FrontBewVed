import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="d-flex rounded bg-body-secondary w-75 m-auto justify-content-center align-items-center flex-row flex-wrap text-center gap-5 " style={{height:200}}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;

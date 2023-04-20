import Alert from "react-bootstrap/Alert";

const NotFound = () => {
  return (
    <>
      <Alert variant="danger" className="mt-3">
        <Alert.Heading> 404 - Not Found!</Alert.Heading>
        <p>You don't have permisson to acess this route.</p>
      </Alert>
    </>
  );
};
export default NotFound;

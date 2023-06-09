import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
const PrivateRoutes = (props) => {
  s;
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>You don't have permisson to acess this route.</p>
      </Alert>
    );
  }
  return <>{props.children}</>;
};
export default PrivateRoutes;

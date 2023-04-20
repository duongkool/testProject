import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import TableUsers from "../components/TableUser";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoute";
import NotFound from "../components/NotFound";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        ></Route>
      </Routes>
    </>
  );
};
export default AppRoutes;

/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { loginContext } = useContext(UserContext);

  useEffect (()=>{
    loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
  },[])
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes/>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;

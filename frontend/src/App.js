import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home.js";
import Signin from "./pages/Signin.js";
import Body from "./Components/Body.js";
import Notfound from "./Components/Notfound.js";
import "./style/Table.css";

function App() {
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  
  const fetchuser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getcookie`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      setIsAuthorized(response.ok);
    } catch (error) {
      //console.log(error);
    }
  };

  React.useEffect(() => {
    fetchuser();
  }, []);

  const handleSignIn = (authorized) => setIsAuthorized(authorized);
  const handleLogout = () => setIsAuthorized(false);
  
  return (
    <div>
      <Body />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthorized ? (
                <Navigate to="/home" />
              ) : (
                <Signin onSignIn={handleSignIn} />
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthorized ? (
                <Home onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

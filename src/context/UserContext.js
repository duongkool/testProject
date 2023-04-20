import React from "react";
import { useState } from "react";

const UserContext = React.createContext({ email: '', auth: false });
const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ email: '', auth: false });
  
    // Login updates the user data with a name parameter
    const loginContext = (email, token) => {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      setUser((user) => ({
        email: email,
        auth: true,    
      }));
    };
  
    // Logout updates the user data     to default
    const logout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      setUser((user) => ({
        email: '',
        auth: false,
      }));
    };
  
    return (
      <UserContext.Provider value={{ user, loginContext, logout }}>
        {children}
      </UserContext.Provider>
    );
  }
  export {UserContext, UserProvider }

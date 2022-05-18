import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userData}) =>{
  return(
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? 
          (<>
            <Route path="/" element={<Home userData={userData}/>} />
            <Route path="/profile" element={<Profile />} />
          </>) : <Route path="/" element={<Auth />} />}
      </Routes>
    </Router>
  );
};

export default AppRouter;
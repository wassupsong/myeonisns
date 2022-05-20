import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import Talk from "routes/Talk";

const AppRouter = ({ refreshUser, isLoggedIn, userData }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userData={userData} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userData={userData} />} />
            <Route
              path="/profile"
              element={
                <Profile refreshUser={refreshUser} userData={userData} />
              }
            />
            <Route path="/talk" element={<Talk userData={userData} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;

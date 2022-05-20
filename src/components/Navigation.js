import { Link, useLocation } from "react-router-dom";
import {
  FaUserAlt,
  FaRegComment,
  FaRegComments,
  FaHeadset,
  FaPen,
} from "react-icons/fa";
import { useState } from "react";
import MyeonisFactory from "./MyeonisFactory";

const Navigation = ({ userData }) => {
  const [isWriting, setIsWriting] = useState(false);
  const writing = () => setIsWriting((prev) => !prev);
  return (
    <>
      {isWriting && <MyeonisFactory userData={userData} writing={writing} />}
      <nav className="navigation">
        <div>
          <FaRegComment className="nav_icon" />
          <Link to="/" className="link">
            Myeoni
          </Link>
        </div>
        <ul>
          {useLocation().pathname === "/" ? (
            <li onClick={writing}>
              <FaPen className="nav_icon" />
            </li>
          ) : null}
          <li>
            <Link to="/profile" className="link">
              <FaUserAlt className="nav_icon" />
            </Link>
          </li>
          <li>
            <Link to="/talk" className="link">
              <FaRegComments className="nav_icon" />
            </Link>
          </li>
          <li>
            <Link to="/service" className="link">
              <FaHeadset className="nav_icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;

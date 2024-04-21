import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [openUserOptions, setOpenUserOptions] = useState(false);

  const { pathname } = useLocation();

  const { logout, currentUser } = useContext(AuthContext);

  const isActive = () => {
    window.scrollY > 0 ? setActiveMenu(true) : setActiveMenu(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className={activeMenu || pathname !== "/" ? "navbar active" : "navbar"}
    >
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span className="no-mobile">Fiverr Business</span>
          <span className="no-mobile">Explore</span>
          <span className="no-mobile">English</span>
          <Link to="/gigs?cat=">Gigs</Link>
          {!currentUser && (
            <Link to="/register">
              <span className="no-mobile">Sign up</span>
            </Link>
          )}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (
            <Link to="/login">
              <button>Join</button>
            </Link>
          )}
          {currentUser && (
            <div className="user">
              <img
                src={currentUser.img || "/assets/noavatar.jpg"}
                alt={currentUser.username}
              />
              <span
                className="username"
                onClick={() => setOpenUserOptions(!openUserOptions)}
              >
                {currentUser.username}
              </span>
              {openUserOptions && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link to="/my-gigs">Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <Link onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(activeMenu || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <div className="container">
              <Link to="/">Graphics & Design</Link>
              <Link to="/">Video & Animation</Link>
              <Link to="/">Writing & Translation</Link>
              <Link to="/">AI Services</Link>
              <Link to="/">Digital Marketing</Link>
              <Link to="/">Music & Audio</Link>
              <Link to="/">Programming & Tech</Link>
              <Link to="/">Business</Link>
              <Link to="/">Lifestyle</Link>
            </div>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;

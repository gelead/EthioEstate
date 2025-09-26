import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        {/* Desktop menu */}
        <div className="flexCenter h-menu">
          <NavLink to="/properties">Properties</NavLink>
          <a href="mailto:geleadw@gmail.com">Contact</a>

          {isAuthenticated ? (
            <ProfileMenu user={user} logout={logout} />
          ) : (
            <button className="button" onClick={() => loginWithRedirect()}>
              Login
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>

        {/* Mobile menu dropdown */}
        {menuOpened && (
          <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
            <div className="mobile-menu" style={getMenuStyles(menuOpened)}>
              <NavLink to="/properties" onClick={() => setMenuOpened(false)}>
                Properties
              </NavLink>
              <a
                href="mailto:geleadw@gmail.com"
                onClick={() => setMenuOpened(false)}
              >
                Contact
              </a>
              {isAuthenticated ? (
                <ProfileMenu user={user} logout={logout} />
              ) : (
                <button
                  className="button"
                  onClick={() => {
                    loginWithRedirect();
                    setMenuOpened(false);
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </OutsideClickHandler>
        )}
      </div>
    </section>
  );
};

export default Header;

import React, { useState } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authState";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <>
      <nav>
        <div className="logo">FOODIE </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </Link>
            ))}
          </div>
          {user ? (
            <button className="menuBtn" onClick={logout}>
              Logout
            </button>
          ) : (
            <button className="menuBtn" onClick={() => navigate('/login')}>
              Login
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
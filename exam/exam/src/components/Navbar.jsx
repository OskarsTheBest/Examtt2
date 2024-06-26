import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMenuOutline as MenuIcon, IoLogOutOutline as LogoutIcon } from 'react-icons/io5';
import classes from './style.module.css';
import { LINKS } from '../data';
import Sidebar from './Sidebar/Sidebar';
import AuthContext from './AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); 
    logout();
    navigate("/"); 
  };

  return (
    <header>
      <div className={classes.navbar}>
        <div className={classes.logo}>
          <NavLink to='/'>OTools</NavLink>
        </div>
        <div className={classes.links}>
          {LINKS.filter(link => !isAuthenticated || link.name !== 'Login').map(link => (
            link.name !== 'History' && (
              link.subLinks ? (
                <div key={link.name} className={classes.nonClickableLink}>
                  {link.name}
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) => (isActive ? classes.activeLink : '')}
                >
                  {link.name}
                </NavLink>
              )
            )
          ))}
          {isAuthenticated && (
            <>
              <NavLink to="/history" activeClassName={classes.activeLink}>History</NavLink>
              <button className={classes.logoutBtn} onClick={handleLogout}>
                <LogoutIcon size={30} />
              </button>
            </>
          )}
        </div>
        <div className={classes.menuBtn} onClick={openSidebar}>
          <MenuIcon size={30} />
        </div>
      </div>
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
    </header>
  );
};

export default Navbar;

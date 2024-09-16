import { useState } from "react";
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleMouseEnter = () => {
    setIsOpen(true); // Sidebar se abre
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // Sidebar se cierra
  };

  return (
    <div
      className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo */}
      <div className="sidebar__logo">
        <img src="logo.png" alt="Logo" />
      </div>

      {/* Menu */}
      <ul className="sidebar__menu">
        <li><i className="icon-home"></i> Home</li>
        <li><i className="icon-dashboard"></i> Dashboard</li>
        <li><i className="icon-products"></i> Products</li>
        <li><i className="icon-analytics"></i> Analytics</li>
        <li><i className="icon-schedules"></i> Schedules</li>
        <li><i className="icon-history"></i> History</li>
        <li><i className="icon-sales"></i> Sales</li>
      </ul>

      {/* Login Section */}
      <div className="sidebar__login">
        <button className="login__button">Login</button>
      </div>
    </div>
  );
};

export default Sidebar;

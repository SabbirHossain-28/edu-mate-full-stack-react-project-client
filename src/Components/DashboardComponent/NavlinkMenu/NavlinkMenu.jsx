import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavlinkMenu = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
    className={({ isActive }) =>
      `flex items-center px-4 py-2 my-5 rounded-xl font-poppin gap-2 font-medium  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
        isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
      }`
    }
      to={address}
    >
      <Icon className="text-xl"></Icon>{label}
    </NavLink>
  );
};

NavlinkMenu.propTypes={
    label:PropTypes.string,
    address:PropTypes.string,
    icon:PropTypes.elementType,
}
export default NavlinkMenu;

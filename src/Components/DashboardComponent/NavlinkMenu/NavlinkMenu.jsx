import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavlinkMenu = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      className="text-lg text-white font-medium"
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

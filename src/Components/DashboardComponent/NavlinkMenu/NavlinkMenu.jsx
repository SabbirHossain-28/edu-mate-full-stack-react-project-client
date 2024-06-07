import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavlinkMenu = ({ label, address, icon: Icon }) => {
    console.log(Icon);
  return (
    <NavLink
      className="text-lg text-white font-medium flex items-center gap-2"
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

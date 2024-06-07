import { SiSololearn, SiGoogleclassroom } from "react-icons/si";
import { FaList, FaUserGraduate } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import NavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/NavlinkMenu";

const DashboardLayout = () => {
  const [role] = useRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-base-green drawer-button lg:hidden"
        >
          <FaList className="text-xl text-base-orange"></FaList>
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu justify-between p-4 w-72 min-h-full bg-base-green text-base-content">
          <div>
            <div className="flex items-center justify-center my-4">
              <SiSololearn className="text-[#F2871D] text-3xl"></SiSololearn>
              <h2 className="text-3xl text-[#F2871D] font-pop font-bold ">
                EduMate
              </h2>
            </div>
            <li>
              <NavlinkMenu
                label={"My Enroll Class"}
                address={"/dashboard/myClasses"}
                icon={SiGoogleclassroom}
              ></NavlinkMenu>
            </li>
          </div>
          <div>
          <li>
              <NavlinkMenu
                label={"My Profile"}
                address={"/dashboard/studentProfile"}
                icon={FaUserGraduate}
              ></NavlinkMenu>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

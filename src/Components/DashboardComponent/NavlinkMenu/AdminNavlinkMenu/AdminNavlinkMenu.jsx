import NavlinkMenu from "../NavlinkMenu";
import { TbGitPullRequest } from "react-icons/tb";
import { FaUsersGear } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";

const AdminNavlinkMenu = () => {
  return (
    <>
      <NavlinkMenu
        label={"Teacher Request"}
        address={"/dashboard/teacherRequest"}
        icon={TbGitPullRequest}
      ></NavlinkMenu>
      <NavlinkMenu
        label={"All Users"}
        address={"/dashboard/allUsers"}
        icon={FaUsersGear}
      ></NavlinkMenu>
      <NavlinkMenu
        label={"All Classes"}
        address={"/dashboard/classes"}
        icon={SiGoogleclassroom}
      ></NavlinkMenu>
    </>
  );
};

export default AdminNavlinkMenu;

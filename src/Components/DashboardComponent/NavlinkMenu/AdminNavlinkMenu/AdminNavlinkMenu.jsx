import NavlinkMenu from "../NavlinkMenu";
import { TbGitPullRequest } from "react-icons/tb";
import { FaUsersGear } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";

const AdminNavlinkMenu = () => {
    return (
        <>
        <NavlinkMenu label={"Teacher Request"} address={"/dasshboard/teacherRequest"} icon={TbGitPullRequest}></NavlinkMenu>
        <NavlinkMenu label={"All Users"} address={"/dasshboard/allUsers"} icon={FaUsersGear}></NavlinkMenu>
        <NavlinkMenu label={"All Classes"} address={"/dasshboard/classes"} icon={SiGoogleclassroom}></NavlinkMenu>
        </>
    );
};

export default AdminNavlinkMenu;
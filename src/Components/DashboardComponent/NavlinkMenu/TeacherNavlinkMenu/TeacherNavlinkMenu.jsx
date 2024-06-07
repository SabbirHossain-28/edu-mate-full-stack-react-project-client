import NavlinkMenu from "../NavlinkMenu";
import { FaAddressCard } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

const TeacherNavlinkMenu = () => {
    return (
        <>
        <NavlinkMenu label={"Add Class"} address={"/dashboard/addClass"} icon={FaAddressCard}></NavlinkMenu>
        <NavlinkMenu label={"My Class"} address={"/dashboard/myClass"} icon={SiGoogleclassroom}></NavlinkMenu>
        </>
    );
};

export default TeacherNavlinkMenu;
import NavlinkMenu from "../NavlinkMenu";
import { MdClass } from "react-icons/md";
import { SiHtmlacademy } from "react-icons/si";

const StudentNavlinkMenu = () => {
    return (
        <>
        <NavlinkMenu label={"My Enroll Class"} address={"/dashboard/enrollClasses"} icon={MdClass}></NavlinkMenu>
        <NavlinkMenu label={"My Order"} address={"/dashboard/myOrder"} icon={SiHtmlacademy}></NavlinkMenu>
        </>
    );
};

export default StudentNavlinkMenu;
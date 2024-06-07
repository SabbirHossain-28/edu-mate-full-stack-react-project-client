import NavlinkMenu from "../NavlinkMenu";
import { MdClass } from "react-icons/md";

const StudentNavlinkMenu = () => {
    return (
        <>
        <NavlinkMenu label={"My Enroll Class"} address={"/dashboard/enrollClass"} icon={MdClass}></NavlinkMenu>
        </>
    );
};

export default StudentNavlinkMenu;
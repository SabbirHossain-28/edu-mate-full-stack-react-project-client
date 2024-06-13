import Authority from "../../Components/Authority/Authority";
import Banner from "../../Components/Banner/Banner";
import EduMateFaq from "../../Components/EduMateFaq/EduMateFaq";
// import FAQ from "../../Components/EduMateFaq/EduMateFaq";
import Feedback from "../../Components/Feedback/Feedback";
import Partners from "../../Components/Partners/Partners";
import Teaching from "../../Components/Teaching/Teaching";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <Teaching></Teaching>
            <Feedback></Feedback>
            <Authority></Authority>
            {/* <FAQ></FAQ> */}
            <EduMateFaq></EduMateFaq>
        </div>
    );
};

export default Home;
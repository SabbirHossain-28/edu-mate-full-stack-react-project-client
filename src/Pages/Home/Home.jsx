import Authority from "../../Components/Authority/Authority";
import Banner from "../../Components/Banner/Banner";
import EduMateFaq from "../../Components/EduMateFaq/EduMateFaq";
import EduMateStats from "../../Components/EduMateStats/EduMateStats";
import Feedback from "../../Components/Feedback/Feedback";
import Partners from "../../Components/Partners/Partners";
import PopularClass from "../../Components/PopularClass/PopularClass";
import Teaching from "../../Components/Teaching/Teaching";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <Teaching></Teaching>
            <Feedback></Feedback>
            <Authority></Authority>
            <PopularClass></PopularClass>
            <EduMateStats></EduMateStats>
            <EduMateFaq></EduMateFaq>
        </div>
    );
};

export default Home;
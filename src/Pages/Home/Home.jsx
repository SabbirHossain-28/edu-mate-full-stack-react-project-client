import Authority from "../../Components/Authority/Authority";
import Banner from "../../Components/Banner/Banner";
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
        </div>
    );
};

export default Home;
import Header from "../../components/header"
import { Footer } from "../../components/footer";
import background from '../../images/ssps_homepage.jpg'
export const HomePage = () => {
    return (
        <>
            <Header/>
            <div className="h-[75vh] justify-center items-center flex">
                <img src={background} className="w-[70%]"></img>
            </div>
            <Footer/>
        </>
    );
}
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import TrendsForYou from "../components/TrendsForYou";
import WhoToFollow from "../components/WhoToFollow";
import TweepSomething from "../components/TweepSomething";
import mui from '@mui/icons-material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
let Home=()=>{
    return (
        <div className="bg-[#F2F2F2] h-auto overflow-x-hidden">
            <Navbar/>
            <div className="w-full h-3/4 mt-10 px-52">
                <div className="w-full h-auto flex justify-between">
                    {/* main */}
                    <div>
                        <TweepSomething />
                        <Post/>
                        <Post/>
                    </div>
                    {/* main */}
                    {/* side banners */}
                    <div className="">
                         <TrendsForYou/>
                         <WhoToFollow/> 
                         <ChatBubbleOutlineIcon/>  
                    </div>    
                    {/* side banners */}
                </div>
            </div>
        </div>
    )
}

export default Home
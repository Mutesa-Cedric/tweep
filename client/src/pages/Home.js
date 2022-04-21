import Navbar from "../components/Navbar";
import '../App.css';
import Post from "../components/Post";
import TrendsForYou from "../components/TrendsForYou";
import WhoToFollow from "../components/WhoToFollow";
import TweepSomething from "../components/TweepSomething";
import React,{useState,useEffect} from "react";
import post from "../images/post.jpg";
import post2 from "../images/post2.jpg";
import tweeper from "../images/tweeper.jpg";
import Lois from "../images/Lois.jpg";


let Home=(props)=>{

    // fixing who to follow section
    const [fixSide, setFixSide] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll",()=>{
           if(window.scrollY>510){
               setFixSide(true)
           }else{
               setFixSide(false)
           }
        })
    })

    // fixing who to follow section

    return (
        
        <div className={props.darkMode?"bg-[#252329] h-auto overflow-x-hidden":"bg-[#F2F2F2] h-auto overflow-x-hidden"}>
            <Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode}/>
            <div className="w-full h-3/4 mt-20 px-52">
                <div className="w-full h-auto flex justify-between">
                    {/* main */}
                    <div>
                        <TweepSomething darkMode={props.darkMode}/>
                        <Post darkMode={props.darkMode} name="Peyton Lyons" profile={tweeper} createdAt='24 August at 20:43' text="Traveling-it leaves you speechless, then turns you into a storyteller." img={post} comments={449} retweeps={59004} saves={234}/>
                        <Post darkMode={props.darkMode} name="Bianca Lois" profile={Lois} createdAt='24 August at 20:43' text="“We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin" img={post2} comments={208} retweeps={2764} saves={178}/>
                        <Post darkMode={props.darkMode} name="Mikael Stanley" createdAt='13 September at 12:41' text="Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs" comments={23} retweeps={10} saves={20}/>
                    </div>
                    {/* main */}
                    {/* side banners */}
                    <div className="">
                         <TrendsForYou darkMode={props.darkMode}/>
                         <WhoToFollow fixSide={fixSide} darkMode={props.darkMode}/> 
                    </div>    
                    {/* side banners */}
                </div>
            </div>
        </div>
    )
}

export default Home
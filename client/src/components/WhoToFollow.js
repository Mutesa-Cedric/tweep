import WomanImg from "../images/Woman.jpg";
import tweeper from "../images/tweeper.jpg";
import cover1 from "../images/cover1.jpg";
import cover2 from "../images/cover2.jpg";
import Lois from "../images/Lois.jpg";

import PersonToFollow from "./PersonToFollow";

let WhoToFollow=(props)=>{
    return (
        <div className={props.fixSide?"w-[306px] h-auto top-[64px]  fixed  bg-white mt-6 rounded-xl shadow-sm px-6 py-2":"w-[306px] h-auto  bg-white mt-6 rounded-xl shadow-sm px-6 py-2"}>
            <div className="w-full border-b-[1.5px] flex">
                <p className="mb-2 pt-3 font-[600] text-[14px] ">Who to follow</p>
            </div>
            <PersonToFollow isFirst={true} profile={tweeper} followers={230} bio="Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰" coverPhoto={cover1} name="Peyton Lyons"/>
            <PersonToFollow profile={Lois} followers={200} bio="Follow me on IG: @bilois" coverPhoto={cover2} name="Bianca Lois "/>
        </div>
    )
}
export default WhoToFollow
import ManImg from "../images/Man.jpg";
let TweepSomething=(props)=>{
    return (
        <div className="w-[745px] mb-10 bg-white h-[155px] shadow-sm rounded-xl px-6">
            <div className="w-full border-b-[1.5px]">
                <p className="text-[#4F4F4F] font-[600] text-[14px] py-2">Tweep something</p>
            </div>
            <div className="flex items-center mt-3">
                <img src={ManImg} alt="profile" className="w-[36px] h-[36px] rounded-md mr-4"/>
                <input placeholder="what 's happening?" className="placeholder:text-[#BDBDBD]"/>
            </div>
            <div className="w-full mt-6 h-auto pl-12 flex items-center justify-between">
                <div className="w-full ">
                    <p className="text-[#2F80ED] text-[14px] cursor-pointer font-medium">Everyone can reply</p>
                </div>
                <div>
                    <button className="text-white text-[14px] font-medium bg-[#2F80ED] rounded-[4px] px-6 py-[6px]">Tweep</button>
                </div>
            </div>
        </div>
    )
}

export default TweepSomething;
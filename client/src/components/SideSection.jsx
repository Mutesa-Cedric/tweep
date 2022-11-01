
import React, { useState } from 'react';
const SideSection = (props) => {

    const [activeFilter, setActiveFilter] = useState("tweeps");

    return (
        <div className={props.fixLinks ? "sticky top-20" : ""}>
            <div id="expCategory" className={"bg-white  w-[304px] rounded-lg h-[220px] shadow-sm flex text-[#828282] flex-col justify-evenly px-4 dark:bg-inherit dark:text-gray-300 dark:border dark:border-gray-600 "}>
                <p className={activeFilter === "tweeps" ? "pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer" : "pl-4 text-[14px] cursor-pointer font-[600]"} onClick={() => setActiveFilter("tweeps")}>Tweeps</p>
                <p className={activeFilter === "replies" ? "pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer" : "pl-4 cursor-pointer text-[14px] font-[600]"} onClick={() => setActiveFilter("replies")}>Tweeps and replies</p>
                <p className={activeFilter === "media" ? "pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer" : "pl-4 text-[14px] font-[600] cursor-pointer"} onClick={() => setActiveFilter("media")}>Media</p>
                <p className={activeFilter === "likes" ? "pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer" : "pl-4 cursor-pointer text-[14px] font-[600]"} onClick={() => setActiveFilter("likes")}>Likes</p>
            </div>
        </div>
    )
}

export default SideSection;
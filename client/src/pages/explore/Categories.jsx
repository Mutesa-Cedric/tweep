
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom"
const Categories = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState(location.search.slice(8));
    
    return (
        <div id="expCategory" className={"bg-white  w-[304px] fixed rounded-lg h-[220px] shadow-sm flex text-[#828282] flex-col justify-evenly px-1 dark:text-gray-300 dark:bg-inherit dark:shadow-lg"}>
            <Link to={'/explore?filter=top'}>
                <p className={activeCategory === "top" ? "pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer" : "pl-4 text-[14px] cursor-pointer font-[600]"} onClick={() => setActiveCategory("top")}>Top</p>
            </Link>
            <Link to={'/explore?filter=latest'}>
                <p className={activeCategory === "latest" ? "pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer" : "pl-4 cursor-pointer text-[14px] font-[600]"} onClick={() => setActiveCategory("latest")}>Latest</p>
            </Link>
            <Link to={'/explore?filter=people'}>
                <p className={activeCategory === "people" ? "pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer" : "pl-4 text-[14px] font-[600] cursor-pointer"} onClick={() => setActiveCategory("people")}>People</p>
            </Link>

            <Link to={'/explore?filter=media'}>
                <p className={activeCategory === "media" ? "pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer" : "pl-4 cursor-pointer text-[14px] font-[600]"} onClick={() => setActiveCategory("media")}>Media</p>
            </Link>
        </div>
    )
}

export default Categories
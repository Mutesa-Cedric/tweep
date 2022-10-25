
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
const Categories=(props)=>{

    //managing current link
    const [isLatest, setIsLatest] = useState(false)
    const [isPeople, setIsPeople] = useState(false)
    const [isMedia, setIsMedia] = useState(false)
    const [isTop, setIsTop] = useState(true)

    let toLatest=()=>{
        setIsLatest(true)
        setIsPeople(false)
        setIsMedia(false)
        setIsTop(false)
    }

    let toTop=()=>{
        setIsLatest(false)
        setIsPeople(false)
        setIsMedia(false)
        setIsTop(true)
    }

    let toPeople=()=>{
        setIsLatest(false)
        setIsPeople(true)
        setIsMedia(false)
        setIsTop(false)
    }

    let toMedia=()=>{
        setIsLatest(false)
        setIsPeople(false)
        setIsMedia(true)
        setIsTop(false)
    }

    //managing current link

    return (
        <div id="expCategory" className={props.darkMode?"bg-inherit text-gray-300 w-[304px] fixed rounded-lg h-[220px] shadow-lg flex flex-col justify-evenly px-1":"bg-white  w-[304px] fixed rounded-lg h-[220px] shadow-sm flex text-[#828282] flex-col justify-evenly px-1"}>
            <Link to={'/explore/?filter=top'}>
                <p className={isTop?"pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer":"pl-4 text-[14px] cursor-pointer font-[600]"} onClick={toTop}>Top</p>
            </Link>
            <Link to={'/explore/?filter=latest'}>
                <p className={isLatest ?"pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer": "pl-4 cursor-pointer text-[14px] font-[600]"} onClick={toLatest}>Latest</p>
            </Link>
            <Link to={'/explore/?filter=people'}>
                <p className={isPeople?"pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer":"pl-4 text-[14px] font-[600] cursor-pointer"} onClick={toPeople}>People</p>
            </Link>

            <Link to={'/explore/?filter=media'}>
                <p className={isMedia?"pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer":"pl-4 cursor-pointer text-[14px] font-[600]"} onClick={toMedia}>Media</p>
            </Link>
        </div>
    )
}

export default Categories
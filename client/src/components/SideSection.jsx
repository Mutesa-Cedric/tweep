
import React, {useState} from 'react';
const SideSection=(props)=>{

    //managing current link
    const [isLatest, setIsLatest] = useState(false)
    const [isPeople, setIsPeople] = useState(false)
    const [isMedia, setIsMedia] = useState(false)
    const [isTweep, setIsTweep] = useState(true)
    let toLatest=()=>{
        setIsLatest(true)
        setIsPeople(false)
        setIsMedia(false)
        setIsTweep(false)
    }

    let toTop=()=>{
        setIsLatest(false)
        setIsPeople(false)
        setIsMedia(false)
        setIsTweep(true)
    }

    let toPeople=()=>{
        setIsLatest(false)
        setIsPeople(true)
        setIsMedia(false)
        setIsTweep(false)
    }

    let toMedia=()=>{
        setIsLatest(false)
        setIsPeople(false)
        setIsMedia(true)
        setIsTweep(false)
    }

    //managing current link

    return (
        <div className={props.fixLinks?"sticky top-20":""}>
            <div id="expCategory" className={props.darkMode?"bg-inherit text-gray-300 w-[304px]  rounded-lg h-[220px] shadow-lg flex flex-col justify-evenly px-1":"bg-white  w-[304px] rounded-lg h-[220px] shadow-sm flex text-[#828282] flex-col justify-evenly px-1"}>
                <p className={isTweep?"pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer":"pl-4 text-[14px] cursor-pointer font-[600]"} onClick={toTop}>Tweeps</p>
                <p className={isLatest ?"pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer": "pl-4 cursor-pointer text-[14px] font-[600]"} onClick={toLatest}>Tweeps and replies</p>
                <p className={isPeople?"pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer":"pl-4 text-[14px] font-[600] cursor-pointer"} onClick={toPeople}>Media</p>
                <p className={isMedia?"pl-4 text-[#2F80ED] border-l-[3px] border-[#2F80ED] text-[14px] font-[600] cursor-pointer":"pl-4 cursor-pointer text-[14px] font-[600]"} onClick={toMedia}>Likes</p>
            </div>    
        </div>  
    )
}

export default SideSection;

let TrendsForYou=(props)=>{
    return (
        <div className={props.darkMode?"w-[320px] h-[495px] bg-inherit shadow-xl rounded-xl px-6":"w-[320px] h-[495px] bg-white shadow-sm rounded-xl px-6"}>
            <div className="w-full border-b-[1.5px]">
                <p className={props.darkMode?"mb-2 pt-3 font-[600] text-[14px] text-white":"mb-2 pt-3 font-[600] text-[14px] "}>Trends for you</p>
            </div>
            <div className="my-5">
                <h1 className={props.darkMode?"font-[600] text-white mb-2":"font-[600] text-[#333333] mb-2"}>#programming</h1>
                <p className="text-[#828282] font-medium text-[14px]">213k Tweeps</p>
            </div>
            <div className="my-5">
                <h1 className={props.darkMode?"font-[600] text-white mb-2":"font-[600] text-[#333333] mb-2"}>#musicproduction</h1>
                <p className="text-[#828282] font-medium text-[14px]">178k Tweeps</p>
            </div> <div className="my-5">
                <h1 className={props.darkMode?"font-[600] text-white mb-2":"font-[600] text-[#333333] mb-2"}>#amiricangottalent</h1>
                <p className="text-[#828282] font-medium text-[14px]">220k Tweeps</p>
            </div> <div className="my-5">
                <h1 className={props.darkMode?"font-[600] text-white mb-2":"font-[600] text-[#333333] mb-2"}>#ukrainevsrussia</h1>
                <p className="text-[#828282] font-medium text-[14px]">107k Tweeps</p>
            </div> <div className="my-5">
                <h1 className={props.darkMode?"font-[600] text-white mb-2":"font-[600] text-[#333333] mb-2"}>#learnpython</h1>
                <p className="text-[#828282] font-medium text-[14px]">100k Tweeps</p>
            </div>                  
        </div>
    )
}

export default TrendsForYou;
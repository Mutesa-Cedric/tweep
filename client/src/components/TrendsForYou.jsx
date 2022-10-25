
const TrendsForYou=(props)=>{
    return (
        <div className={props.darkMode?"w-[320px] h-[495px]  bg-inherit shadow-xl rounded-xl px-6 lg:flex lg:flex-col sm:hidden md:hidden":"w-[320px] h-[495px] bg-white shadow-sm rounded-xl px-6 lg:flex lg:flex-col sm:hidden md:hidden"}>
            <div className="w-full border-b-[1.5px]">
                <p className={props.darkMode?"mb-2 pt-3 font-[600] text-[14px] text-white":"mb-2 pt-3 font-[600] text-[14px] "}>Trends for you</p>
            </div>
            <h1 className={"self-center my-36 text-xl text-gray-500 capitalize"}>no hashtags yet !</h1>
        </div>
    )
}

export default TrendsForYou;
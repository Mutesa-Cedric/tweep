
let PersonToFollow=(props)=>{
    return (
        <div>
            <div className="flex items-center my-4 justify-between">
                <div className="flex items-center">
                    <img src={props.profile} alt="woman" className="rounded-md mr-4  h-10 w-10"/>
                    <div className="flex flex-col">
                        <h1 className="font-medium">{props.name}</h1>
                        <p className="text-gray-300  text-[14px]">{props.followers}k followers</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="text-white bg-[#2F80ED] px-4 py-1 rounded-md capitalize">
                        follow
                    </button>
                </div>
            </div>
            <div className="flex items-center my-2">
                <p className="text-[#828282] text-[14px]">{props.bio}</p>
            </div>
            <div className={props.isFirst ? "border-b-2":""}>
                <img src={props.coverPhoto}  alt="cover" className="rounded-[8px] my-4 w-[265px] h-32 "/>
            </div>
        </div>
    )
}

export default PersonToFollow;
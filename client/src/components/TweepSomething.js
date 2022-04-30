import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

let TweepSomething=(props)=>{
    return (
        <div className={props.darkMode?"w-auto mb-10 bg-inherit  h-auto shadow-xl rounded-xl sm:mx-4 px-6":"w-auto sm:mx-4 mb-10 bg-white h-auto shadow-sm rounded-xl px-6"}>
            <div className="w-full border-b-[1.5px]">
                <p className={props.darkMode?"font-[600] text-[14px] py-2 text-white":"text-[#4F4F4F] font-[600] text-[14px] py-2"}>Tweep something</p>
            </div>
            <div className="flex items-center mt-3">
                {props.profileImg?<img src={props.profileImg} alt="profile" className="w-[36px] h-[36px] rounded-md mr-4"/>:<PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200" style={{fill:"#808080"}}/>}
                <textarea placeholder="what 's happening?" className={props.darkMode?"placeholder:text-[#BDBDBD] focus:outline-none text-white border-none w-full h-full bg-inherit":"placeholder:text-[#BDBDBD] focus:outline-none border-none w-full h-full bg-inherit"} onChange={props.handlePostData}/>
            </div>
            <div className="w-full mt-6 h-auto pl-12 flex items-center justify-between">
                <div className="w-full flex items-center mb-4">
                    {props.finalPostEdit?
                    <div className="relative flex">
                        <img src={props.image} alt="media" className="w-10 h-10"/>
                        <CancelIcon fontSize="small" style={{fill:"black"}} className="absolute left-7 hover:cursor-pointer   bottom-7"  onClick={props.cancelImage}/>
                    </div>
                            :
                    <label className=" w-20 mr-2 flex items-center h-max">
                         <ImageOutlinedIcon style={{fill:"#2F80ED"}} fontSize="small" className="cursor-pointer" />
                         <span className='text-[#2F80ED] mx-2 cursor-pointer'>photo</span>
                         <input type="file" className="opacity-0" onChange={props.handleImage}/>
                    </label>
                    
                    }
                    <PublicIcon style={{fill:"#2F80ED"}} fontSize="small" className="ml-2"/>
                    <p className="text-[#2F80ED] text-[14px] cursor-pointer font-medium">Everyone can reply</p>
                </div>
                <div>
                    <button className="text-white text-[14px] font-medium bg-[#2F80ED] rounded-[4px] px-6 py-[6px]" onClick={props.tweepPost}>Tweep</button>
                </div>
            </div>
        </div>
    )
}

export default TweepSomething;
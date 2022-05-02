import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonIcon from '@mui/icons-material/Person';

let Comment=(props)=>{
    return (
        <div className="flex my-2 py-4 pr-4 w-full">
            <div className='flex w-full'>
                {props.profileImg!==undefined && <img src={props.profileImg} alt="commentor" className="w-[36px] h-[36px] rounded-md mr-4" />}
                {props.profileImg===undefined && <PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200" style={{fill:"#808080"}}/> }
                <div className='flex flex-col w-full pl-2'>
                    <div className={props.darkMode?"flex flex-col justify-center bg-inherit shadow-md border-[0.2px] border-gray-700 px-2 py-1 rounded-md mb-2":'flex flex-col justify-center bg-[#FAFAFA] rounded-md mb-2'}>
                        <div className='flex items-center mb-2'>
                            <p className={props.darkMode?"font-medium mr-4 text-white":" font-medium mr-4"}>{props.name}</p>
                            <p className="text-[14px] text-[#929191]">on {props.createdAt}</p>
                        </div>
                        <div>
                            <p className={props.darkMode?"text-[#BDBDBD]":"text-[#4F4F4F]"}>{props.body}</p>
                        </div>
                    </div>
                    <div className="text-[12px] text-[#BDBDBD]  flex items-center">
                        <button className="hover:text-[#EB5757] flex items-center"><FavoriteBorderOutlinedIcon fontSize="inherit" className="mr-1 "/>like</button>
                        <span className="px-2 flex items-center">.</span>
                        <span>{props.likes} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
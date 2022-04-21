import Comment from "./Comment";
import commentor1 from "../images/commentor1.png"
import React ,{useState} from 'react';
import ManImg from "../images/Man.jpg";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import PersonIcon from '@mui/icons-material/Person';
import commentor2 from '../images/commentor2.jpg'
let Post=(props)=>{

    //showing comments
    const [showComments, setShowComments] = useState(false)
    const toggleShowComments=()=>{
        setShowComments(prevState=>{
            return !prevState
        })
    }

    return (
        <div className={props.darkMode?"bg-inherit shadow-xl border-[0.2px] border-gray-700 w-[745px] h-auto flex flex-col justify-between  mb-8 rounded-md pl-4 pr-6  py-4 ":"bg-inherit border-[1px] w-[745px] h-auto flex flex-col justify-between  mb-8 rounded-md pl-4 pr-6  py-4 "}>
            <div className="flex items-center justify-start my-2">
                {props.profile!==undefined && <img src={props.profile} alt="tweeper" className="w-[36px] h-[36px] rounded-md mr-4"></img>}
                {props.profile===undefined && <PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200" style={{fill:"#808080"}}/>}
                <div className="flex flex-col">
                    <h1 className={props.darkMode?"font-medium capitalize text-white":"font-medium capitalize text-black"}>{props.name}</h1>
                    <p className="text-[#BDBDBD] text-[14px]">{props.createdAt}</p>
                </div>
            </div>
            <div className="mb-4 mt-2 flex">
                <p className={props.darkMode?"text-[#BDBDBD]":"text-[#4F4F4F]"}>{props.text}</p>
            </div>
            {props.img!==undefined && <div className="flex object-cover h-[328px] ">
                <img src={props.img}  alt="post" className="rounded-md text-[#4F4F4F] w-full "/>
            </div>}
            <div className="flex text-[#BDBDBD] text-[13px] float-right border-b-[1.3px] items-center py-[6px] justify-end px-2">
                <p className="cursor-pointer mx-4" onClick={toggleShowComments}>{props.comments} Comments</p>
                <p className="cursor-pointer mx-4">{props.retweeps} Retweeps</p>
                <p className="cursor-pointer ">{props.saves} Saved</p>
            </div>
            <div className="w-full flex justify-between items-center py-1 border-b-[1.3px]">
                
                <button className={props.darkMode?"text-white flex hover:bg-black text-[14px] bg-inherit shadow-md px-8 hover: py-2 font-medium rounded-[8px]":"text-[#4f4f4f] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]"}><ChatBubbleOutlineOutlinedIcon fontSize="small" className="mr-2"/> Comment </button>
                <button className={props.darkMode?"text-white flex hover:bg-black text-[14px] bg-inherit shadow-md px-8 hover: py-2 font-medium rounded-[8px]":"text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]"}><CachedOutlinedIcon fontSize="small" className="mr-2"/>Retweep </button>
                <button className={props.darkMode?"text-white flex hover:bg-black text-[14px] bg-inherit shadow-md px-8 hover: py-2 font-medium rounded-[8px]":"text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]"}><FavoriteBorderOutlinedIcon fontSize="small" className="mr-2"/>Like</button>
                <button className={props.darkMode?"text-white flex hover:bg-black text-[14px] bg-inherit shadow-md px-8 hover: py-2 font-medium rounded-[8px]":"text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]"}><BookmarkAddOutlinedIcon fontSize="small" className="mr-2"/>Save</button>
            </div>
            <div className="flex items-center my-3">
                 <img src={ManImg} alt="profile" className="w-[36px] h-[36px] rounded-md mr-4"/>
                 <input placeholder="Tweep your reply" className={props.darkMode?"bg-inherit shadow-sm  w-full placeholder:text-[#BDBDBD] placeholder:font-medium placeholder:text-[14px] py-2 focus:outline-none   rounded-md border-none":"bg-[#FAFAFA] w-full placeholder:text-[#BDBDBD] placeholder:font-medium placeholder:text-[14px] py-2 focus:outline-none   rounded-md border-none"}/>
            </div>
           {showComments &&
           
            <div className="w-full h-72 border-t-2 overflow-y-scroll flex flex-col">
                <Comment 
                    darkMode={props.darkMode}
                    profileImg={commentor1}
                    name="Waqar Bloom"
                    createdAt="24 August at 20:43"
                    body="I’ve seen awe-inspiring things that I thought I’d never be able to explain to another person."
                    likes={20}
                />  
                <Comment
                    darkMode={props.darkMode}
                    likes={12}
                    createdAt="30 June at 11:35"
                    name="Marina deborah"
                    body="I’ve felt this pull many times, like while road tripping through Morocco. Seeking out the vastness of the desert, and looking inward at the same time."
                />
                <Comment 
                    darkMode={props.darkMode}
                    profileImg={commentor2}
                    name="Ish Kevin"
                    createdAt="19 september at 12:00"
                    body="I’ve seen awe-inspiring things that I thought I’d never be able to explain to another person."
                    likes={50}
                /> 
            </div>
           
           }
        </div>
    )
}

export default Post;
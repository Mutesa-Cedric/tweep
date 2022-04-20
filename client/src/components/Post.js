import Comment from "./Comment";
import tweeper from "../images/tweeper.jpg";
import post from "../images/post.jpg"
import ManImg from "../images/Man.jpg";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
let Post=(props)=>{
    return (
        <div className="bg-white border-[1px] w-auto h-auto flex flex-col justify-between  mb-8 rounded-md pl-4 pr-6  py-4 ">
            <div className="flex items-center justify-start my-2">
                <img src={tweeper} alt="tweeper" className="w-[36px] h-[36px] rounded-md mr-4"></img>
                <div className="flex flex-col">
                    <h1 className="font-medium capitalize">peyton Lyons</h1>
                    <p className="text-[#BDBDBD] text-[14px]">24 August at 20:43</p>
                </div>
            </div>
            <div className="mb-4 mt-2 flex">
                <p className="text-[#4F4F4F]">Traveling-it leaves you speechless, then turns you into a storyteller. </p>
            </div>
            <div className="flex object-cover h-[328px] ">
                <img src={post}  alt="post" className="rounded-md text-[#4F4F4F] w-full "/>
            </div>
            <div className="flex text-[#BDBDBD] text-[13px] float-right border-b-[1.3px] items-center py-[6px] justify-end px-2">
                <p className="mx-4">449 Comments</p>
                <p className="mx-4">59k Retweeps</p>
                <p className="">234 Saved</p>
            </div>
            <div className="w-full flex justify-between items-center py-1 border-b-[1.3px]">
                
                <button className="text-[#4f4f4f] hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-t2 font-medium rounded-[8px]"><ChatBubbleOutlineOutlinedIcon/> Comment </button>
                <button className="text-[#4F4F4F] hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]">Retweep </button>
                <button className="text-[#4F4F4F] hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]">Like</button>
                <button className="text-[#4F4F4F] hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]">Save</button>
            </div>
            <div className="flex items-center mt-2">
                 <img src={ManImg} alt="profile" className="w-[36px] h-[36px] rounded-md mr-4"/>
                 <input placeholder="Tweep your reply" className="bg-[#FAFAFA] w-full placeholder:text-[#BDBDBD] placeholder:font-medium placeholder:text-[14px] py-2 rounded-md"/>
            </div>
           {props.ShowComments && <Comment />}
        </div>
    )
}

export default Post;
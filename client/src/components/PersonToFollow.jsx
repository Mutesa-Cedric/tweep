import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import useAuth from '../hooks/useAuth';
import backgroundCover from '../images/background.png'
import profileAvatar from "../images/profileAvatar.png"
import axios from "../../axios.config"
const PersonToFollow = (props) => {
    const { user } = useAuth();

    const followUser = async () => {
        await axios.patch(`/profiles/updateFollowers/`, {
            follower: user.userName,
            following: props.name
        }).then(response => response.json()).then(data => {
            if (data.status === 200) {
                props.finishedFollowing()
            }
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className="flex border-t-[1.3px] pt-4 items-center my-4 justify-between">
                <div className="flex items-center">
                    {props.profileImage ? <img src={`${props.profileImage}`} alt="woman" className="rounded-md mr-4  h-10 w-10" /> : <img src={profileAvatar} alt="woman" className="rounded-md mr-4  h-10 w-10" />}
                    <div className="flex flex-col">
                        <h1 className={"font-medium dark:text-white"}>{props.userName}</h1>
                        <p className="text-gray-300  text-[14px]">{props.followers.length} followers</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="text-white bg-[#2F80ED] px-4 py-1 flex items-center justify-between rounded-md capitalize"
                        onClick={followUser}>
                        <PersonAddAlt1OutlinedIcon fontSize="small" className="mr-1" /> follow
                    </button>
                </div>
            </div>
            <div className="flex items-center my-2">
                <p className={"text-[#828282] text-[14px] dark:text-gray-300"}>{props.bio}</p>
            </div>
            <div className={props.isFirst ? "border-b-2" : ""}>
                {props.coverImage ? <img src={`${props.coverImage}`} alt="cover" className="rounded-[8px] my-4 w-[265px] h-32 " /> : <img src={backgroundCover} alt="cover" className="rounded-[8px] my-4 w-[265px] h-32 " />}
            </div>
        </div>
    )
}

export default PersonToFollow;
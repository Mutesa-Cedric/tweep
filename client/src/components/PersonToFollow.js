import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import backgroundCover from '../images/background.png'
import profileAvatar from "../images/profileAvatar.png"

let PersonToFollow=(props)=>{
    console.log(props.currentUser)
    const followUser=()=>{
        fetch(`https://mc-tweep.herokuapp.com/profiles/updateFollowers/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                follower: props.currentUser,
                following: props.name
            })
        }).then(response => response.json()).then(data => {
            if(data.status===200){
                props.finishedFollowing()
            }
        }).catch(err => console.log(err))
    }
    return (
        <div>
            <div className="flex border-t-[1.3px] pt-4 items-center my-4 justify-between">
                <div className="flex items-center">
                  {props.profile?  <img src={`${props.profile}`} alt="woman" className="rounded-md mr-4  h-10 w-10"/>:<img src={profileAvatar} alt="woman" className="rounded-md mr-4  h-10 w-10"/>}
                    <div className="flex flex-col">
                        <h1 className={props.darkMode?"font-medium text-white":"font-medium"}>{props.name}</h1>
                        <p className="text-gray-300  text-[14px]">{props.followers} followers</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="text-white bg-[#2F80ED] px-4 py-1 flex items-center justify-between rounded-md capitalize"
                            onClick={followUser}>
                        <PersonAddAlt1OutlinedIcon fontSize="small" className="mr-1"/> follow
                    </button>
                </div>
            </div>
            <div className="flex items-center my-2">
                <p className={props.darkMode?"text-gray-300 text-[14px]":"text-[#828282] text-[14px]"}>{props.bio}</p>
            </div>
            <div className={props.isFirst ? "border-b-2":""}>
                {props.coverPhoto?<img src={`${props.coverPhoto}`}  alt="cover" className="rounded-[8px] my-4 w-[265px] h-32 "/>:<img src={backgroundCover}  alt="cover" className="rounded-[8px] my-4 w-[265px] h-32 "/>}
            </div>
        </div>
    )
}

export default PersonToFollow;
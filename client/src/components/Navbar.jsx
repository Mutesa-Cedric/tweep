import {Link,useNavigate} from "react-router-dom"
import React, {useState,useEffect} from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonIcon from '@mui/icons-material/Person';

import '../App.css';
let Navbar=(props)=>{
    const [profileImage, setProfileImage] = useState('')
    const [hasProfileImage, setHasProfileImage] = useState(false)

    //getting profile of a user
    fetch(`https://mc-tweep.herokuapp.com/profiles/${props.userName}`).then(res => res.json()).then(data => {
        // console.log(data.profile)
        if(data.profile.profileImage){
            setProfileImage(data.profile.profileImage)
            setHasProfileImage(true)
        }
    },[])
    
    //getting profile of a user

    //showing or hiding dropdown
    let navigate=useNavigate()
    const [showDropDown, setShowDropDown] = useState(false)
    const toggleDropDown=()=>{
        setShowDropDown(prevState=>{
            return !prevState
        })
    }

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            setShowDropDown(()=>{
                return false;
            })
        })
    })

    const logout=()=>{
        window.localStorage.removeItem('accessToken')
        navigate('/auth/login')
    }

    return (
        <div id="nav" className={props.darkMode?"w-full  h-16 lg:px-[72px] md:px-7 px-3  bg-inherit shadow-md fixed left-0 top-0 z-100":"w-full h-16 lg:px-[72px] md:px-7 px-3 bg-white fixed left-0 top-0 z-10"}>
           <div className="w-full h-full flex items-center justify-between relative">
               {/* logo */}
                <div className="flex items-center ">
                    <Link to="/" className="flex items-center">
                      <svg width="31" height="28" viewBox="0 0 41 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M36.1752 23.5172L31.1324 14.7828C30.7713 14.1574 29.8686 14.1574 29.5075 14.7828L24.4647 23.5172C24.1036 24.1426 24.555 24.9244 25.2771 24.9244H35.3628C36.0849 24.9244 36.5363 24.1427 36.1752 23.5172ZM35.1947 12.4375C33.0281 8.6849 27.6118 8.68491 25.4452 12.4375L20.4024 21.1719C18.2359 24.9244 20.9441 29.6151 25.2771 29.6151H35.3628C39.6958 29.6151 42.404 24.9244 40.2375 21.1719L35.1947 12.4375Z" fill="#2F80ED"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M26.6734 23.3664L16.5616 5.85216C16.2005 5.22674 15.2978 5.22673 14.9367 5.85217L4.82479 23.3664C4.46371 23.9918 4.91507 24.7736 5.63725 24.7736H25.861C26.5832 24.7736 27.0345 23.9919 26.6734 23.3664ZM20.6238 3.50681C18.4573 -0.245762 13.0409 -0.245757 10.8744 3.50681L0.76252 21.0211C-1.40403 24.7736 1.30416 29.4644 5.63725 29.4644H25.861C30.1941 29.4644 32.9023 24.7736 30.7357 21.0211L20.6238 3.50681Z" fill="#2F80ED"/>
                      </svg>
                      <h1 className={props.darkMode?"font-[600] text-[18px]  text-white pl-2":"font-[600] text-[18px]  text-[#333333] pl-2"}>Tweep</h1>
                    </Link>
                </div>

                {/* links */}
                <div id="links" className={props.darkMode?"md:flex lg:flex w-96 sm:hidden   items-center justify-between text-white":"md:flex lg:flex w-96 sm:hidden  items-center justify-between text-[#828282]"}>
                    <Link className="hover:text-[#2f80ed]" to="/"><p className={props.toHome?"text-[#2F80ED] font-[600] text-[14px] py-3 px-3 border-b-[3px]   border-[#2F80ED]":" font-[600] text-[14px] py-3 px-3"} >Home</p></Link>
                    <Link className="hover:text-[#2f80ed]" to="/explore/?filter=top"><p className={props.toExplore?"text-[#2F80ED] font-medium text-[14px] py-3 px-3 hover:text-[#2f80ed] border-b-[3px]   border-[#2F80ED]":"font-medium text-[14px] py-3 px-3 hover:text-[#2f80ed] "} >Explore</p></Link>
                    <Link className="hover:text-[#2f80ed]" to="/bookmarks"><p className={props.toBookmarks?" text-[#2F80ED] font-medium text-[14px]  py-3 px-3 hover:text-[#2f80ed] border-b-[3px]   border-[#2F80ED]":"font-medium text-[14px]  py-3 px-3 hover:text-[#2f80ed]"}>Bookmarks</p></Link>
                </div>

                {/* profile */}
                <div className="flex items-center"> 
                    <Link to="/currentProfile" className="flex items-center relative">

                        {hasProfileImage ? <img src={profileImage} alt="profile" className="w-[36px] h-[36px] rounded-md mr-4"/>:<PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200" style={{fill:"#808080"}}/>}
                        <p className={props.darkMode?"font-[700] text-[14px] text-white":"font-[700] text-[14px] text-[#333333]"} id="userName">{props.userName}</p>
                    </Link>
                    <ArrowDropDownOutlinedIcon id="dropdown" fontSize="medium" className="mx-4 cursor-pointer" onClick={toggleDropDown} style={props.darkMode?{fill:"white"}:{}}/>
                    <div>
                        {! props.darkMode && <svg className="MuiSvgIcon-root w-6 h-6 mr-4 cursor-pointer" fill="#828282" focusable="false" viewBox="0 0 24 24" aria-hidden="true" onClick={props.setDarkMode}><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12.29 7c-.74 0-1.45.17-2.08.46 1.72.79 2.92 2.53 2.92 4.54s-1.2 3.75-2.92 4.54c.63.29 1.34.46 2.08.46 2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
                         </svg>}
                         { props.darkMode && <svg className="MuiSvgIcon-root w-6 h-6 mr-4 cursor-pointer" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="white" onClick={props.setDarkMode}><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path><circle cx="12" cy="12" r="2"></circle></svg>}
                    </div>
                 </div> 

                 {/* dropdown */}
                
                 {showDropDown &&
                  <div className={props.darkMode?"absolute w-[192.04px]  bg-inherit h-[222.24px]  top-[68px] left-[1230px] shadow-2xl rounded-xl flex flex-col items-center justify-between py-2":"absolute w-[192.04px] border-[1.3px] border-[#E0E0E0] bg-white h-[222.24px]  top-[68px] left-[1230px] shadow-md rounded-xl flex flex-col items-center justify-between py-2"}>
                     <div className="border-b-[1.3px] h-full flex flex-col justify-evenly">
                         <Link to="/currentProfile">
                            <div className={props.darkMode?"hover:bg-[#F2F2F2] hover:text-gray-900 rounded-lg py-1 px-3 text-[#F2F2F2]":"hover:bg-[#F2F2F2] rounded-lg py-1 px-3"}>
                                <AccountCircleOutlinedIcon className="mr-2"/>
                                <span>My Profile</span> 
                            </div>
                         </Link>
                        
                        <Link to="/chat">
                            <div className={props.darkMode?"hover:bg-[#F2F2F2] rounded-lg hover:text-gray-900 py-1 px-3 text-[#F2F2F2]":"hover:bg-[#F2F2F2] rounded-lg py-1 px-3"}>
                                <GroupOutlinedIcon className="mr-2"/>
                                <span>Group Chat</span> 
                            </div>
                        </Link>
                        
                        <Link to="/settings">
                            <div className={props.darkMode?"hover:bg-[#F2F2F2] hover:text-gray-900 rounded-lg py-1 px-3 text-[#F2F2F2]":"hover:bg-[#F2F2F2] rounded-lg py-1 px-3"}>
                                <SettingsOutlinedIcon className="mr-2"/>
                                <span>Settings</span> 
                            </div>
                        </Link>
                     </div>  
                     <button className="my-2 flex mr-3 items-center px-3 py-1 rounded-lg hover:bg-[#f0e2e2]" onClick={logout}>
                        <LogoutOutlinedIcon style={{fill:'#EB5757'}} fontSize="small" className="mr-3"/>
                        <span className="text-[#EB5757] font-medium ">Logout</span>
                     </button> 
                 </div>}
           </div>
        </div>
    )
}

export default Navbar;
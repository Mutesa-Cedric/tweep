
import Navbar from '../../components/Navbar';
import React , {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Categories from './Categories';
import Post from "../../components/Post";
import tweeper from "../../images/tweeper.jpg";
import Lois from "../../images/Lois.jpg";
import post from "../../images/post.jpg";
import post2 from "../../images/post2.jpg";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
let Explore=(props)=>{
    let navigate=useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [hasProfile, setHasProfile] = useState(false)
    //checking if the user is logged in 
    useEffect(()=>{
        const accessToken=window.localStorage.getItem("accessToken")
        if(!accessToken){
            navigate('/auth/signup')
        }else{
            fetch(`http://localhost:7070/auth/verifyToken/${accessToken}`)
            .then(response=>response.json())
            .then(data=>{
                if(!data.authorized){
                    navigate('/auth/login')
                }else{
                   fetch(`http://localhost:7070/profiles/${data.user.userName}`)
                   .then(response=>response.json())
                   .then(data=>{
                      setUserProfile(data.profile)
                      setHasProfile(true)
                   }) 
                }
            })
            .catch(err=>console.error(err))
        }
    },[])


    if(hasProfile){
        return (
            <div className={props.darkMode?"bg-[#252329] h-screen overflow-x-hidden":"bg-[#F2F2F2] h-screen overflow-x-hidden"}>
                {userProfile.profileImage ? <Navbar toExplore={true} darkMode={props.darkMode} setDarkMode={props.setDarkMode} profileImg={`http://localhost:7070/${`${userProfile.profileImage}`}`} userName={userProfile.userName}/>:<Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode} userName={userProfile.userName}/>}
                <div className=" mt-20 flex justify-between xl:px-52 ">
                    <div  className=" h-auto flex   justify-between">
                          <Categories darkMode={props.darkMode}/>  
                    </div>
                    <div id="expContainer">
                        <div className='w-full  xl:w-auto sm:mx-4 sm:w-full md:w-[600px] lg:w-[650px]   mb-4 items-center flex'>
                            <div className="absolute ml-4  rounded-lg">
                                <SearchOutlinedIcon fontSize="small" style={{fill:"#BDBDBD"}}/>
                            </div>
                            <input type='text'
                            placeholder='Search'
                            className={props.darkMode?"w-full bg-inherit pl-12 py-3 z-index-100 rounded-md border-none focus:outline-none  shadow-lg placeholder:text-gray-300 z-index-100 text-white":'w-full bg-white pl-12 py-3 rounded-md border-none focus:outline-none  shadow-sm placeholder:text-[#BDBDBD]' }
                            />
                            {/* <button className='absolute right-[16%] bg-[#2F80ED] text-white px-4  capitalize py-1 rounded-md'>
                                <span className="text-[14px] font-medium">search</span>
                            </button> */}
                        </div>
                        <div className="mx-auto w-[745px] " >
                            {/*<Post darkMode={props.darkMode} name="Peyton Lyons" profile={tweeper} createdAt='24 August at 20:43' text="Traveling-it leaves you speechless, then turns you into a storyteller." img={post} comments={449} retweeps={59004} saves={234}/>*/}
                            {/*<Post darkMode={props.darkMode} name="Bianca Lois" profile={Lois} createdAt='24 August at 20:43' text="“We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin" img={post2} comments={208} retweeps={2764} saves={178}/>*/}
                            {/*<Post darkMode={props.darkMode} name="Mikael Stanley" createdAt='13 September at 12:41' text="Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs" comments={23} retweeps={10} saves={20}/>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className={props.darkMode?"w-full bg-[#252329] h-screen flex items-center justify-center":"w-full h-screen flex items-center justify-center"}>
                 <CircularProgress/>
            </div>
        )
    }
   
}

export default Explore
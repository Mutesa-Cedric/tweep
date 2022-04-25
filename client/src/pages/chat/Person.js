import PersonIcon from '@mui/icons-material/Person';

 const Person=(props)=>{
     return (
         
         <div className={props.active && props.darkMode?"flex items-center my-4 bg-[#2d2d36] py-2 cursor-pointer px-4":"cursor-pointer flex items-center my-4 px-4"}>
            {props.image?<img src={props.image} alt="person" className="w-10 sm:w-12 h-10 sm:h-12 mr-4 rounded-full"/>:<PersonIcon fontSize="large" className=" rounded-[50%] w-[60px] h-[60px] mr-4 bg-gray-200" style={{fill:"#808080"}}/>}
            <div className="flex  w-full justify-between items-start">
                <div>
                    <h1 className={props.darkMode?"text-gray-300 font-medium":"text-gray-700  font-medium"}>{props.userName}</h1>
                    <p className="text-gray-400 text-[14px]">{props.lastMessage}</p>
                </div>
                <div className=" font-medium">
                    <span className="text-gray-400 text-[14px] ">{props.lastTime}</span>
                </div>
            </div>
         </div>
     )
 }

 export default Person;
 
 const Person=(props)=>{
     return (
         <div className={props.active?"flex items-center my-4 bg-[#dfe2e7] py-2 cursor-pointer px-4":"cursor-pointer flex items-center my-4 px-4"}>
            <img src={props.image} alt="person" className="w-10 sm:w-12 h-10 sm:h-12 mr-4 rounded-full"/>
            <div className="flex">
                <div>
                    <h1 className="text-gray-700  font-medium">{props.userName}</h1>
                    <p className="text-gray-400 text-[14px]">{props.lastMessage}</p>
                </div>
                <div className="ml-8 font-medium">
                    <span className="text-gray-400 text-[14px]">{props.lastTime}</span>
                </div>
            </div>
         </div>
     )
 }

 export default Person;
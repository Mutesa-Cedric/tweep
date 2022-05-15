import {useState,useEffect} from "react";

const VerifyAccount=(props)=>{

    const [verificationCode,setVerificationCode]=useState("")
    const [fullCode,setFullCode]=useState(false)
    // const [verificationCodeError,setVerificationCodeError]=useState("")
    const updateVerificationCode=(e)=>{
        setVerificationCode(e.target.value)
    }

    useEffect(()=>{
        // console.log(verificationCode.length)
        if(verificationCode.length===6){
            setFullCode(true)
        }else{
            setFullCode(false)
        }
    },[verificationCode])

    console.log(verificationCode)
    return (
        <div className={props.darkMode?"w-screen h-screen overflow-hidden flex items-center flex-col justify-center bg-[#252329]":"w-screen h-screen overflow-hidden flex items-center flex-col justify-center "}>
            <div className="lg:w-[30%] md:w-[70%] sm:w-[100%] h-auto flex justify-center items-center rounded-3xl border-[1px] border-[#BDBDBD]  px-14 py-10">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className={props.darkMode?"font-[600] text-2xl mb-3 text-[#E0E0E0] capitalize":"font-[600] text-2xl mb-3 text-[#333333] capitalize"}>Verify Your Email</h1>
                        <p className={props.darkMode?"text-[#E0E0E0] mt-2 mb-4 font-[500] text-center":"text-center text-gray-500 mt-2 mb-4 font-[500]"}>Please verify your Email address by clicking on the link sent to {'mutesacedric@gmail.com'}</p>
                    </div>
                    <div className="flex flex-col items-center ">
                        <h1 className="capitalize font-medium my-1">enter the code</h1>
                        <input type="text"
                        onInput={updateVerificationCode}
                        value={verificationCode}
                        className="border-2 text-xl px-10 font-medium tracking-[0.5em] border-gray-300 h-10 w-52 focus:border-2 focus:border-gray-300 focus:outline-none" max="6"/>
                    </div>
                   {fullCode &&  <button className="text-white py-1 px-4 bg-blue-500 w-52 my-4 rounded-sm text-lg tracking-wider">Verify</button>}
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount;
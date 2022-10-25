const VerifyAccount=(props)=>{
    return (
        <div className={props.darkMode?"w-screen h-screen overflow-hidden flex items-center flex-col justify-center bg-[#252329]":"w-screen h-screen overflow-hidden flex items-center flex-col justify-center "}>
            <div className="lg:w-[30%] md:w-[70%] sm:w-[100%] h-auto flex justify-center items-center rounded-3xl border-[1px] border-[#BDBDBD]  px-14 py-10">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className={props.darkMode?"font-[600] text-2xl mb-3 text-[#E0E0E0] capitalize":"font-[600] text-2xl mb-3 text-[#333333] capitalize"}>Verify Your Email</h1>
                        <p className={props.darkMode?"text-[#E0E0E0] mt-2 mb-4 font-[500] text-center":"text-center text-gray-500 mt-2 mb-4 font-[500]"}>Please verify your Email address by clicking on the link sent to {props.formData.email}</p>
                    </div>
                    <div>
                        <a href="https://mail.google.com/mail/"><button className="bg-[#2F80ED] text-white w-full py-2 rounded-[8px] px-4 mt-3 text-lg">Open Gmail</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount;
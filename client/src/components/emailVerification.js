import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';
const VerifyAccount = (props) => {

    const [verificationCode, setVerificationCode] = useState("")
    const [fullCode, setFullCode] = useState(false)
    const [responseStatus, SetResponseStatus] = useState({
        success: false,
        failed: false
    })
    // const [verificationCodeError,setVerificationCodeError]=useState("")
    const updateVerificationCode = (e) => {
        setVerificationCode(e.target.value)
    }
    let navigate = useNavigate()
    let email = localStorage.getItem("email")
    useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken")
        accessToken ?
            fetch(`http://localhost:7070/auth/verifyToken/${accessToken}`)
                .then(response => response.json())
                .then(data => {
                    if (!data.authorized) {
                        navigate('/auth/login')
                    } else if (data.user.verified) {
                        navigate('/')
                    }
                }) : navigate('/auth/login')
    }, []);
    useEffect(() => {
        if (verificationCode.length === 6) {
            setFullCode(true)
            fetch('http://localhost:7070/verification/verifyEmail', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    verificationCode: verificationCode
                })
            }).then(response =>
                response.json()
            ).then(data => {
                if (data.success) {
                    swal({
                        title: "Good job!",
                        text: "Your email is now verified !",
                        icon: "success",
                    }).then(
                        setTimeout(() => {
                            navigate('/')
                        }, 1000)
                    ).catch(err => console.log(err));

                } else {
                    setFullCode(false);
                    setVerificationCode("")
                    SetResponseStatus((prevData) => {
                        return {
                            ...prevData,
                            failed: true
                        }
                    })
                }
            })
        } else {
            setFullCode(false)
        }
    }, [verificationCode])

    const resendCode=()=>{
        fetch('http://localhost:7070/verification/resendCode',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email:email
            })
        }).then(response => response.json()).then(data=>{
            data.success?SetResponseStatus(prevStatus=>{
                return {
                    ...prevStatus,
                    failed:false
                }
            }):console.log(data)
        })
    }

    return (
        <div className={props.darkMode ? "w-screen h-screen overflow-hidden flex items-center flex-col justify-center bg-[#252329]" : "w-screen h-screen overflow-hidden flex items-center flex-col justify-center "}>

            <div className="lg:w-[30%] md:w-[70%] sm:w-[100%] h-auto flex justify-center items-center rounded-3xl border-[1px] border-[#BDBDBD]  px-14 py-10">
                {fullCode ? <div className={props.darkMode ? "w-full bg-[#252329] h-24 flex items-center justify-center" : "w-full h-24 flex items-center justify-center"}>
                    <CircularProgress />
                </div> : <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className={props.darkMode ? "font-[600] text-2xl mb-3 text-[#E0E0E0] capitalize" : "font-[600] text-2xl mb-3 text-[#333333] capitalize"}>Verify Your Email</h1>
                        <p className={props.darkMode ? "text-[#E0E0E0] mt-2 mb-4 font-[500] text-center" : "text-center text-gray-500 mt-2 mb-4 font-[500]"}>Please verify your Email address by entering the code  sent to {email}</p>
                    </div>
                    {
                        responseStatus.failed ?
                        <div>
                            <p className="text-orange-500 text-md mt-3 text-center">the code is incorrect or has expired</p>
                            <div className="flex">
                                <button className="rounded-lg hover:bg-blue-500 px-4 mx-3 bg-white text-blue-500 border border-blue-500 mt-4 capitalize py-2 hover:text-white" onClick={()=>{SetResponseStatus((prevStatus)=>{
                                    return {
                                        ...prevStatus,
                                        failed: false
                                    }
                                })}}>reenter code</button>
                                <button className="rounded-lg hover:bg-blue-500 px-4 mx-3 bg-white text-blue-500 border border-blue-500 mt-4 capitalize py-2 hover:text-white" onClick={resendCode}>resend code</button>
                            </div>
                            </div>
                            :
                            <div className="flex flex-col items-center ">
                                <h1 className={props.darkMode ? "capitalize font-medium my-3 text-gray-200" : "capitalize font-medium my-3"}>enter the code</h1>
                                <input type="text"
                                    onInput={updateVerificationCode}
                                    value={verificationCode}
                                    className={props.darkMode ? "border-2 text-xl px-10 font-medium tracking-[0.5em] text-white border-gray-300 bg-[#252329] h-10 w-52 focus:border-2 focus:border-gray-300 focus:outline-none" : "border-2 text-xl px-10 font-medium tracking-[0.5em] border-gray-300 h-10 w-52 focus:border-2 focus:border-gray-300 focus:outline-none"} max="6" />

                            </div>
                    }


                </div>}
            </div>

        </div>
    )
}

export default VerifyAccount;
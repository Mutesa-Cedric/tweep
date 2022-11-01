import { Link,  } from 'react-router-dom'
import React, { useState } from 'react';
import ThemeToggler from "../../components/ThemeToggler"
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { login, loading, error } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    let handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    function submitForm(event) {
        event.preventDefault()
        login(formData.email, formData.password)
    }

    return (
        <div className={"w-screen h-screen overflow-hidden flex items-center flex-col justify-center dark:bg-[#252329]"}>
            <form onSubmit={submitForm} className="lg:w-[30%] md:w-[70%] sm:w-[100%] h-auto flex justify-center items-center rounded-3xl border-[1px] border-[#BDBDBD] px-10 py-8">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center mb-4">
                            <svg width="41" height="30" viewBox="0 0 41 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M36.1752 23.5172L31.1324 14.7828C30.7713 14.1574 29.8686 14.1574 29.5075 14.7828L24.4647 23.5172C24.1036 24.1426 24.555 24.9244 25.2771 24.9244H35.3628C36.0849 24.9244 36.5363 24.1427 36.1752 23.5172ZM35.1947 12.4375C33.0281 8.6849 27.6118 8.68491 25.4452 12.4375L20.4024 21.1719C18.2359 24.9244 20.9441 29.6151 25.2771 29.6151H35.3628C39.6958 29.6151 42.404 24.9244 40.2375 21.1719L35.1947 12.4375Z" fill="#2F80ED" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M26.6734 23.3664L16.5616 5.85216C16.2005 5.22674 15.2978 5.22673 14.9367 5.85217L4.82479 23.3664C4.46371 23.9918 4.91507 24.7736 5.63725 24.7736H25.861C26.5832 24.7736 27.0345 23.9919 26.6734 23.3664ZM20.6238 3.50681C18.4573 -0.245762 13.0409 -0.245757 10.8744 3.50681L0.76252 21.0211C-1.40403 24.7736 1.30416 29.4644 5.63725 29.4644H25.861C30.1941 29.4644 32.9023 24.7736 30.7357 21.0211L20.6238 3.50681Z" fill="#2F80ED" />
                            </svg>
                            <h1 className={"mx-2 font-medium text-xl dark:text-[#E0E0E0]"}>Tweep</h1>
                        </div>
                        <ThemeToggler />
                    </div>
                    <div className="my-4 flex w-full">
                        <h1 className={"self-start  flex font-[600] text-xl mb-1 text-[#333333] capitalize dark:text-[#E0E0E0]"}>Welcome back!</h1>
                    </div>
                    <div className="my-2 flex flex-col w-full">

                        <input type="Email" autoComplete="off"
                            className={"border-[1px] border-[#BDBDBD] rounded-[8px] py-2 my-4 placeholder:text-lg px-4 dark:text-white dark:bg-inherit"}
                            placeholder="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}

                        />
                        <input type="password" autoComplete="off"
                            className={"border-[1px] border-[#BDBDBD] rounded-[8px] py-2 my-2 placeholder:text-lg px-4 dark:text-white dark:bg-inherit"}
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {
                        error &&
                        <div className="w-full flex items-center">
                            <p className='text-orange-500 py-2 font-semibold'>Invalid email or password!</p>
                        </div>
                    }
                    {loading ?
                        <button disabled type="button" className="text-white bg-[#2F80ED] font-medium rounded-lg px-5 py-2.5 text-center mr-2 cursor-not-allowed  inline-flex items-center w-full my-3">
                            <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Loading...
                        </button> :
                        <div className="w-full my-3">
                            <button className="bg-[#2F80ED] text-white w-full py-2 rounded-[8px] text-lg">Login</button>
                        </div>
                    }

                    <div>
                        <p className="text-[#828282] my-4">or continue with these social profiles</p>
                    </div>
                    <div className="flex mb-6">
                        {/* google */}
                        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-4 cursor-pointer">
                            <circle cx="21.8826" cy="21.5981" r="20.5" stroke="#828282" />
                            <path d="M21.91 15.8883C23.7953 15.8883 25.5006 16.8557 26.478 18.1887L28.7945 15.8556C27.409 14.054 24.7425 12.6255 21.91 12.6255C16.9505 12.6255 12.8828 16.6388 12.8828 21.5983C12.8828 26.5578 16.9505 30.5711 21.91 30.5711C26.0213 30.5711 29.4797 27.8141 30.5402 24.0454C30.7685 23.2622 30.8828 22.4465 30.8828 21.5983V20.7826H22.7257V24.0448H27.049C26.1517 25.97 24.1776 27.3083 21.91 27.3083C18.7614 27.3083 16.1457 24.7469 16.1457 21.5983C16.1457 18.4497 18.7614 15.8883 21.91 15.8883Z" fill="#828282" />
                        </svg>

                        {/* facebook */}
                        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2 cursor-pointer">
                            <circle cx="21.8088" cy="21.5981" r="20.5" stroke="#828282" />
                            <g clipPath="url(#clip0)">
                                <path d="M28.7963 13.4419H16.0697C14.6159 13.4419 13.433 14.596 13.433 16.0143V28.4305C13.433 29.8488 14.6159 31.0029 16.0697 31.0029H21.3783V24.7948H19.2689V21.7079H21.3783V19.6157C21.3783 17.9135 22.7976 16.5288 24.5424 16.5288H27.7416V19.6157H24.5424V21.7079H27.7416L27.2142 24.7948H24.5424V31.0029H28.7963C30.25 31.0029 31.433 29.8488 31.433 28.4305V16.0143C31.433 14.596 30.25 13.4419 28.7963 13.4419Z" fill="#828282" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="18" height="17.561" fill="white" transform="translate(13.433 13.4419)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div>
                        <p className="text-[#828282]">don&apos;t have account?
                            <Link to="/auth/signup"><span className="text-[#2F80ED] px-1">Signup</span></Link>
                        </p>
                    </div>
                </div>
            </form>
            <p className="text-[#828282] mt-2">created by <a href="https://github.com/Mutesa-Cedric" target="_blank">mutesa Cedric</a></p>
        </div>
    )
}
export default Login;
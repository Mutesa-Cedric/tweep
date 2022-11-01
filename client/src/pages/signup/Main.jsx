import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from 'react-router-dom'
import ThemeToggler from "../../components/ThemeToggler";
import { useForm } from "react-hook-form";

const SignupMain = () => {
    const { signup, loading, error } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        signup(data.userName, data.email, data.password);
    }

    return (
        <div className="overflow-x-hidden">
            <div className="w-screen h-screen overflow-hidden flex items-center flex-col justify-center dark:bg-[#252329]">
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[30%] md:w-[70%] sm:w-[100%] h-auto flex justify-center items-center rounded-3xl border-[1px] border-[#BDBDBD] px-14 py-8">
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center mb-4">
                                <svg width="41" height="30" viewBox="0 0 41 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M36.1752 23.5172L31.1324 14.7828C30.7713 14.1574 29.8686 14.1574 29.5075 14.7828L24.4647 23.5172C24.1036 24.1426 24.555 24.9244 25.2771 24.9244H35.3628C36.0849 24.9244 36.5363 24.1427 36.1752 23.5172ZM35.1947 12.4375C33.0281 8.6849 27.6118 8.68491 25.4452 12.4375L20.4024 21.1719C18.2359 24.9244 20.9441 29.6151 25.2771 29.6151H35.3628C39.6958 29.6151 42.404 24.9244 40.2375 21.1719L35.1947 12.4375Z" fill="#2F80ED" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M26.6734 23.3664L16.5616 5.85216C16.2005 5.22674 15.2978 5.22673 14.9367 5.85217L4.82479 23.3664C4.46371 23.9918 4.91507 24.7736 5.63725 24.7736H25.861C26.5832 24.7736 27.0345 23.9919 26.6734 23.3664ZM20.6238 3.50681C18.4573 -0.245762 13.0409 -0.245757 10.8744 3.50681L0.76252 21.0211C-1.40403 24.7736 1.30416 29.4644 5.63725 29.4644H25.861C30.1941 29.4644 32.9023 24.7736 30.7357 21.0211L20.6238 3.50681Z" fill="#2F80ED" />
                                </svg>
                                <h1 className="mx-2 font-medium text-xl dark:text-[#E0E0E0]">Tweep</h1>
                            </div>
                            <ThemeToggler />
                        </div>
                        <div className="my-2">
                            <h1 className="font-[600] text-xl mb-3 dark:text-[#E0E0E0] text-[#333333] capitalize">Join thousands of Tweepers from all over the world with one signup</h1>
                            <p className="dark:text-[#E0E0E0]">start live conversations with other people, tweep your experiences and have fun.</p>
                        </div>
                        <div className="my-2 flex flex-col w-full">
                            <input type="text" autoComplete="off" {...register("userName", { required: true, min: 2, max: 40 })}
                                className="border-[1px] border-[#BDBDBD] px-4 rounded-[8px] py-2 my-2 placeholder:text-lg dark:text-white dark:border-[#BDBDBD] dark:bg-inherit"
                                placeholder="Username"
                            />
                            {errors?.userName && <p className="text-red-300 font-[600] mx-auto animate-pulse">Invalid username</p>}
                            <input type="Email" autoComplete="off" {...register("email", { required: true })}
                                className="border-[1px] border-[#BDBDBD] rounded-[8px] py-2 my-2 placeholder:text-lg px-4  dark:text-white dark:border-[#BDBDBD] dark:bg-inherit"
                                placeholder="email"
                            />
                            {errors?.email && <p className="text-red-300 font-[600] mx-auto animate-pulse">Invalid Email address</p>}
                            <input type="password" autoComplete="off" {...register("password", { required: true, min: 4, max: 30 })}
                                className={"border-[1px]  border-[#BDBDBD] rounded-[8px] py-2 my-2 placeholder:text-lg px-4  dark:text-white dark:bg-inherit"}
                                placeholder="Password"
                            />
                            {errors?.password && <p className="text-red-300 font-[600] mx-auto animate-pulse">Invalid password!</p>}
                        </div>
                        <div className="w-full my-3">
                            <button type="button" className="bg-[#2F80ED] text-white w-full py-2 rounded-[8px] text-lg">Start tweeping now</button>
                        </div>
                        <div>
                            <p className="text-[#828282] my-1">or continue with these social profiles</p>
                        </div>
                        <div className="flex mb-4">
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
                            <p className="text-[#828282]">already a member?
                                <Link to="/auth/login"><span className="text-[#2F80ED] px-1">login</span></Link>
                            </p>
                        </div>
                    </div>
                </form>
                <p className="text-[#828282] mt-2">created by <a href="http://">mutesa Cedric</a></p>
            </div>
        </div>

    )
}

export default SignupMain;
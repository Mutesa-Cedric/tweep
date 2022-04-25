import {Link,useNavigate} from 'react-router-dom'
import React , {useState} from 'react';
let Login=(props)=>{

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }),navigate=useNavigate();
    let handleChange=(event)=>{
        const {name,value} = event.target;
        setFormData(prevData=>{
            return{
                ...prevData,
                [name]: value
            }
        })
    }
    function submitForm(event) {
        event.preventDefault()
        fetch("http://localhost:7070/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:formData.email,
                password:formData.password
            })
        })
        .then(response => response.json())
        .then(data =>{
            if(data.loggedIn) {
                window.localStorage.setItem("accessToken",data.accessToken);
                navigate("/")
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className={props.darkMode?"w-screen h-screen overflow-hidden flex items-center flex-col justify-center bg-[#252329]":"w-screen h-screen overflow-hidden flex items-center flex-col justify-center"}>
        <form method="post" onSubmit={submitForm} className="lg:w-[30%] md:w-[70%] sm:w-[100%] h-auto flex justify-center items-center rounded-3xl border-[1px] border-[#BDBDBD] px-10 py-8">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center mb-4">
                        <svg width="41" height="30" viewBox="0 0 41 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M36.1752 23.5172L31.1324 14.7828C30.7713 14.1574 29.8686 14.1574 29.5075 14.7828L24.4647 23.5172C24.1036 24.1426 24.555 24.9244 25.2771 24.9244H35.3628C36.0849 24.9244 36.5363 24.1427 36.1752 23.5172ZM35.1947 12.4375C33.0281 8.6849 27.6118 8.68491 25.4452 12.4375L20.4024 21.1719C18.2359 24.9244 20.9441 29.6151 25.2771 29.6151H35.3628C39.6958 29.6151 42.404 24.9244 40.2375 21.1719L35.1947 12.4375Z" fill="#2F80ED"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.6734 23.3664L16.5616 5.85216C16.2005 5.22674 15.2978 5.22673 14.9367 5.85217L4.82479 23.3664C4.46371 23.9918 4.91507 24.7736 5.63725 24.7736H25.861C26.5832 24.7736 27.0345 23.9919 26.6734 23.3664ZM20.6238 3.50681C18.4573 -0.245762 13.0409 -0.245757 10.8744 3.50681L0.76252 21.0211C-1.40403 24.7736 1.30416 29.4644 5.63725 29.4644H25.861C30.1941 29.4644 32.9023 24.7736 30.7357 21.0211L20.6238 3.50681Z" fill="#2F80ED"/>
                        </svg>
                        <h1 className={props.darkMode?"mx-2 font-medium text-xl text-[#E0E0E0]":"mx-2 font-medium text-xl"}>Tweep</h1>
                    </div>
                    <div>
                        {! props.darkMode && <svg className="MuiSvgIcon-root w-8 h-8 mr-4 cursor-pointer" fill="#828282" focusable="false" viewBox="0 0 24 24" aria-hidden="true" onClick={props.setDarkMode}><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12.29 7c-.74 0-1.45.17-2.08.46 1.72.79 2.92 2.53 2.92 4.54s-1.2 3.75-2.92 4.54c.63.29 1.34.46 2.08.46 2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
                         </svg>}
                         { props.darkMode && <svg className="MuiSvgIcon-root w-8 h-8 mr-4 cursor-pointer" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="white" onClick={props.setDarkMode}><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path><circle cx="12" cy="12" r="2"></circle></svg>}
                    </div>
                </div>
                <div className="my-4 flex w-full">
                    <h1 className={props.darkMode?"font-[600] self-start text-xl mb-1 text-[#E0E0E0] capitalize":"self-start  flex font-[600] text-xl mb-1 text-[#333333] capitalize"}>Welcome back!</h1>
                </div>
                <div className="my-2 flex flex-col w-full">
                 
                    <input type="Email" autoComplete="off" 
                    className={props.darkMode?"border-[1px] border-[#BDBDBD] text-white rounded-[8px] py-2 my-4 placeholder:text-lg px-4 bg-inherit":"border-[1px] border-[#BDBDBD] rounded-[8px] py-2 my-4 placeholder:text-lg px-4"}
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}

                    />
                    <input type="password" autoComplete="off" 
                     className={props.darkMode?"border-[1px] text-white border-[#BDBDBD] rounded-[8px] py-2 my-2 placeholder:text-lg px-4 bg-inherit":"border-[1px] border-[#BDBDBD] rounded-[8px] py-2 my-2 placeholder:text-lg px-4"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </div>
                <div className="w-full my-3">
                    <button className="bg-[#2F80ED] text-white w-full py-2 rounded-[8px] text-lg">Login</button>
                </div>
                <div>
                    <p className="text-[#828282] my-4">or continue with these social profiles</p>
                </div>
                <div className="flex mb-6">
                    {/* google */}
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-4 cursor-pointer">
                        <circle cx="21.8826" cy="21.5981" r="20.5" stroke="#828282"/>
                        <path d="M21.91 15.8883C23.7953 15.8883 25.5006 16.8557 26.478 18.1887L28.7945 15.8556C27.409 14.054 24.7425 12.6255 21.91 12.6255C16.9505 12.6255 12.8828 16.6388 12.8828 21.5983C12.8828 26.5578 16.9505 30.5711 21.91 30.5711C26.0213 30.5711 29.4797 27.8141 30.5402 24.0454C30.7685 23.2622 30.8828 22.4465 30.8828 21.5983V20.7826H22.7257V24.0448H27.049C26.1517 25.97 24.1776 27.3083 21.91 27.3083C18.7614 27.3083 16.1457 24.7469 16.1457 21.5983C16.1457 18.4497 18.7614 15.8883 21.91 15.8883Z" fill="#828282"/>
                    </svg>

                    {/* facebook */}
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2 cursor-pointer">
                        <circle cx="21.8088" cy="21.5981" r="20.5" stroke="#828282"/>
                        <g clip-path="url(#clip0)">
                        <path d="M28.7963 13.4419H16.0697C14.6159 13.4419 13.433 14.596 13.433 16.0143V28.4305C13.433 29.8488 14.6159 31.0029 16.0697 31.0029H21.3783V24.7948H19.2689V21.7079H21.3783V19.6157C21.3783 17.9135 22.7976 16.5288 24.5424 16.5288H27.7416V19.6157H24.5424V21.7079H27.7416L27.2142 24.7948H24.5424V31.0029H28.7963C30.25 31.0029 31.433 29.8488 31.433 28.4305V16.0143C31.433 14.596 30.25 13.4419 28.7963 13.4419Z" fill="#828282"/>
                        </g>
                        <defs>
                        <clipPath id="clip0">
                        <rect width="18" height="17.561" fill="white" transform="translate(13.433 13.4419)"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
                <div>
                    <p className="text-[#828282]">already a member?
                        <Link to="/auth/signup"><span className="text-[#2F80ED] px-1">Signup</span></Link> 
                    </p>
                </div>
            </div>
        </form>
        <p className="text-[#828282] mt-2">created by <a href="http://">mutesa Cedric</a></p>
    </div>
    )
}
export default Login;
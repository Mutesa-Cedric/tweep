import React, {useState,useEffect} from "react";
import Signup from './Signup';
// import {Link} from 'react-router-dom'
import ChooseProfile from './ChooseProfile';
import VerifyAccount from './VerifyAccount';
let SignupMain=(props)=>{

    //checking if the user is signed up
    // useEffect(()=>{
    //     let accessToken=window.localStorage.getItem('accessToken')
    //     if(accessToken){
    //         window.location.replace("/")
    //     }
    // })

    const [errorMessages, setErrorMessages] = useState({
        userNameMessage:"",
        emailMessage: "",
        passwordMessage:"",
        allFieldsMessage: "",
    })
    const [formData,setFormData] = useState({
        userName:"",
        email:"",
        password:""
    })
    const [userCreated, setUserCreated] = useState(false)
    const [userVerified, setUserVerified]= useState(false)
    console.log(userCreated)
    const handleChange=(event)=>{
        let {name,value} = event.target
        setFormData(prevData=>{
            return {
                  ...prevData,
                  [name]: value  
            }
        })
    }
    function submitForm(event) {

        event.preventDefault()
        if(formData.email===''||formData.password===''||formData.userName===''){
            setErrorMessages(prevMessages=>{
                return {
                    ...prevMessages,
                    allFieldsMessage:"all fields are required"
                }
            })
        }else{
            fetch("http://localhost:7070/register",{
                method: "POST",
                headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userName:formData.userName,
                    email:formData.email,
                    password:formData.password
                })
            })
            .then(response=>response.json())
            .then(data=>{
                if(data.success){
                    window.localStorage.setItem("accessToken",data.accessToken)
                    window.localStorage.setItem("email",data.email)
                     setUserCreated(true)
                }else if(data.existingUserName){
                    setErrorMessages(prevMessages=>{
                            return {
                                ...prevMessages,
                                userNameMessage:"username is taken"
                            }
                        })
                }else if(data.existingEmail){
                   setErrorMessages(prevMessages=>{
                       return {
                           ...prevMessages,
                           emailMessage:"user with this email already exists"
                       }
                   })
                }
            })
            .catch(err=>console.log(err));
        }
    }
    useEffect(() => {
      setErrorMessages({
        userNameMessage:"",
        emailMessage: "",
        passwordMessage:""
      })
    
      return () => {
        
      }
    }, [formData])
    
    return (
        <div>
             {!userCreated && <Signup darkMode={props.darkMode} formData={formData} errorMessages={errorMessages} submitForm={submitForm} handleChange={handleChange} setDarkMode={props.setDarkMode}/>}
             {userCreated && !userVerified && <VerifyAccount darkMode={props.darkMode} setDarkMode={props.setDarkMode} formData={formData}/>}
             {userCreated && userVerified && <ChooseProfile/>}
        </div>
     
    )
}

export default SignupMain;
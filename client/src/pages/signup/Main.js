import React, {useState,useEffect} from "react";
import Signup from './Signup';
import {useNavigate} from 'react-router-dom'
let SignupMain=(props)=>{
    let navigate = useNavigate()
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
            console.log(data)
                if(data.success){
                    window.localStorage.setItem("accessToken",data.accessToken)
                    window.localStorage.setItem("email",formData.email)
                    navigate('/verifyEmail')
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
            <Signup darkMode={props.darkMode} formData={formData} errorMessages={errorMessages} submitForm={submitForm} handleChange={handleChange} setDarkMode={props.setDarkMode}/>
        </div>
     
    )
}

export default SignupMain;
import React, {useState,useEffect} from "react";
import Signup from './Signup';
import {useNavigate} from 'react-router-dom'
import TooManyRequests from "../../components/tooManyRequests";
import swal from 'sweetalert';

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

    const [tooManyRequests,setTooManyRequests] = useState(false)

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
            fetch(`https://mc-tweep.herokuapp.com/register`,{
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
                    window.localStorage.setItem("email",formData.email)
                    navigate('/verifyEmail')
                }
                
                else if(data.Status===500){
                    console.log(data.message)
                    swal("sorry, our server is receiving too many requests. Please try after some time", {
                        buttons: [true],
                      });
                }
                else if(data.existingUserName){
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
    
    console.log(`tooManyRequests: ${tooManyRequests}`)
    return (
        <div>
            {tooManyRequests && <TooManyRequests/>} 
            <Signup darkMode={props.darkMode} formData={formData} errorMessages={errorMessages} submitForm={submitForm} handleChange={handleChange} setDarkMode={props.setDarkMode}/>
        </div>
     
    )
}

export default SignupMain;
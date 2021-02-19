import React, {FormEventHandler, useState} from 'react';
import  {useHistory} from 'react-router-dom';
import Image from './img/profile.png';
import GlobalStyle from './Components/GlobalStyle/GlobalStyle';
import FormWrapperStyle from './Components/FormWrapper/FormWrapperStyle';
import FormStyle from './Components/Form/FormStyle';
import ProfileImageStyle from './Components/ProfileImage/ProfileImageStyle';
import Heading from './Components/Heading/heading_Components';
import HeadingStyle from './Components/Heading/HeadingStyle';
import InputArea from './Components/InputArea/InputArea';
import ErrorStyle from './Components/Error/ErrorStyle';
import RegisterButtonStyle from './Components/ButtonRegister/RegisterButtonStyle';
import axios from 'axios';


const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  contactNumber: ""
};


function App() {

  let history=useHistory();

  const bcrypt = require('bcryptjs');
  
  const [state, setState] = useState(initialState);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(state);
    const regx = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    
    var f1=0,f2=0,f3=0,f4=0;
    if(state.email==="")
      setError1('Enter email');
    else if(regx.test(state.email) === false)
      setError1('Invalid Email');
    else
    {
      setError1('');
      f1=1;
    }

    // console.log(error1);
    if(state.password==="")
      setError2('Enter password');
    else
    {
      setError2('');
      f2=1;
    }

    if(state.confirmPassword==="")
      setError3('Enter confirm password');
    else if(state.password != state.confirmPassword)
      setError3('Password do not matched');
    else
    {
      setError3('');
      f3=1;
    }

    if(state.contactNumber==="")
      setError4('Enter Contact Number');
    else if(state.contactNumber.length !=10)
      setError4('Contact number must contain 10 digits');
    else
    {
      setError4('');
      f4=1;
    }

    if(f1 && f2 && f3 && f4)
    {
      // state.password = bcrypt.hashSync(state.password, bcrypt.genSaltSync());
      state.confirmPassword = bcrypt.hashSync(state.confirmPassword, bcrypt.genSaltSync());
      // console.log(state.password);
      if(bcrypt.compareSync(state.password, state.confirmPassword))
      {
        console.log("trueeeee");
        
      }
      await axios.post("http://localhost:3333/users", state);
      history.push("/");
      {setTimeout(function()
        {
            alert('Your details has been registered.');
        }, 
        500);}

        setState({email:"", password:"", confirmPassword:"", contactNumber:"" });
      }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>)=>{
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;

    setState(prev =>({...prev, [inputName]: value }));
  };

  return (
    <>
      <GlobalStyle />
      <FormWrapperStyle>
        <FormStyle  onSubmit={handleSubmit}> 
          <ProfileImageStyle>
            <img src={Image} height="100px" />
          </ProfileImageStyle>
          <HeadingStyle>
            <Heading />
          </HeadingStyle>
        <label htmlFor="email">Email</label>
          <InputArea 
            type="text" 
            name="email"
            value={state.email} 
            autoComplete = "off"
            placeholder = "Enter Email"
            onChange={handleInput}
          />
          {error1 && (
            <ErrorStyle>
              <p>**{error1}</p>
            </ErrorStyle>
          )}
          <label htmlFor="Password">Password</label>
          <InputArea 
            type="Password" 
            name="password"
            placeholder = "Enter Password"
            value={state.password}
            autoComplete = "off"
            onChange={handleInput}
          />
          {error2 && (
            <ErrorStyle>
              <p>**{error2}</p>
            </ErrorStyle>
          )}
          <label htmlFor="Confirm_Password">Confirm Password</label>
          <InputArea 
            type="Password" 
            name="confirmPassword"
            value={state.confirmPassword} 
            placeholder = "Enter Confirm Password"
            autoComplete = "off"
            onChange={handleInput}
          />
          {error3 && (
            <ErrorStyle>
              <p>**{error3}</p>
            </ErrorStyle>
          )}
          <label htmlFor="Contact">Contact Number</label>
          <InputArea 
            type="text"
            name="contactNumber"
            value={state.contactNumber} 
            placeholder = "Enter Contact number"
            autoComplete = "off"
            onChange={handleInput}
          />
          {error4 && (
            <ErrorStyle onSubmit = {() => {setError4(error4)}}>
              <p>**{error4}</p>
            </ErrorStyle>
            
          )}
          

          <RegisterButtonStyle type="submit">Register</RegisterButtonStyle>

          </FormStyle>
      </FormWrapperStyle> 
    </>
  );
}

export default App;

import React, {useState, useContext} from 'react';
import axios from 'axios'
import UserContext from '../../context/UserContext';

import { useHistory } from 'react-router-dom';
import ErrorNotice from '../ErrorResponse/ErrorNotice';
export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {setUserData} = useContext(UserContext);
    const history = useHistory();
    const [error,setError] = useState();

    const submit = async (e) => {
        e.preventDefault();
        // window.location.reload();
        try{
        const LoginUser = {email, password};
        const loginRes = await axios.post("http://localhost:3001/user/login",LoginUser);
        setUserData({
            token : loginRes.data.token,
            user : loginRes.data.user
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
        //window.location.reload();
        alert("Your login session expires in 60 seconds")
    }catch(err) {
        err.response.data.msg && setError(err.response.data.msg);
}
    };
    return (
        <div>
            <h2>Login</h2>
            {error && <ErrorNotice message ={error} clearError = {()=> setError(undefined)}/>}
            <form  className = "form" onSubmit = {submit}>
                <label htmlFor = "login-email"> Email </label>
                <input id = "login-email" type = "email" 
                onChange= {(e) => setEmail(e.target.value)}/>

                <label htmlFor = "login-password"> Password </label>
                <input id = "login-password" type = "password"
                onChange= {(e) => setPassword(e.target.value)}/>

                <input type = "submit" value = "Login"/>
                </form>
        </div>
    )
}

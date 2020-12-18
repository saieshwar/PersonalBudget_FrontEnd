import React, { useEffect,useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from '../../context/UserContext';
const jwt = require('jsonwebtoken');

export default function AuthOptions() {

    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory();
    var intervalID = null;
    useEffect(() => {
        intervalID  = setInterval(() => {
            tokenExpiry();
        }, 2000);
        // return () => 
       
      }, []);

    const register = ()=> {history.push("/register")};
    const login = ()=> {history.push("/login")};
    const logout = ()=> {
        setUserData ({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "");
        history.push('/login');
        
    };
        //rooting to home when jwt is expired
        const parseJwt = (token) => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            }catch (e) {
                return null;
              }
        };
    function tokenExpiry(){
        const token = localStorage.getItem('auth-token');
        if(token){
            
           
            let decodeToken = parseJwt(token);
            if(Date.now() <=decodeToken.exp*1000 ){
                return true;
            }
            else {
                
                // console.log(Date.now() );
                logout();
                clearInterval(intervalID);
                
            }
        }
    }
    // setInterval(()=>{
       
    //     tokenExpiry()
    //    }, 2000);
    
    return (
        <nav className = "auth-options"> 
        {   
           
                userData.user ?
                 (<button onClick = {logout}> Logout</button>) : 
                 
        (
        <>
            <button onClick= {register}>Register</button>
            <button onClick = {login}>Login </button>
            </>
        )
       
        }
        {history.push("/")}
        
        </nav>
    )
}

import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'
import Budget from './components/pages/Budget'
import Expense from './components/pages/Expense'
import axios from 'axios';
import "./style.css";
import UserContext from './context/UserContext';


function App() {

  const [userData, setUserData] = useState ({
    token : undefined,
    user: undefined

  });

  useEffect( () => {
    const checkLoggedIn = async() => {
      let token = localStorage.getItem("auth-token");
      if(token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post("http://localhost:3001/user/tokenIsValid",null,{headers :{"x-auth-token" : token}});
      // console.log(tokenResponse.data);

      if(tokenResponse.data) {
        const userResponsedata = await axios.get("http://localhost:3001/user",{headers : {"x-auth-token" : token}
      });
      setUserData({
        token,
        user : userResponsedata.data
      });
     
       
      }
      //setting the user data for the line  15
      
    };
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={ { userData, setUserData}}>
      <Header/>
      {/* <PieChart/> */}
      {/* <BarChart/> */}
      
      <div className="container">
      <Switch>
        <Route exact path = "/" component = {Home} />
        <Route path = "/login" component = {Login} />
        <Route path = "/register" component = {Register} />
        <Route path = "/budget" component = {Budget}/>
        <Route path = "/expense" component = {Expense}/>
        
      </Switch>
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

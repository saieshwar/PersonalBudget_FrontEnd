import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import BarChart from "../pages/BarChart";
import LineChart from "../pages/LineChart";
import PieChart from "../pages/PieChart";

import PersonalBudget from "./PersonalBudget";
function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const budget = () => {
    history.push("/budget");
  };
  const expense = () => {
    history.push("/expense");
  };

  useEffect((e) => {
    // if(userData.user) history.push("/");
    if (!userData.user) history.push("/login");
  });
  return (
    <div className="DataForms">
      {userData.user ? (
        <>
          Welcome Home {userData.user.displayName} <br />
          please Enter your budget :{" "}
          <button onClick={budget}> Budget Form</button> <br />
          Please Enter your expenses :{" "}
          <button onClick={expense}> Expense Form </button>
        </>
      ) : (
        <> login to access</>
      )}
      <br />
      <div className="container">
        
       
          Budget Bar chart
          <BarChart />
        
        
        
          <br />
          Budget Line chart
          <LineChart />
       
        <PieChart/>
      </div>
      <div id="clear"></div>
    </div>
  );
}

export default Home;

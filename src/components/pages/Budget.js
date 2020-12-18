import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../ErrorResponse/ErrorNotice';
import axios from 'axios'

export default function Budget() {

    const [title, setTitle] = useState();
    const [related_value, setRelated_value] = useState();
    const [Color, setColor] = useState();
    const history = useHistory();
    const [error,setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
        let token = localStorage.getItem("auth-token");
      const budgetData = { title, related_value,Color };
      const budgetRes = await axios.post("http://localhost:3001/budget",budgetData,{headers : {"x-auth-token" : token}});
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Budget</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="Budget-title"> Title </label>
        <input
          id="Budget-title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="Budget-related_value"> Enter your budget </label>
        <input
          id="Budget-related_value"
          type="text"
          onChange={(e) => setRelated_value(e.target.value)}
        />

        <label htmlFor="Budget-color"> Color (Hex Value #FFFFFF) </label>
        <input
          id="Budget-color"
          type="text"
          onChange={(e) => setColor(e.target.value)}
        />

        <input type="submit" value="budget" />
      </form>
    </div>
  );
}

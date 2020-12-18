import React,{useEffect,useContext,useState} from 'react';
import { Line,Bar } from "react-chartjs-2";
import axios from 'axios';


export default function BarChart() {
        const [labels, setLabels] = useState([]);
        const [data, setData] = useState([]);
        const [backgroundColor, setBackgroundColor] = useState([]);
        const[expense, setExpense] = useState([]);
    
    useEffect(() => {
        const token=localStorage.getItem("auth-token");
        axios.get('http://localhost:3001/budget',{ headers: {'x-auth-token': `${token}`} })
        .then(res => {
            var l=[];
            var d =[];
            var b=[];
            for (var i = 0; i < res.data.length; i++) {
                l.push(res.data[i].title);

                d.push(res.data[i].related_value);
                
               b.push(res.data[i].Color);
                
            }
            setLabels(l);
            setData(d);
            setBackgroundColor(b);
            
            })

        axios.get('http://localhost:3001/expense',{ headers: {'x-auth-token': `${token}`} })
        .then(res => {
            var e=[];
            for (var i = 0; i < res.data.length; i++) {
                    
                   e.push(res.data[i].related_value);
                   
                    
                }
                setExpense(e);
                // console.log(dataSource);
                })
            
            
          },[])
    return (
        <div className="App">
        <Bar data={{ 
            datasets: [
                {
                    label : 'Total Budget planned',
                    data: data,
                    backgroundColor: backgroundColor,
                        // '#ffcd56',
                        // '#ff6384',
                        // '#36a2eb',
                        // '#fd6b19',
                        // '#B3B6B7',
                        // '#A533FF',
                        // '#311846',
                        // '#6D6673'
                    
                },
                {
                    label: 'Total Expenses made',
                    data: expense,
                    backgroundColor: [
                        '#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#000000',
                        '#B3B6B7',
                        '#A533FF',
                        '#311846',
                        '#6D6673'
                    ]
                }



            ],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: labels
        
        }} />
      </div>
    )
}
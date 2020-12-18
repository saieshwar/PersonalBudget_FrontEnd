import React from 'react'
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';
import {useHistory} from "react-router-dom";


export default function Header() {

    return (
        <header id = "Header">
           <Link to = "/"> 
           <h1 class = 'title'>Personal Budget HomePage 
               </h1>
        </Link>
           <AuthOptions />
           
        </header>
        
    )
}

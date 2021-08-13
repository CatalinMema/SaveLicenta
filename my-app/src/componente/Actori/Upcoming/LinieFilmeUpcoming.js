import React, { useEffect, useState } from 'react'
import { upcoming } from '../../../Requests';

function LinieFilmeUpcoming() {
    const[filmeUpcoming,setfilmeUpcoming]= useState([])
    useEffect(()=>{
        async function aducfilmeUpcoming(){
            setfilmeUpcoming( await upcoming());
        }
        aducfilmeUpcoming();
    },[])
   
    return (
        <div>
            
        </div>
    )
}

export default LinieFilmeUpcoming

import React, { useEffect, useState } from 'react'
import axios from '../../axios';
function ForCrewTv({titlu,departament,id_film}) {
    const [crew, setCrew] = useState([]);
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    const url_date=`/tv/${id_film}/credits?api_key=${cheie_API}`;
    const urlPoza = 'https://image.tmdb.org/t/p/original';
  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(url_date);
      setCrew(request.data.crew);
      return request;
      
  }
  fetchData();
  
  }, [url_date]);
    return (
      
        <div>
            
            <h2 style={{borderBottom:'1px solid gray',marginTop:'20px',marginBottom:'10px'}}>{titlu}</h2>
            {
        crew &&
        crew.map((membru, index) =>  {
          if(membru.job===departament || membru.department===departament){
          return ( 
               <div key={index}>
                   {membru.name} - {membru.job}
               </div>
            )
          }
         })
     }
        </div>
    )
}

export default ForCrewTv

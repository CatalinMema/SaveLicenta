import React, { useEffect, useState } from 'react'
import axios from '../../axios';
function ForCrew({titlu,departament,id_film}) {
    const [crew, setCrew] = useState([]);
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    const url_date=`/movie/${id_film}/credits?api_key=${cheie_API}`;
    const urlPoza = 'https://image.tmdb.org/t/p/original';
  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(url_date);
      setCrew(request.data.crew);
      return request;
      
  }
  fetchData();
  
  }, [url_date]);
  let lista_departamente=[]
  crew.map((item,index)=>
  {
    lista_departamente.push(item.department);
  });
 
  let itemStocat;
  for(let i=0;i<lista_departamente.length;i++)
  {
    itemStocat=lista_departamente.find(id_verificare => id_verificare === lista_departamente[i].id);
  }
 
    
  const buttonDezactivat = itemStocat? true : false; 
  const lista=crew.map((membru, index) =>  {
    if(membru.job===departament || membru.department===departament){
    return ( 
         <div key={index}>
             {membru.name} - {membru.job}
         </div>
      )
    }
   
   })

    return (
      
        
        <div>
           
            <h2 style={{borderBottom:'1px solid gray',marginTop:'20px',marginBottom:'10px'}}>
                {titlu}
                
                </h2>
      {
       
       lista
     }
        </div>
    )
}

export default ForCrew

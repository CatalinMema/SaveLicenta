import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import { aducdetaliiSerial } from '../../Requests';
import CartonasActor from '../CartonasActor/CartonasActor';
import Footer from '../Footer/Footer';
import ForCrewTv from '../ForCrewTv/ForCrewTv';
import Titlu from '../Titlu/Titlu';
import './CastCrewTv.css'
function CastCrewTv(props) {
    let id_serial= props.match.params.id;
    const [cast, setCast] = useState([]);
    const[detaliiSerial,setDetaliiSerial]=useState([]);
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    const url_date=`/tv/${id_serial}/aggregate_credits?api_key=${cheie_API}`;
    const urlPoza = 'https://image.tmdb.org/t/p/w200';
  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(url_date);
      setCast(request.data.cast);
      return request;
      
  }
  fetchData();
  
  }, [url_date]);
  
 
  useEffect(()=>{
    async function aducDate() {
          setDetaliiSerial(await aducdetaliiSerial(id_serial)); 
      };
      aducDate();
  },[id_serial])



  
    return (
        <div  className="col-sm-10 toataPagina" style={{marginTop:'80px',color:'white'}}>
            
         <div className="postFilm"  >
                 <img className="PosterMovie" src={`${urlPoza}/${detaliiSerial.poster_path}`} alt={detaliiSerial.title} />
                 
                 <div style={{marginLeft:'20px',marginTop:'30px'}}>
                   
                  <Titlu titlu= {detaliiSerial.name? detaliiSerial.name : detaliiSerial.original_name} pagina={`/tv/${id_serial}`} arrow />
           
                  <div>
                  <h3>Full Cast and Crew </h3></div></div>
            </div>
          
            

           
            <ForCrewTv titlu="Produced by" departament="Production" id_film={id_serial}/>
           
          
            <h2 style={{borderBottom:'1px solid gray',marginTop:'20px',marginBottom:'10px'}}>Cast</h2>


<div className="allActorsCast">
{
cast &&
cast.map((actor, index) =>  {
  if(actor.profile_path){
  return ( 
        <div key={index}  className="actorCast"  > 
   {/*} <CartonasActor actor={actor} key={index}/>*/}
    <img className="hoverElement" onClick={e =>  window.location.href=`/actor/${actor.id}`} 
     src={urlPoza+actor.profile_path} />
    <div className="elementeCast ">      
      <h6> </h6></div>
   <div className="elementeCast">  <h6 className="hoverElement" onClick={e =>  window.location.href=`/actor/${actor.id}`} 
    >{actor.name}</h6></div>
   <div className="elementeCast ">      
      <h6> </h6></div>
     {actor.roles.map((rol,ind)=>{
       if(rol.character === "Barry Allen / The Flash"){
       
       return(
         <div  className="elementeCast" key={ind} > 
         <h6>{rol.character} </h6>
        
         </div>
       )  }
       if(rol.character === "Barry Allen / Savitar"){
       
        return(
          <div style={{display:'none'}}  className="elementeCast" key={ind} > 
          <h6>{rol.character} </h6>
         
          </div>
        )  }
        if(ind===0){
        return(
          <div  className="elementeCast" key={ind} > 
          <h6>{rol.character} </h6>
         
          </div>
        )  
       }
     })}
      <div className="elementeCast ">      
      <h6> </h6></div>
      <div className="elementeCast ">      
      <h6>{actor.total_episode_count} episodes</h6></div></div>
       
    )
  }
 })
}</div>
            
<ForCrewTv titlu="Sound by" departament= "Sound" id_film={id_serial}/>
            <ForCrewTv titlu="Art by" departament=   "Art" id_film={id_serial}/>
            <ForCrewTv titlu="Costume and Make-Up by" departament=   "Costume & Make-Up" id_film={id_serial}/>
          
          
          <div style={{marginTop:'100px'}} />
            <Footer />
        </div>
    )
}

export default CastCrewTv

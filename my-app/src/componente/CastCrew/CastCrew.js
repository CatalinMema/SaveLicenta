import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import { aducdetaliiFilm } from '../../Requests';
import CartonasActor from '../CartonasActor/CartonasActor';
import Footer from '../Footer/Footer';
import ForCrew from '../ForCrew/ForCrew';
import Titlu from '../Titlu/Titlu';
import './cast.css';
function CastCrew(props) {
    let id_film= props.match.params.id;
    const [crew, setCrew] = useState([]);
    const [cast, setCast] = useState([]);
    const[detaliiFilm,setdetaliiFilm]=useState([]);
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    const url_date=`/movie/${id_film}/credits?api_key=${cheie_API}`;
    const urlPoza = 'https://image.tmdb.org/t/p/w200';
  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(url_date);
      setCrew(request.data.crew);
      setCast(request.data.cast);
      return request;
      
  }
  fetchData();
  
  }, [url_date]);
 
  useEffect(()=>{
    async function aducDate() {
          setdetaliiFilm(await aducdetaliiFilm(id_film)); 
      };
      aducDate();
  },[id_film])

  
  
    return (
        <div  className="col-sm-10 toataPagina" style={{marginTop:'80px',color:'white'}}>
            
         <div className="postFilm"  >
                 <img className="PosterMovie" src={`${urlPoza}/${detaliiFilm.poster_path}`} alt={detaliiFilm.title} />
                 <div style={{marginLeft:'20px',marginTop:'30px'}}>        
      <Titlu titlu= {detaliiFilm.title ||  detaliiFilm.original_name} pagina={`/movie/${id_film}`} arrow />
            </div>
                  
               
            </div>
            <h2>Full Cast and Crew</h2>
            
           <ForCrew titlu="Directed by" departament="Director" id_film={id_film}/>
           <ForCrew titlu="Writing Credits" departament="Writing" id_film={id_film}/>
            
            
            
            
           <h2 style={{borderBottom:'1px solid gray',marginTop:'20px',marginBottom:'10px'}}>Cast</h2>


            <div className="allActorsCastFilm">
            
            {
cast &&
cast.map((actor, index) =>  {
  return (
    <div key={index}  className="actorCastFilm"  > 
    <img className="hoverElement"  onClick={e =>  window.location.href=`/actor/${actor.id}`} 
               src={urlPoza+actor.profile_path} />
    <div className="elementeCastFilm">  
    <h6></h6>
    </div>
    <div className="elementeCastFilm">  
    <h6  className="hoverElement" onClick={e =>  window.location.href=`/actor/${actor.id}`} 
              >{actor.name}</h6>
    </div>
    <div className="elementeCastFilm">  
    <h6></h6>
    </div>
    <div className="elementeCastFilm">
    <h6>{actor.character}</h6>
    </div>
 </div>)
}) }

</div>

<ForCrew titlu="Produced by" departament="Production" id_film={id_film}/>
<ForCrew titlu="Sound by" departament="Sound" id_film={id_film}/>
<ForCrew titlu="Cinematography  by" departament="Camera" id_film={id_film}/>
<ForCrew titlu="Editing by" departament="Editing" id_film={id_film}/>
<ForCrew titlu="Casting by" departament="Casting"  id_film={id_film}/>
<ForCrew titlu="Design by" departament="Art"  id_film={id_film}/>
<ForCrew titlu="Costumes and Make-Up by" departament="Costume & Make-Up"  id_film={id_film}/>
<ForCrew titlu="Visual Effects by" departament="Visual Effects"  id_film={id_film}/>
<div style={{marginTop:'100px'}} />
<Footer />
        </div>
    )
}

export default CastCrew

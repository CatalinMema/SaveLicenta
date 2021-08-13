import React from 'react'
import { FaStar } from 'react-icons/fa'
 
function CartonasFilmDinWatched({item}) {
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    
    return (
        <div className="cartonFilm">
            
            <div className="imgposterFilm">
                {item.media_type==="movie" ? (<img onClick={e =>  window.location.href=`/movie/${item.id}`} 
                src={urlPoza+item.poster_path} alt={item.title}></img>   ) : (<img onClick={e =>  window.location.href=`/tv/${item.id}`} 
                src={urlPoza+item.poster_path} alt={item.title}></img>   ) }
                
                
            </div>
                               
            <div className="detaliiFilm"> 
            <div className="evaluare">
                <FaStar size={23} style={{color:'yellow',marginRight:'2px',background:'transparent'}}/><span style={{color:'white',background:'transparent'}}>{item.vote_average}</span>
            </div>
            <h2>{item.title ? item.title : item.name } </h2>
            </div>
        </div>
     
    )
}

export default CartonasFilmDinWatched

import React, { useContext, useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa';
import { MovieContext } from '../../Context/MovieContext';
import { db } from '../../firebase';
import './FavEpisode.css';
function FavEpisodes({email}) {
    
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    const { episodFavorit,setepisodFavorit } = useContext(MovieContext);
  const elimina = (doc_id) => {
    db.collection("episoade").doc(`${email}`).collection(`episoadeFavorite_${email}`).doc(doc_id).delete();
    
}  
  
  return (
    <div className="paginaWatchlist">
    <div className="loc">
      <div className="titlu_nrTitle">
        <h1 className="titlu_pagina">Favorites episodes</h1>

        <span className="nr_elemente">
          {episodFavorit.length} {episodFavorit.length === 1 ? "Episode" : "Episodes"}
        </span>
      </div>

      {episodFavorit.length > 0 ? (
        <div className="grid_episoade">
           
          {episodFavorit.map(({id_doc, data : { poza ,nume,id_serial,sezon,episod,titlu_serial }},index) => {
           
              return ( 
              <div key={index} className="cartonas_episod">
               
                <img className="hoverElement" onClick={e =>  window.location.href=`/tv/seasons/${id_serial}/season=${sezon}/episode=${episod}`} 
                src={poza} alt={nume}/> 
                <h6 className="hoverElement" onClick={e =>  window.location.href=`/tv/${id_serial}`} >{titlu_serial}</h6>
                <h6 className="hoverElement" onClick={e =>  window.location.href=`/tv/seasons/${id_serial}/season=${sezon}/episode=${episod}`}>S{sezon}.E{episod} - {nume}   </h6>
                 
                <div key={`${index}_${1}`} className="afisare_btnEpisod">  
                  <button 
                    className="ctrl-btnWatched"
                    onClick={()=>elimina(id_doc)}>
                    <FaWindowClose/>
                  </button>    
                </div>
              </div>)
            
            
            })}
     
        </div>
      ) : (
        <h2 className="niciun_element">No episodes in your list! Add some!</h2>
      )}
    </div>
  </div>
    )
}

export default FavEpisodes

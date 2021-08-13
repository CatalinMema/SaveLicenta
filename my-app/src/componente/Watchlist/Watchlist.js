import React, { useContext, useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa';
import { MovieContext } from '../../Context/MovieContext';
import { db } from '../../firebase';
import './List.css';
function Watchlist({email}) {
     
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    const { posts,watched } = useContext(MovieContext);

  const elimina = (doc_id) => {
    db.collection(`lista`).doc(`${email}`).collection(`lista_${email}`).doc(doc_id).delete();
    
}




    return (
        <div className="paginaWatchlist">
        <div className="loc">
          <div className="titlu_nrTitle">
            <h1 className="titlu_pagina">Watchlist</h1>
  
            <span className="nr_elemente">
              {posts.length} {posts.length === 1 ? "Title" : "Titles"}
            </span>
          </div>
  
          {posts.length > 0 ? (
            <div className="grid_elemente">
               
              {posts.map(({id_doc, data : { poza ,titlu,id,media_type }},index) => {
                if(media_type==='movie'){
                  return ( 
                  <div key={index} className="cartonas_item">
                   
                    <img className="hoverElement" onClick={e =>  window.location.href=`/movie/${id}`} 
                    src={poza} alt={titlu}/> 
                   <h6 className="titluWatchlist hoverElement"
                   onClick={e =>  window.location.href=`/movie/${id}`} 
                 
                   >{titlu}   </h6>
                  
                    <div key={`${index}_${1}`} className="afisare_btn">  
                      <button 
                        className="ctrl-btnWatchlist"
                        onClick={()=>elimina(id_doc)}>
                        <FaWindowClose/>
                      </button>    
                    </div>
                  </div>)
                }
                else if(media_type==='tv'){
                  return ( 
                    <div key={index} className="cartonas_item">
                       {poza.slice(urlPoza.length)!=="null" ? 
                       (
                       <img className="hoverElement" onClick={e =>  window.location.href=`/tv/${id}`} src={poza} alt={titlu}/> 
                    ) : (
                      <div className="hoverElement" key={index} className="noPoza" 
                      onClick={e =>  window.location.href=`/tv/${id}`} 
                       /> 
                    
                    ) }
                         <h6
                          className="titluWatchlist hoverElement"
                          onClick={e =>  window.location.href=`/tv/${id}`}
                          >{titlu}   
                          </h6>
                      <div key={`${index}_${1}`} className="afisare_btn">  
                        <button 
                          className="ctrl-btnWatchlist"
                          onClick={()=>elimina(id_doc)}>
                          <FaWindowClose/>
                        </button>     
                      </div> 
                    </div>)
                }
                })}
         
            </div>
          ) : (
            <h2 className="niciun_element">No movies or tv series in your list! Add some!</h2>
          )}
        </div>
      </div>
    )
}

export default Watchlist

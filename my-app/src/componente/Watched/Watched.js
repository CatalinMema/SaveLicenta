import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firebase';
import { FaWindowClose } from 'react-icons/fa';
 import './watched.css';
import { MovieContext } from '../../Context/MovieContext';
 const Watched = ({email}) => {
   const { watched } = useContext(MovieContext);

   
  const elimina = (doc_id) => {
    db.collection(`urmarite`).doc(`${email}`).collection(`urmarite_${email}`).doc(doc_id).delete();
    
}

  return (
      <div className="paginaWatched">
      <div className="loc">
        <div className="titlu_nrTitle">
          <h1 className="titlu_watch">Watched</h1>

          <span className="nr_elemente">
            {watched.length} {watched.length === 1 ? "Title" : "Titles"}
          </span>
        </div>

        {watched.length > 0 ? (
          <div className="grid_elemente">
            {watched.map(({id_doc,data, data : { poza ,titlu,id,media_type },index}) => {
              if(media_type==='movie'){
              return ( 
              <div key={id} className="cartonas_itemWatched">
                <img className="hoverElement" onClick={e =>  window.location.href=`/movie/${id}`} src={poza} alt={titlu}/> 
                <h6 className="titluWatched hoverElement" onClick={e =>  window.location.href=`/movie/${id}`}>
                  
                  {titlu}   </h6>
                <div className="afisare_butnWatched">  
                <button 
               className="ctrl-btnWatched"
              onClick={()=>elimina(id_doc)}>
              <FaWindowClose/>
              </button>
              
              </div></div>)
              }
              else if(media_type==='tv'){
                return ( 
                  <div key={id} className="cartonas_itemWatched">
                    <img className="hoverElement" onClick={e =>  window.location.href=`/tv/${id}`} src={poza} alt={titlu}/> 
                   <div className="titluWatched"> 
                    <h6 className="hoverElement" onClick={e =>  window.location.href=`/tv/${id}`} >{titlu}   </h6></div>
                    <div className="afisare_butnWatched">  
                    <button 
               className="ctrl-btnWatched"
              onClick={()=>elimina(id_doc)}>
              <FaWindowClose/>
              </button>  
             
              </div></div>)
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
  export default Watched;
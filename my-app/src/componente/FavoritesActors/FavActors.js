import React, { useContext, useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa';
import { MovieContext } from '../../Context/MovieContext';
import { db } from '../../firebase';
 import './Act.css';

 const FavActors = ({email}) => {
  const { user,actori } = useContext(MovieContext);
  const elimina = (doc_id) => {
    db.collection("actori").doc(`${user.email}`).collection(`actori_${user.email}`).doc(doc_id).delete();
    
}
  
 
    return (
        <div className="paginaActori">
        
          <div className="topTitle">
            <h1 className="titluPG">Favorites Actors</h1>
  
            <span className="nr_actori">
              {actori.length} {actori.length === 1 ? "Actor" : "Actors"}
            </span>
          </div>
  
          {actori.length > 0 ? (
            <div className="grid_elemente">
              {actori.map(({ id_doc,data : { poza ,nume,id,media_type }},index) => (
                
                 <div key={index} className="cartonas_actor">
                 
            
                <img  className="imagActor hoverElement"  onClick={e =>  window.location.href=`/actor/${id}`} 
                src={poza}
                alt={nume} />  
               <h6 className="hoverElement" onClick={e =>  window.location.href=`/actor/${id}`}>{nume}  </h6> 
                <div className="afisare_butoaneActor">  
                <button 
                 className="elimina"
                onClick={()=>elimina(id_doc)}>
                <FaWindowClose/>
                </button>     </div> 
            </div>
              ))}
            </div>
          ) : (
            <h2 className="niciun_actor">No actors in your list! Add some!</h2>
          )}
        
      </div>
    );
  };
  export default FavActors;
import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaStar } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { auth, db } from '../../firebase';
import { aducdetaliiSerial, next_episode_to_air } from '../../Requests';
import firebase from 'firebase';
import './CartonasPentruEpisod.css';
import { MovieContext } from '../../Context/MovieContext';
import { useHistory } from 'react-router';
function CartonasPentruEpisod({item}) {
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    const [detaliiSerial,setDetaliiSerial]=useState([]);
    const [episodUrmator,setEpisodUrmator]=useState([]);
    const urlPozaNext='https://image.tmdb.org/t/p/w300';
    useEffect(()=>{
        async function aducDateSerial(){
            setDetaliiSerial(await aducdetaliiSerial(item.id))
            setEpisodUrmator(await next_episode_to_air(item.id));
        }
        aducDateSerial();
    },[])
    const[user]=useAuthState(auth);
    const { episodFavorit,setepisodFavorit } = useContext(MovieContext);
    let id_episode=[]
    episodFavorit.map((episod)=>{
        return (
          id_episode.push(episod.data.id) 
        )
      })
    let itemStocatUrmator=id_episode.find(id_verificare => id_verificare === episodUrmator?.id);
    const buttonDezactivatUrmator = itemStocatUrmator? true : false; 

    const sendEpisodeUrmator = (e) => {
        e.preventDefault();
        if(episodUrmator.still_path===null){
      db.collection("episoade").doc(`${user.email}`).collection(`episoadeFavorite_${user.email}`).add({
          id: episodUrmator?.id,
          id_serial:item.id,
          titlu_serial:detaliiSerial.name || detaliiSerial.original_name || detaliiSerial.title,
          userId: user.uid,
          nume_user:user.displayName,
          email:user.email,
          poza:urlPozaNext+detaliiSerial?.backdrop_path,
          nume:episodUrmator?.name,
          sezon:episodUrmator?.season_number,
          episod:episodUrmator?.episode_number,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })}
      else{
        db.collection("episoade").doc(`${user.email}`).collection(`episoadeFavorite_${user.email}`).add({
          id: episodUrmator?.id,
          id_serial:item.id,
          titlu_serial:detaliiSerial.name || detaliiSerial.original_name || detaliiSerial.title,
          userId: user.uid,
          nume_user:user.displayName,
          email:user.email,
          poza:urlPozaNext+episodUrmator?.still_path,
          nume:episodUrmator?.name,
          sezon:episodUrmator?.season_number,
          episod:episodUrmator?.episode_number,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })}
      
      ;}
      const history = useHistory();
   
    return (
        
        <div className="cartonas_episodUrmator">
               {episodUrmator?.still_path===null? (
                    <img 
                    onClick={()=>{history.push(`/tv/seasons/${item.id}/season=${episodUrmator?.season_number}/episode=${episodUrmator?.episode_number}`)}} 
                    className="hoverElement"  
                    src={urlPoza+detaliiSerial.backdrop_path} alt={episodUrmator.name}/> 
                  
               ) : ( <img 
                onClick={()=>{history.push(`/tv/seasons/${item.id}/season=${episodUrmator?.season_number}/episode=${episodUrmator?.episode_number}`)}} 
                className="hoverElement"  
               src={urlPoza+episodUrmator?.still_path} alt={episodUrmator?.name}/> 
             ) }
            <div className="bxSahdow"> 
            <div style={{display:'flex',justifyContent:'space-between'}}>
                 <h6 className="hoverElement" 
                onClick={e =>  window.location.href=`/tv/${item.id}`} 
                 >{detaliiSerial.name}</h6>
                 <span>{episodUrmator?.air_date}</span>
                 
                 </div>
                 <div style={{display:'flex',justifyContent:'space-between'}}>  
                 <h6
                  className="hoverElement"
                  onClick={()=>{history.push(`/tv/seasons/${item.id}/season=${episodUrmator?.season_number}/episode=${episodUrmator?.episode_number}`)}} 
    
                  >
                     S{episodUrmator?.season_number}.E{episodUrmator?.episode_number} - {episodUrmator?.name ? (episodUrmator?.name) : (detaliiSerial?.name)}    </h6>
                     
                 
                <div className="afisare_btnEpisodUrmator">  
                  <button disabled={buttonDezactivatUrmator}
                  onClick={sendEpisodeUrmator}
                  className="addToEpisodes"
                  >
                     <MdFavorite  size={40} />
                  </button>    
                </div></div>
                
                        </div>
              </div>
    )
}

export default CartonasPentruEpisod

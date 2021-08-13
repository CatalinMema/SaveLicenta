import React, { useContext } from 'react'

import { FaStar } from 'react-icons/fa'
import { ImEyePlus} from 'react-icons/im';
import {FiCheckCircle} from 'react-icons/fi'
import {  db } from '../../firebase';
import './CartonasFilm.css'
import firebase from 'firebase';
import Spinner from "react-spinkit";
import { BsBookmarkCheck, BsBookmarkPlus } from 'react-icons/bs';
import { MovieContext } from '../../Context/MovieContext';
function CartonasFilm({item}) {
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    function truncate(string,n) {
        return string?.length > n ? string.substring(0,n-1) + '...' : string;
    }
    
    const { user,posts,isLoading,watched } = useContext(MovieContext);

    let filme=[]
    posts.map((post)=>{
      return (
        filme.push(post.data.id)
        
      )
    })

    let itemStocat=filme.find(id_verificare => id_verificare === item.id);
    const buttonDezactivat = itemStocat? true : false; 
    const sendWatchlist = (e) => {
        e.preventDefault();
       
        
        db.collection(`lista`).doc(`${user.email}`).collection(`lista_${user.email}`).add({
            id:item.id,
            userId: user.uid,
            nume:user.displayName,
            email:user.email,
            poza:urlPoza+item.poster_path,
            titlu:item.title ? item.title : item.original_title,
            media_type:'movie',
            vote_average:item.vote_average,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
 
        
    }



    

    let filmeWatched=[]
    watched.map((post)=>{
      return (
        filmeWatched.push(post.data.id)
        
      )
    })

    let alreadyIndb=filmeWatched.find(id_verificare => id_verificare === item.id);
    const buttonDezactivatWatched = alreadyIndb? true : false; 
    const sendWatched = (e) => {
        e.preventDefault();
       
        
        db.collection(`urmarite`).doc(`${user.email}`).collection(`urmarite_${user.email}`).add({
            id:item.id,
            userId: user.uid,
            nume:user.displayName,
            email:user.email,
            poza: item.poza || urlPoza+item.poster_path,
            titlu:item.title || item.original_title || item.titlu,
            media_type:'movie',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
 
        
    }

  /*  const removeFromWatchlist = (e) => {
        e.preventDefault();
        db.collection(`lista${user.email}`).delete().then
    }*/
    
    if(posts && watched){
    return (
        <div className="cartonFilm">
       
            <div className="butoaneCartonasFilm">
             <button disabled={buttonDezactivat} onClick={sendWatchlist}  className="btnWatchFilm"> 
             {buttonDezactivat ? (<BsBookmarkCheck className="iconFilm"/>) : ( <BsBookmarkPlus className="iconFilm"/>)}
            </button>
            
            <button disabled={buttonDezactivatWatched} onClick={sendWatched}  className="btnWatchFilm">
                {buttonDezactivatWatched ? ( <FiCheckCircle className="iconFilm"/>) : ( <ImEyePlus className="iconFilm"/>)}
               
                
                </button>
            </div>
            {isLoading ? (  <div className="loadingCartonasFilm">
            <div className="continutLoadingCartonasFilm">
              <Spinner
              name="ball-spin-fade-loader"
              color="#F2AA4cFF"
              fadeIn="none" />
            </div>
          </div>) : (<div className="imgposterFilm">
                <img onClick={e =>  window.location.href=`/movie/${item.id}`} 
                src={item.poza || urlPoza+item.poster_path} alt={item.title}></img>   
                
            </div>) }
                               
            <div className="detaliiFilm"> 
            <div className="evaluare">
                <FaStar size={23} style={{color:'yellow',marginRight:'2px',background:'transparent'}}/><span style={{color:'white',background:'transparent'}}>{item.vote_average}</span>
            </div>
            <h2>{ truncate(item.title,40)  || truncate(item.original_title,40)|| item.titlu } </h2>
            </div>
        </div>
     
    )}
    else{
      return (
        <div className="loadingCartonasFilm">
            <div className="continutLoadingCartonasFilm">
              <Spinner
              name="ball-spin-fade-loader"
              color="#F2AA4cFF"
              fadeIn="none" />
            </div>
          </div>
      )
    }
}

export default CartonasFilm

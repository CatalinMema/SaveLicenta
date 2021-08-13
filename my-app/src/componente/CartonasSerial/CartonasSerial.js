import React, { useContext } from 'react'
import './CartonasSerial.css';
import { FaStar } from 'react-icons/fa';
import {  db } from '../../firebase';
import firebase from 'firebase';
import { BsBookmarkCheck, BsBookmarkPlus } from 'react-icons/bs';
import { FiCheckCircle } from 'react-icons/fi';
import { ImEyePlus } from 'react-icons/im';
import Spinner from "react-spinkit";
import { MovieContext } from '../../Context/MovieContext';
function CartonasSerial({item}) {
  const urlPoza = 'https://image.tmdb.org/t/p/original';
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
            titlu:item.name ? item.name : item.original_name,
            media_type:'tv',
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
            poza:item.poza || urlPoza+item.poster_path,
            titlu:item.name || item.original_name || item.titlu,
            media_type:'tv',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
 
        
    }

    
    

    if(posts && watched){
    return (
        <div className="cartonSerial">
            <div className="butoaneCartonasSerial">
            <button disabled={buttonDezactivat} onClick={sendWatchlist}  className="btnWatchSerial"> 
             {buttonDezactivat ? (<BsBookmarkCheck className="iconSerial"/>) : ( <BsBookmarkPlus className="iconSerial"/>)}
            </button>
            
            <button disabled={buttonDezactivatWatched} onClick={sendWatched}  className="btnWatchSerial">
                {buttonDezactivatWatched ? ( <FiCheckCircle className="iconSerial"/>) : ( <ImEyePlus className="iconSerial"/>)}
               
                
                </button>
            </div>
            {isLoading ? (<div className="loadingCartonasFilm">
            <div className="continutLoadingCartonasFilm">
              <Spinner
              name="ball-spin-fade-loader"
              color="#F2AA4cFF"
              fadeIn="none" />
            </div>
          </div>) : (<div className="imgposterSerial">
                {item.poster_path?.slice(urlPoza.length)!=="null" ? 
                (<img onClick={e =>  window.location.href=`/tv/${item.id}`} 
                src={item.poza || urlPoza+item.poster_path} alt={item.name}></img>  ) : (
                
                    <div className="imgNoSerial" 
                    onClick={e =>  window.location.href=`/tv/${item.id}`} 
                   ></div>   
                )}
                    
                
                </div>) }
              
                           
            <div className="detaliiSerial"> <div className="evaluare">
                <FaStar size={23} style={{color:'yellow',marginRight:'2px',background:'transparent'}}/><span style={{color:'white',background:'transparent'}}>{item.vote_average}</span>
            </div>
            <h2>{item.titlu || item.name || item.original_name }
             </h2>
           
        </div>
    </div>
    )}
}

export default CartonasSerial

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../../firebase';
 import firebase from 'firebase';
import './style.css';
const RezultatCautare = ({item}) => {
  const[user]=useAuthState(auth);
    const [posts,setPosts] = useState([]);
    const [watched,setwatched] = useState([]);
    useEffect(()=>{
      db.collection(`lista`).doc(`${user.email}`).collection(`lista_${user.email}`).orderBy("timestamp","desc").onSnapshot(documente =>(
        setPosts(documente.docs.map(doc=>(
            {
                id_doc:doc.id,
                data:doc.data(),
            })))))
        db.collection(`urmarite`).doc(`${user.email}`).collection(`urmarite_${user.email}`).orderBy("timestamp","desc").onSnapshot(documente =>(
          setwatched(documente.docs.map(doc=>(
              {
                id_doc:doc.id,
                  data:doc.data(),
                   })))))
    }, [user.email]) 

    let filme=[]
    posts.map((post)=>{
      return (
        filme.push(post.data.id)
        
      )
    })

    const [actori,setActori] = useState([]);
  useEffect(()=>{
    db.collection("actori").doc(`${user.email}`).collection(`actori_${user.email}`).orderBy("timestamp","desc").onSnapshot(documente =>(
      setActori(documente.docs.map(doc=>(
          {
              id_doc:doc.id,
              data:doc.data(),
          })))))
  }, [user.email]) 

  let listaActori=[]
  actori.map((actor)=>{
    return (
      listaActori.push(actor.data.id)
      
    )
  })
  let actorStocat=listaActori.find(id_v => id_v === item.id);
  const butonActoriFavoriti = actorStocat? true : false; 
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    
    let itemStocat=filme.find(id_verificare => id_verificare === item.id);
    const buttonDezactivat = itemStocat? true : false; 
    const sendWatchlist = (e) => {
        e.preventDefault();
       
        db.collection(`lista`).doc(`${user.email}`).collection(`lista_${user.email}`).add({
            id:item.id,
            userId: user.uid,
            nume_user:user.displayName,
            email:user.email,
            poza:urlPoza+item.poster_path,
            titlu:item.title ? item.title : item.name ? item.name : item.original_title ? item.original_title : item.original_name,
            media_type:item.media_type ? item.media_type : 'movie',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
 
        
    }

    const sendActorsToMyFavorites = (e) => {
      e.preventDefault();
     
      db.collection("actori").doc(`${user.email}`).collection(`actori_${user.email}`).add({
          id:item.id,
          userId: user.uid,
          nume_user:user.displayName,
          email:user.email,
          poza:urlPoza+item.profile_path,
          nume:item.name,
          media_type:'actor',
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
            titlu:item.title || item.original_title || item.titlu || item.name || item.original_name,
            media_type:item.media_type,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
 
        
    }

 
    return (
     
      <div className="result-card">
      <div className="poster-wrapper">
         
      {item.media_type==="person" ? (
              
               <img className="hoverElement" onClick={e =>  window.location.href=`/actor/${item.id}`} 
               src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
               alt={`${item.title} Poster`}
             />
        ) : (
          item.media_type==="movie" ? (
         
          <img className="hoverElement"
          onClick={e =>  window.location.href=`/movie/${item.id}`} 
            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
            alt={`${item.title} Poster`}
          />) :(
           
          <img className="hoverElement"  onClick={e =>  window.location.href=`/tv/${item.id}`} 
            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
            alt={`${item.title} Poster`}
          /> )
          
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{item.title ? item.title : item.name}</h3>
          <h4 className="release-date">
            {item.release_date ? item.release_date.substring(0,4): item.first_air_date?.substring(0,4) }
          </h4>
        </div>

        <div className="controls">
        {item.media_type==="person" ? (<button
            className="btn"
            onClick={sendActorsToMyFavorites}
            disabled={butonActoriFavoriti}
          >
            Add to favorites
          </button>):( 
          <div style={{display:'flex'}}>
          <button
            className="btn"
            disabled={buttonDezactivat} onClick={sendWatchlist} 
          >
            Add to Watchlist
          </button><button
            className="btn"
            disabled={buttonDezactivatWatched} onClick={sendWatched} 
          >
            Add to Watched
          </button>
          </div>)}
         

          
        </div>
      </div>
    </div>
    )
}

export default RezultatCautare

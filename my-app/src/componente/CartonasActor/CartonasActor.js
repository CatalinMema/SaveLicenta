import React, { useContext } from 'react'
import { BsFillPersonCheckFill ,BsFillPersonPlusFill} from 'react-icons/bs';
import {  db } from '../../firebase';
import firebase from 'firebase';
import './CartonasActor.css';
import Spinner from "react-spinkit";
import { MovieContext } from '../../Context/MovieContext';
function CartonasActor({actor}) {
    
  const { user,actori,isLoading } = useContext(MovieContext);
  let id_actori=[]
  actori.map((post)=>{
      return (
        id_actori.push(post.data.id) 
      )
    })
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    let itemStocat=id_actori.find(id_verificare => id_verificare === actor.id);
    const buttonDezactivat = itemStocat? true : false; 
    
    const sendToActors = (e) => {
        e.preventDefault();
      db.collection("actori").doc(`${user.email}`).collection(`actori_${user.email}`).add({
          id:actor.id ? actor.id : actor.id_persoana,
          userId: user.uid,
          nume_user:user.displayName,
          email:user.email,
          poza:urlPoza+actor.profile_path,
          nume:actor.name,
          media_type:'actor',
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
 
        
    }
   

    if(isLoading){
        return (
          <div className="loadingCartonasFilm">
            <div className="continutLoadingCartonasFilm">
              <Spinner
              name="ball-spin-fade-loader"
              color="#F2AA4cFF"
              fadeIn="none" />
            </div>
          </div>
        );
      }
      //console.log(actor.profile_path)
    return (
        <div className="cartonActor" style={{color:'white'}}>
            
            <img 
            onClick={e =>  window.location.href=`/actor/${actor.id ? actor.id : actor.id_persoana}`} 
            src={urlPoza+actor.profile_path} 
            alt={actor.name} 
            className="actorImagine"/>
                <p>{actor.name}</p>
                <span>{actor.character}</span>
                <div className="afisare_btnAddActor">  
                    <button className="addToActors" 
                        disabled={buttonDezactivat} 
                        onClick={sendToActors}>
                        {buttonDezactivat ? ( <BsFillPersonCheckFill />) : (<BsFillPersonPlusFill/>)}
                   
                    </button> 
                </div>
        </div>
    )
}

export default CartonasActor

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import CartonasWatchedRecomandariRandom from '../CartonasWatchedRecomandariRandom/CartonasWatchedRecomandariRandom';
import CartonasWatchedSerial from '../CartonasWatchedRecomandariRandom/CartonasWatchedSerial';
import Titlu from '../Titlu/Titlu';

function LinieRecomandari() {
    const [user]=useAuthState(auth);
    const [dinListaUrmarite,setdinListaUrmarite]=useState([])
    const aducListaDeFilmeUrmarite=async()=>{
      const raspuns=db.collection(`urmarite`).doc(`${user.email}`).collection(`urmarite_${user.email}`);
      const data=await raspuns.get();
      setdinListaUrmarite(data.docs.map(doc=>(
        {
          id_doc:doc.id,
          data:doc.data(),   
        }
    ))) 
    }
    useEffect(() => {
      aducListaDeFilmeUrmarite();
    }, [])
    const elementRandom= dinListaUrmarite[Math.floor(Math.random() * dinListaUrmarite.length)];

    return (
        <div className="col-sm-12" style={{marginTop:'60px'}}>
        <Titlu titlu={"From your watched list"} pagina={"/watched"} arrow/>
               {elementRandom ? 
                  (
                    <div className="col-sm-12">
                    {elementRandom.data.media_type==="movie" ?
                    (<CartonasWatchedRecomandariRandom 
                      key={elementRandom.data.titlu.length} 
                      item={elementRandom}/>  
                    ) 
                    : 
                    (<CartonasWatchedSerial 
                    key={elementRandom.data.titlu.length} 
                    item={elementRandom} />) }
                    </div>
                    ) : (<div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>
                    <h2 style={{color:'gray'}}> No movies or tv series in your list! Add some!</h2>
                </div>)}
      </div>
    )
}

export default LinieRecomandari

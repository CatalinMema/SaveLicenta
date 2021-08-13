import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { aducSezon, adicEpisoade, numar_Sezoane, aducdetaliiSerial } from '../../Requests';
import './Sezoane.css';
import {  Dropdown } from 'react-bootstrap';
import Titlu from '../Titlu/Titlu';
import Footer from '../Footer/Footer';
import { useHistory } from 'react-router';
import { MovieContext } from '../../Context/MovieContext';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import { MdFavorite } from 'react-icons/md';
function Sezoane(props) {
    let id_serial = props.match.params.id;
    const[user]=useAuthState(auth);
    let sezonCurent=props.match.params.nr_sezon;
    const [detaliiDespreEpisoade,setdetaliiDespreEpisoade] = useState([]);
    const [sezon,setSezon]= useState([]);
    const [nr_sezoane,setnr_sezoane] = useState([]);
    const [detaliiSerial,setDetaliiSerial] = useState([]);
    useEffect(()=>{
        async function aducDate() {
            setSezon(await aducSezon(id_serial,sezonCurent));
              setdetaliiDespreEpisoade(await adicEpisoade(id_serial,sezonCurent));
              setnr_sezoane(await numar_Sezoane(id_serial));
              setDetaliiSerial(await aducdetaliiSerial(id_serial));
          };
          aducDate();
      },[sezonCurent])
      const urlPoza='https://image.tmdb.org/t/p/w200';
      const { episodFav } = useContext(MovieContext);
      let id_episode=[]
      episodFav.map((post)=>{
          return (
            id_episode.push(post.data.id) 
          )
        })
        
         
        const sendEpisode = (e,item) => {
            e.preventDefault();
            db.collection("episoade").doc(`${user.email}`).collection(`episoadeFavorite_${user.email}`).add({
              id: item.id,
              id_serial:id_serial,
            titlu_serial:detaliiSerial.name || detaliiSerial.original_name,
            userId: user.uid,
          nume_user:user.displayName,
          email:user.email,
          poza:urlPoza+item.still_path,
          nume:item.name,
          sezon:item.season_number,
          episod:item.episode_number,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
     
            
        }


      const episodes = detaliiDespreEpisoade?.map((episode,index)=>{
        let itemStocat=id_episode.find(id_verificare => id_verificare === episode?.id);
        const buttonDezactivat = itemStocat? true : false; 
          return (
<div className="episoade"  key={index}>
    {episode.still_path ? ( <img onClick={e =>  window.location.href=`/tv/seasons/${id_serial}/season=${sezonCurent}/episode=${episode.episode_number}`}
                 className="pozaEpisod hoverElement" 
            src={`${urlPoza}${episode.still_path}`} />) : (<img onClick={e =>  window.location.href=`/tv/seasons/${id_serial}/season=${sezonCurent}/episode=${episode.episode_number}`}
            className="pozaEpisod hoverElement" 
            src={`${urlPoza}${detaliiSerial.backdrop_path}`} />)}
           
            <div className=" faraBackground" style={{marginLeft:'20px'}}>
                <div className="episodeTitlu faraBackground" style={{display:'flex',justifyContent:'space-between'}}>
               
                <h2
                onClick={e =>  window.location.href=`/tv/seasons/${id_serial}/season=${sezonCurent}/episode=${episode.episode_number}`}
                className="hoverElement" 
                >{episode.name} </h2>
                  
                   <button className="btnFav" disabled={buttonDezactivat}   
                onClick={(e) => sendEpisode(e,episode)}><MdFavorite size={40} /></button>
        
            
                </div> <p>{episode.air_date}</p>
            <FaStar style={{color:'yellow'}}/>
            <span>{episode.vote_average}</span>
            <p style={{marginTop:'5px'}}>{episode.overview}</p>
            </div>
            
           </div>
            
          )
      })
      const history=useHistory();
      const listaSezoane = nr_sezoane.map((nr,index)=>{
         
          return(
            <Dropdown.Item onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${nr.season_number}`)}}  key={index} >{nr.season_number}</Dropdown.Item>
            
          )
      })

 
      
    return (
        <div>
        <div className="col-sm-12 Sezoane">
           
           
        <div  className="posterDesc">
        {sezon.poster_path ? ( <img  className=" hoverElement"
        onClick={()=>{history.push(`/tv/${id_serial}`)}}
        src={`${urlPoza}${sezon?.poster_path}`}/>) : (
            <img src={`${urlPoza}${detaliiSerial?.poster_path}`}/>
        ) }
       
        <div style={{display:'inline',marginLeft:'20px',marginTop:'50px'}}>
        <Titlu titlu={detaliiSerial.name} pagina={`/tv/${id_serial}`} arrow />
        <Dropdown >
                        <button className="btn_allMovies"  
                            >Season   {sezonCurent}</button>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        
                        {listaSezoane}
                        </Dropdown.Menu>
                    </Dropdown>
                    <h6 style={{marginTop:'30px'}}> {sezon?.overview}</h6>
                    </div>
        </div>
      
        
        <h2>Episodes</h2>
            {episodes}

            <div style={{height:'50px'}}/>
           
        </div>
    
        <div style={{marginTop:'100px'}}/>
         <Footer />   
         
         </div>
    )
}

export default Sezoane

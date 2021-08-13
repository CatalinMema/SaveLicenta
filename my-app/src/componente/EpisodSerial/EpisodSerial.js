import React, { useContext, useEffect, useState } from 'react'
import { detaliiEpisod,adicEpisoade ,imaginiEpisodSerial,videoEpisodSerial,castEpisodSerial,guest_starsEpisodSerial, aducdetaliiSerial, numar_Sezoane} from '../../Requests';
import Titlu from '../Titlu/Titlu';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartonasActor from '../CartonasActor/CartonasActor';
import { BsPersonFill } from 'react-icons/bs';
import {GrFormPrevious} from 'react-icons/gr';
import './EpisodeSerial.css';
import {  Dropdown } from 'react-bootstrap';
import TextComentariu from '../Comentarii/TextComentariu/TextComentariu';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import { MdFavorite } from 'react-icons/md';
import Footer from '../Footer/Footer';
import { useHistory } from 'react-router';
import { MovieContext } from '../../Context/MovieContext';
function EpisodSerial(props) {
    const urlPoza='https://image.tmdb.org/t/p/w400';
    const urlPozaimages='https://image.tmdb.org/t/p/w200';
    const urlPoza2='https://image.tmdb.org/t/p/original';
    let id_serial = props.match.params.id;
    let sezonCurent = props.match.params.nr_season;
    let episodecurent=props.match.params.episode;
    const [detaliiEpisodCurent,setdetaliiEpisodCurent] = useState([]);
    const [imaginiEpisod,setImaginiEpisode] = useState([]);
    const [videoEpisode,setvideoEpisodee] = useState([]);
    const [crew,setCrew]= useState([]);
    const [guest_stars,setGuest_stars] = useState([]);
    const [nrEpisoade,setnrEpisoade]= useState([]);
    const [detaliiSerial,setDetaliiSerial] = useState([]);
    const [nr_sezoane,setnr_sezoane] = useState([]);
    const[user]=useAuthState(auth);
   
    useEffect(()=>{
        async function aducDate() {
           
              setdetaliiEpisodCurent(await detaliiEpisod(id_serial,sezonCurent,episodecurent));
              setImaginiEpisode(await imaginiEpisodSerial(id_serial,sezonCurent,episodecurent));
              setvideoEpisodee(await videoEpisodSerial(id_serial,sezonCurent,episodecurent));
                setCrew(await castEpisodSerial(id_serial,sezonCurent,episodecurent));
                setGuest_stars(await guest_starsEpisodSerial(id_serial,sezonCurent,episodecurent));
                setnrEpisoade(await adicEpisoade(id_serial,sezonCurent));
                setDetaliiSerial(await aducdetaliiSerial(id_serial));
                setnr_sezoane(await numar_Sezoane(id_serial));
          };
          aducDate();
      },[sezonCurent,episodecurent])


      const { episodFav } = useContext(MovieContext);

    
  let id_episode=[]
  episodFav.map((post)=>{
      return (
        id_episode.push(post.data.id) 
      )
    })
    let itemStocat=id_episode.find(id_verificare => id_verificare === detaliiEpisodCurent?.id);
    const buttonDezactivat = itemStocat? true : false; 
      
      const sendEpisode = (e) => {
        e.preventDefault();
        db.collection("episoade").doc(`${user.email}`).collection(`episoadeFavorite_${user.email}`).add({
          id: detaliiEpisodCurent.id,
          id_serial:id_serial,
          titlu_serial:detaliiSerial.name || detaliiSerial.original_name,
          userId: user.uid,
          nume_user:user.displayName,
          email:user.email,
          poza:urlPoza2+detaliiEpisodCurent.still_path,
          nume:detaliiEpisodCurent.name,
          sezon:sezonCurent,
          episod:episodecurent,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
 
        
    }
      const imaginiLista= imaginiEpisod?.map((imagine,index)=>{
        return (
          <div key={index}>
            <img className="imaginiFilm" src={`${urlPozaimages}${imagine.file_path}`} />
          </div>
        )
      })

      const setariImages = {
         
        speed: 1000,
        cssEase: 'linear',
        slidesToShow:6,
        slidesToScroll:6,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1720,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              }
            },
            {
              breakpoint: 1376,
              settings: {
                slidesToShow: 4,
                slidesToScroll:4,
              
              }
            },
            {
              breakpoint: 1112,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
                breakpoint: 843,
                settings: {
                  slidesToShow: 2,
        slidesToScroll: 2,
                }
              }
          ]
        };

        const videoSerial = videoEpisode?.map((vid,index) =>{
            //console.log(video);
            return(
                
              <div key={index} className="videoSerial"><iframe
              width="853"
              height="400"
              src={`https://www.youtube.com/embed/${vid.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            /></div>
             
            );
            
          }
        );
        const setariVideoPlayer = {
            infinite: true,
            speed: 1000,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll:1,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1131,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll:1,
                }
              },
              {
                breakpoint: 681,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll:1
                
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          };
          //console.log(crew)
          const urlActorPoza = 'https://image.tmdb.org/t/p/original';
          const listaDistributie= crew?.map((actor,index)=>{
             
            if(actor.profile_path!==null){
                return(
                  <CartonasActor key={index} actor={actor} />
                )
            }
            else{
              return (
                
                <div   onClick={e =>  window.location.href=`/actor/${actor.id ? actor.id : actor.id_persoana}`}  key={index} className="cartonPers">
                    <BsPersonFill className="hoverElement" size={190}/>
                    <p style={{color:'white'}}>{actor.name}</p>
                    </div>
                    
              )
            }
          })
          const listaGuestStars= guest_stars?.map((actor,index)=>{
             
            if(actor.profile_path!==null){
                return(
                  <CartonasActor key={index} actor={actor} />
                )
            }
            else{
              return (
                
                <div  onClick={e =>  window.location.href=`/actor/${actor.id ? actor.id : actor.id_persoana}`}  key={index} className="cartonPers">
                    <BsPersonFill size={190}/>
                    <p style={{color:'white'}}>{actor.name}</p>
                    </div>
                    
              )
            }
          })

          const setariDistributie = {
        
            infinite: true,
            speed: 1000,
            slidesToShow: 5 ,
            slidesToScroll:5,
            initialSlide: 0,
            responsive: [
               {
                breakpoint: 1131,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll:3,
                }
              },
              {
                breakpoint: 681,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll:2
                
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll:1,
                }
              }
            ]
          };
          const setariDistributiemaiPutinde5 = {
        
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
             
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1131,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll:3,
                }
              },
              {
                breakpoint: 681,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll:2
                
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll:1,
                }
              }
            ]
          };
          const history=useHistory();
          
          
          const listaSezoane = nr_sezoane.map((nr,index)=>{
           
            return(
              <Dropdown.Item 
              onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${nr.season_number}/episode=${1}`)}}   key={index} >{nr.season_number}</Dropdown.Item>
            
              //http://localhost:3000/tv/seasons/60735/season=1/episode=2
            )
        })

        const listaEpisoade = nrEpisoade.map((nr,index)=>{
        
          return(
            <Dropdown.Item 
            onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${nr.season_number}/episode=${nr.episode_number}`)}} key={index} >{nr.episode_number}</Dropdown.Item>
            
          )
      })
    return (
      <div>
        <div className="col-sm-12 EpisodSerial" >
           <Titlu titlu={detaliiSerial.name} pagina={`/tv/${id_serial}`} arrow />
                    
          
        {episodecurent <= nrEpisoade.length ? 
            (
            <div>
                <div className="btnEpisodes" style={{marginTop:'50px',textAlign:'center'}}>
                
               {/* {episodecurent>=2 ? ( <button className="btn_episoade1"
              style={{
                cursor: episodecurent >= 2 ? "pointer" : "not-allowed",
                background: episodecurent >= 2 ? "#182336" : "#000000",
              }}
              onClick={() => newPage("previous")}
                > 
                 Previous Episode
                </button>) : ( <button className="btn_episoade1"
             
                onClick={e =>  window.location.href=`/tv/${id_serial}`}
                > 
                {detaliiSerial.name}
            </button>) } */}
      
                {/*<button className="btn_episoade2"
             style={{
                cursor: episodecurent < nrEpisoade.length ? "pointer" : "not-allowed",
                background: episodecurent < nrEpisoade.length ? "#182336" : "#000000",
              }}
                onClick={() => newPage("next")}>Next Episode</button>*/}
                </div>
                <div style={{display:'flex',marginTop:'10px'}}>
          <Dropdown >
                        <button  className="btnEpisoade"  
                            >Season   {sezonCurent}</button>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        
                        {listaSezoane}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown style={{marginLeft:'20px'}}>
                        <button  className="btnEpisoade"  
                            >Episode   {episodecurent}</button>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        
                        {listaEpisoade}
                        </Dropdown.Menu>
                    </Dropdown></div>
                   <button className="btnFav" disabled={buttonDezactivat}   onClick={sendEpisode}><MdFavorite size={40} /></button>
                    
                   {/* <button  className="btn_episoade2" disabled={buttonDezactivat}   onClick={sendEpisode}>Add to your favorite</button>
                    */} 
                   
                    <div  className="posterDesc">
  {detaliiEpisodCurent?.still_path ? ( <img src={`${urlPoza}${detaliiEpisodCurent?.still_path}`}/>) : (

<img src={`${urlPozaimages}${detaliiSerial?.poster_path}`}/>
                      )}
               
                <div style={{marginLeft:'20px'}}>
                <h2> {detaliiEpisodCurent?.name}</h2>
                <h6> {detaliiEpisodCurent?.overview}</h6>
                    </div>
        </div>
        <div className="col-sm-9" style={{marginTop:'40px'}}>
  
        <Slider {...setariVideoPlayer}>{videoSerial}</Slider></div>
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
     {imaginiLista.length===0 ? (null) : (<Titlu titlu="Images" pagina={`/tv/images/${id_serial}/season=${sezonCurent}/episode=${episodecurent}`} arrow />
     )}
     {imaginiLista.length < 6 
     ? ( 
      <div style={{display:'flex'}} > 
                   
      <div className="allElements"> 
      {imaginiLista}</div>
      </div> ) : ( <Slider {...setariImages}> {imaginiLista}</Slider> )}
     
        </div>
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
     {listaDistributie.length===0 ? (null) : (<Titlu titlu="Full Cast" pagina={`/tv/cast_crew/${id_serial}`} arrow />
     )}
      {listaDistributie.length < 6 ? (
        
       <Slider {...setariDistributiemaiPutinde5}>{listaDistributie}</Slider>
      ) : (<Slider {...setariDistributie}>{listaDistributie}</Slider>) }
                
        </div>

        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
     {listaGuestStars.length===0 ? (null) : ( <Titlu titlu="Guest Stars" />)}
    
      {listaGuestStars.length < 6 ? (
        
        <div style={{display:'flex',marginLeft:'20px'}} > 
                   
        <div className="allElements"> 
        {listaGuestStars}</div>
        </div>
      ) : (<Slider {...setariDistributie}>{listaGuestStars}</Slider>) }
                
        </div>
        
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
     <h2 style={{color:'white'}}>Reviews</h2>
     <TextComentariu  id_item={`${id_serial}_${sezonCurent}_${episodecurent}`} media_type='tv'/>
     
     
       </div>
               </div>
            
            
            ) : ( <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
               </div>) }
               
        </div>
       
         <Footer />  </div>
    )
}

export default EpisodSerial

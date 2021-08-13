import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import {aducdetaliiSerial,last_episode_to_air,aducdetaliiSerialSezoane,aducImaginiSerial,aducVideoTv, distributieSerial,next_episode_to_air,similarSeries} from '../../Requests';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './DetaliiSerial.css'
import CartonasActor from '../CartonasActor/CartonasActor';
import { BsPersonFill } from 'react-icons/bs';
import CartonasSerial from '../CartonasSerial/CartonasSerial';
import TextComentariu from '../Comentarii/TextComentariu/TextComentariu';
import Titlu from '../Titlu/Titlu';
import Footer from '../Footer/Footer';
import { useHistory } from 'react-router';
import { MovieContext } from '../../Context/MovieContext';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import { MdFavorite } from 'react-icons/md';
function DetaliiSerial(props) {
    let id_serial = props.match.params.id;
    let genuri=[];
    const { episodFavorit,setepisodFavorit } = useContext(MovieContext);
    const[user]=useAuthState(auth);
    const [detaliiSerial,setDetaliiSerial] = useState([]);
    const[video,setVideo]=useState([]);
    const[distributie,setDistributie]=useState([]);
    const[serialeSimilare,setSerialeSimilare]=useState([]);
    const[imagini,setImagini]=useState([]);
    const [sezoane,setSezoane]= useState([]);
    const [episodUrmator,setEpisodUrmator]=useState([]);
    const [episodAnterior,setepisodAnterior]=useState([]);
    
    const urlPoza='https://image.tmdb.org/t/p/w200';
    const urlPozaNext='https://image.tmdb.org/t/p/w300';
    const urlActorPoza = 'https://image.tmdb.org/t/p/original';
    useEffect(()=>{
      async function aducDate() {
            setDetaliiSerial(await aducdetaliiSerial(id_serial));
            setVideo(await aducVideoTv(id_serial));
            setDistributie(await distributieSerial(id_serial));
            setSerialeSimilare(await similarSeries(id_serial));
            setImagini(await aducImaginiSerial(id_serial));
            setSezoane(await aducdetaliiSerialSezoane(id_serial));
            setEpisodUrmator(await next_episode_to_air(id_serial));
            setepisodAnterior(await last_episode_to_air(id_serial));
        };
        aducDate();
    },[id_serial])
  
  let id_episode=[]
  episodFavorit.map((episod)=>{
      return (
        id_episode.push(episod.data.id) 
      )
    })
    let itemStocat=id_episode.find(id_verificare => id_verificare === episodAnterior?.id);
    const buttonDezactivat = itemStocat? true : false; 
    
    let itemStocatUrmator=id_episode.find(id_verificare => id_verificare === episodUrmator?.id);
    const buttonDezactivatUrmator = itemStocatUrmator? true : false; 
    const sendEpisode = (e) => {
      e.preventDefault();
      db.collection("episoade").doc(`${user.email}`).collection(`episoadeFavorite_${user.email}`).add({
        id: episodAnterior.id,
        id_serial:id_serial,
        titlu_serial:detaliiSerial.name || detaliiSerial.original_name,
        userId: user.uid,
        nume_user:user.displayName,
        email:user.email,
        poza:urlPozaNext+episodAnterior.still_path,
        nume:episodAnterior.name,
        sezon:episodAnterior.season_number,
        episod:episodAnterior.episode_number,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });}
   
    
    const sendEpisodeUrmator = (e) => {
      e.preventDefault();
      if(episodUrmator.still_path===null){
        db.collection("episoade").doc(`${user.email}`).collection(`episoadeFavorite_${user.email}`).add({
        id: episodUrmator?.id,
        id_serial:id_serial,
        titlu_serial:detaliiSerial.name || detaliiSerial.original_name,
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
        id_serial:id_serial,
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
    const { setCurrentPage,setvaloarePagina,setidGenSerial} = useContext(MovieContext);
    
   // console.log(episodUrmator)
    
  
    genuri=detaliiSerial.genres;
    let ListaGenuriSerial;
    if(genuri){
        ListaGenuriSerial= genuri.map((gen, i) => {
            return (
              <li className="list-inline-item" key={i}>
                <p className="numeGen" 
   onClick={()=>{history.push(`/genre/tv/${gen.name}/${gen.id}`);
   setidGenSerial(gen.id)
   setCurrentPage(1);
   setvaloarePagina("");}} style={{color:'gray',background:'transparent',margin:'auto'}}>
                  {gen.name}
                </p>
                </li>
            );
          });
        }
        const imaginiLista= imagini.map((imagine,index)=>{
          return (
            <div key={index}>
              <img className="imaginiFilm" src={`${urlPoza}${imagine.file_path}`} />
            </div>
          )
        })
        const history = useHistory();
        const listaSezoane = sezoane.map((sezon,index)=>{
          if(sezon.poster_path!=null){
          return (
            <div    onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${sezon.season_number}`)}} key={index} className="cartonActor" >
              <img className="actorImagine" src={`${urlActorPoza}${sezon.poster_path}`} />
              <h5 style={{color:'white'}}>{sezon.name}</h5>
            </div>
          )}
        else{
          return (
            <div    onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${sezon.season_number}`)}} key={index} className="cartonActor" >
              <img className="actorImagine" src={`${urlActorPoza}${detaliiSerial.poster_path}`} />
              <h5 style={{color:'white'}}>{sezon.name}</h5>
            </div>
          )
        }
        })
          ///tv/seasons/${id_serial}/season=${1}
       /* const setariSlider = {
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
          };*/
          const setariDistributie = {
        
            infinite: true,
            speed: 1000,
            slidesToShow: 6 ,
            slidesToScroll:6,
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

          const videoSerial = video.map((vid,index) =>{
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
          const setariDistributieSetariMin = {
        
            infinite: true,
            speed: 1000,
            slidesToShow:Math.min(distributie.length, 6),
            slidesToScroll:6,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1531,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll:5,
                }
              },
              {
                breakpoint: 1331,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll:4,
                }
              },
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
          const setariImages = {
            infinite: true,
            speed: 1000,
            cssEase: 'linear',
            slidesToShow:Math.min(imaginiLista.length, 6),
            slidesToScroll:Math.min(imaginiLista.length, 6),
            initialSlide: 0,
            responsive: [
                {
                  breakpoint: 1620,
                  settings: {
                    slidesToShow:Math.min(imaginiLista.length, 5),
                    slidesToScroll:Math.min(imaginiLista.length, 5),
                  }
                },
                {
                  breakpoint: 1376,
                  settings: {
                    slidesToShow:Math.min(imaginiLista.length, 4),
                    slidesToScroll:Math.min(imaginiLista.length,4),
                  
                  }
                },
                {
                  breakpoint: 1112,
                  settings: {
                    slidesToShow:Math.min(imaginiLista.length, 3),
                    slidesToScroll:Math.min(imaginiLista.length, 3),
                  }
                },
                {
                    breakpoint: 843,
                    settings: {
                      slidesToShow:Math.min(imaginiLista.length, 2),
            slidesToScroll:Math.min(imaginiLista.length, 2),
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
          const listaDistributie= distributie.map((actor,index)=>{
             
            if(actor.profile_path.slice(urlActorPoza.length)!=="null"){
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
          const listaSerialeSimilare=serialeSimilare.map((film,index)=>{
            if(film.poster_path.slice(36)!=='null'){
                return(
                  <CartonasSerial key={index} item={film}/>)
            }
        })
       let creatori=detaliiSerial.created_by;
       //console.log(creatori);
       let listaCreatori;
       if(creatori){
        listaCreatori=creatori.map((creator,index)=> {
            return(
                <span key={index}>{ (index ? ', ' : '') + creator.name}</span>
              
              
            )
        })
       }
       const setariCartonase = {
        infinite: true,
        speed: 1000,
        cssEase: 'linear',
        slidesToShow: 6,
        slidesToScroll:6,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1620,
              settings: {
                slidesToShow: 5,
                slidesToScroll:5,
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
                slidesToScroll:3
              }
            },
            {
                breakpoint: 843,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll:2,
                }
              }
          ]
        }; 

        const setariCartonaseSimilar = {
          infinite: true,
          speed: 1000,
          cssEase: 'linear',
          slidesToShow: 8,
          slidesToScroll:8,
          initialSlide: 0,
          responsive: [
              {
                breakpoint: 1630,
                settings: {
                  slidesToShow: 6,
                  slidesToScroll:6,
                }
              },
              {
                breakpoint: 1376,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll:5,
                
                }
              },
              {
                breakpoint: 1112,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll:4
                }
              },
              {
                  breakpoint: 843,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll:2,
                  }
                }
            ]
          }; 
    return (
      <div>
        <div className="PaginaDetalii" > 
        <div className="col-sm-12 top">
             <div className="st" style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}} >
                 {/*<img src={`${urlPoza}/${detaliiSerial.poster_path}`} alt={detaliiSerial.title} />
                 <p>
                     <FaStar style={{color:'yellow'}}/> {detaliiSerial.vote_average}
                      
                </p>
    */}
                <CartonasSerial  item={detaliiSerial}/>
             </div>
        <div className="col-sm-7" style={{marginLeft:'auto',marginRight:'auto'}}>
        <h2> {detaliiSerial.title? detaliiSerial.title : detaliiSerial.original_title}</h2>
        <h4 style={{color:'white'}}>{detaliiSerial?.name}</h4>
        <h6>{ListaGenuriSerial} | First air date : <span style={{color:'gray'}}>{detaliiSerial?.first_air_date}</span ></h6>
         
       <Slider {...setariVideoPlayer}>{videoSerial}</Slider>
     </div>    
        </div>
        <div className="col-sm-12"style={{marginLeft:'auto',marginRight:'auto',color:'white'}}>
      <p> {detaliiSerial.overview}</p>  
     </div>
     <div className="col-sm-12"style={{marginLeft:'auto',marginRight:'auto',color:'white'}}>
        <h3>Creators : </h3>{listaCreatori}
     </div>
     <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
     <Titlu titlu="Images" pagina={`/tv/images/${id_serial}`} arrow />
     {imaginiLista.length < 5 
     ? ( 
       <div style={{display:'flex',justifyContent:'space-evenly'}}>
       {imaginiLista}</div> ) : ( <Slider {...setariImages}> {imaginiLista}</Slider> )}
     
        </div>
     
     
        <div className="col-sm-12" style={{marginTop:'60px',marginLeft:'auto',marginRight:'auto'}}>
        <Titlu titlu={`Episodes`} pagina={`/tv/seasons/${id_serial}/season=1`} arrow />
       
       {episodAnterior &&
       <div className="episoadeSerial">
       <img 
       onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${episodAnterior?.season_number}/episode=${episodAnterior?.episode_number}`)}} 
       className="pozaNextEpisode hoverElement" src={`${urlPozaNext}${episodAnterior?.still_path}`} alt={episodAnterior?.name} />
       <div style={{marginLeft:'20px'}}>
         <h5 onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${episodAnterior?.season_number}/episode=${episodAnterior?.episode_number}`)}} 
       className="hoverElement">Last Episode</h5>
         <div> 
           <button className="btnFavEpisod" disabled={buttonDezactivat}   onClick={sendEpisode}><MdFavorite size={40} /></button>
         <h6 className="hoverElement"
          onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${episodAnterior?.season_number}/episode=${episodAnterior?.episode_number}`)}}
         >
           S{episodAnterior?.season_number}.E{episodAnterior?.episode_number} - {episodAnterior?.name}</h6>
         <p> {episodAnterior?.air_date}</p>
         </div>
       
         <p>{episodAnterior?.overview}</p>
       
       </div>
        
       </div>
       }
<div className="EpisodRecent">
{episodUrmator &&
       <div className="episoadeSerialAnterior">
          <button className="btnFavEpisodNext" disabled={buttonDezactivatUrmator}   onClick={sendEpisodeUrmator}><MdFavorite style={{background:'transparent'}}   size={40} /></button>
         
        <div className="episoadeSerialAnteriorInterior" style={{marginLeft:'20px'}}>
         <h5 onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${episodUrmator?.season_number}/episode=${episodUrmator?.episode_number}`)}} 
       className="allBackwhite hoverElement">Next Episode</h5>
         <div className="allBackwhite"> 
        <h6 onClick={()=>{history.push(`/tv/seasons/${id_serial}/season=${episodUrmator?.season_number}/episode=${episodUrmator?.episode_number}`)}} 
     className="allBackwhite hoverElement">S{episodUrmator?.season_number}.E{episodUrmator?.episode_number} - {episodUrmator?.name}</h6>
         <p className="allBackwhite"> {episodUrmator?.air_date}</p>
         </div>
       
         <p className="allBackwhite">{episodUrmator?.overview}</p>
       
       </div>
        
       </div>
       }
       
       </div>
       
       
      
        </div>


        <div className="col-sm-12" style={{marginTop:'60px',marginLeft:'auto',marginRight:'auto'}}>
        <Titlu titlu={`Seasons: ${detaliiSerial.number_of_seasons} | Episodes: ${detaliiSerial.number_of_episodes}`} pagina={`/tv/seasons/${id_serial}/season=${1}`} arrow />
        
        {listaSezoane.length < 8 ? ( 
             <div style={{display:'flex'}} > 
                   
             <div className="allElements"> 
             {listaSezoane}</div>
             </div>) : ( <Slider {...setariCartonase}>
              {listaSezoane}
          </Slider>)}
        </div>
      
        {listaDistributie.lenght===0 ? (null) : ( <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
       
       <Titlu titlu="Cast" pagina={`/tv/cast_crew/${id_serial}`} arrow />
        <Slider {...setariCartonase}>{listaDistributie}</Slider>
                  
          </div>) }
        
     <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
        <Titlu titlu="Similar Series"  />
               
     
                {serialeSimilare.length < 8 ? ( 
             <div style={{display:'flex'}} > 
                   
             <div className="allElements"> 
             {serialeSimilare.map((serial,index)=>(
                        <CartonasSerial key={index} item={serial} />
                    ))}</div>
             </div>) : (  <Slider {...setariCartonaseSimilar}>
                    {serialeSimilare.map((serial,index)=>(
                        <CartonasSerial key={index} item={serial} />
                    ))}
                </Slider>)}
        </div>
        
     <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
     <h2 style={{color:'white'}}>Reviews</h2>
     <TextComentariu  id_item={id_serial} media_type='tv'/>  </div>
     
        </div>
        <div style={{height:'100px'}} />
        <Footer />  
        
        </div>
    )
}

export default DetaliiSerial

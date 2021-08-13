import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import {aducdetaliiFilm,aducVideoFilm,distributieFilm, similarMovies,aduccrew, aducImaginiFilm} from '../../Requests';
import {BsPersonFill} from 'react-icons/bs';
import './DetaliiFilm.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CartonasActor from '../CartonasActor/CartonasActor';
import CartonasFilm from '../CartonasFilm/CartonasFilm';
import TextComentariu from '../Comentarii/TextComentariu/TextComentariu';
import Titlu from '../Titlu/Titlu';
import Footer from '../Footer/Footer';
function DetaliiFilm(props) {
    let id_film = props.match.params.id;
    let genuri=[];
    const[detaliiFilm,setdetaliiFilm]=useState([]);
    const[video,setVideo]=useState([]);
    const[distributie,setDistributie]=useState([]);
    const[filmeSimilare,setFilmeSimilare]=useState([]);
    const[imagini,setImagini]=useState([]);

    useEffect(()=>{
      async function aducDate() {
            setVideo(await aducVideoFilm(id_film));
            setdetaliiFilm(await aducdetaliiFilm(id_film));
            setDistributie(await distributieFilm(id_film));
            setFilmeSimilare(await similarMovies(id_film));
            setImagini(await aducImaginiFilm(id_film));
        };
        aducDate();
    },[id_film,])
    
   
    const urlPoza='https://image.tmdb.org/t/p/w200';
    const urlActorPoza ='https://image.tmdb.org/t/p/original';
    genuri=detaliiFilm.genres;
  
    let ListaGenuriFilm;
    if(genuri){
        ListaGenuriFilm= genuri.map((g, i) => {
            return (
              <li className="list-inline-item" key={i}>
                <p className="numeGen" onClick={e =>  window.location.href=`/genre/movie/${g.name}/${g.id}`}  style={{color:'gray',background:'transparent',margin:'auto'}}>
                  {g.name}
                </p>
                </li>
            );
          });
        }
        const filmdetaliii = video.map((vid,index) =>{
            //console.log(video);
            return(
                
              <div key={index} className="videoFilm"><iframe
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
          const imaginiLista= imagini.map((imagine,index)=>{
            return (
              <div key={index}>
                <img className="imaginiFilm" src={`${urlPoza}${imagine.file_path}`} />
              </div>
            )
          })

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
         
           
        

          const listaDistributie= distributie.map((actor,index)=>{
               //console.log(actor.profile_path.slice(urlActorPoza.length));
            if(actor.profile_path.slice(urlActorPoza.length)!=="null"){
                return(
                  <CartonasActor key={index} actor={actor} />
                )
            }
            else{
              return (
                <div 
                onClick={e =>  window.location.href=`/actor/${actor.id ? actor.id : actor.id_persoana}`} key={index} 
                className="cartonPers"><BsPersonFill style={{marginTop:''}} size={180}/>
                    <p style={{color:'white'}}>{actor.name}</p>
                    </div>
                  
              )
            }
          })

          const listaFilmeAsemanatoare=filmeSimilare.map((film,index)=>{
            if(film.poster_path.slice(urlPoza.length)!=='null'){
                return(
                  <CartonasFilm key={index} item={film}/>)
            }
        })
       // console.log(distributie)
       const setariCartonaseActor = {
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
       const setariCartonase = {
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
        const setariCartonase2 = {
          infinite: true,
          speed: 1000,
          cssEase: 'linear',
          slidesToShow: distributie?.length,
          slidesToScroll:distributie?.length,
          initialSlide: 0,
          responsive: [
            {
              breakpoint: 1630,
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
       return (
       <div>
        <div className="PaginaDetalii"> 
        
        <div className="col-sm-12 top">
             <div className="st" style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}} >
                {/*} <img className="PosterMovie" src={`${urlPoza}/${detaliiFilm.poster_path}`} alt={detaliiFilm.title} />
                 <p><FaStar style={{color:'yellow'}}/> {detaliiFilm.vote_average}</p>
      */}
       <CartonasFilm  item={detaliiFilm}/>
             </div>
        <div className="col-sm-8" style={{marginLeft:'auto',marginRight:'auto'}}>
        <h2> {detaliiFilm.title? detaliiFilm.title : detaliiFilm.original_title}</h2>
       <h6>{detaliiFilm.runtime}m | {ListaGenuriFilm} | {detaliiFilm?.release_date}</h6>
       <Slider {...setariVideoPlayer}>{filmdetaliii}</Slider>
     </div>
     </div>
     
     <div className="col-sm-12"style={{marginLeft:'auto',marginRight:'auto',color:'white'}}>
         {detaliiFilm.overview}
     </div>

     <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
     <Titlu titlu="Images" pagina={`/movie/images/${id_film}`} arrow />
     {imaginiLista.length < 5 
     ? ( 
       <div style={{display:'flex',justifyContent:'space-evenly'}}>
       {imaginiLista}</div> ) : ( <Slider {...setariImages}> {imaginiLista}</Slider> )}
     
     
        </div>
     <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
       <Titlu titlu="Cast" pagina={`/movie/cast_crew/${id_film}`} arrow />
        
      
      {/* <Slider {...setariCartonaseActor}> {listaDistributie} </Slider> */}
       
       {distributie.length < 8 ? ( 
            
                   
             
             <Slider {...setariCartonase2}>
                   {listaDistributie}
                </Slider> 
              ) : (  <Slider {...setariCartonase2}>
                   {listaDistributie}
                </Slider>)}
   
      
                
        </div>
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
        <Titlu titlu="Similar Movies"  />
               
     
                {filmeSimilare.length < 8 ? ( 
             <div style={{display:'flex'}} > 
                   
             <div className="allElements"> 
             {filmeSimilare.map((movie,index)=>(
                        <CartonasFilm key={index} item={movie} />
                    ))}</div>
             </div>) : (  <Slider {...setariCartonase}>
                    {filmeSimilare.map((movie,index)=>(
                        <CartonasFilm key={index} item={movie} />
                    ))}
                </Slider>)}
        </div>
        
       

        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
    
     <h2 style={{color:'white'}}>Reviews</h2>
      
     <TextComentariu  id_item={id_film} media_type='movie'/>  </div>
            
    
        </div>
        <div style={{height:'100px'}} />
       <Footer />   </div>
            
        
    )
}

export default DetaliiFilm

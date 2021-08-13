import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import CartonasFilm from '../CartonasFilm/CartonasFilm';
import CartonasSerial from '../CartonasSerial/CartonasSerial';
import Titlu from '../Titlu/Titlu';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CartonasFaraPoza from '../CartonasElementDinWatchlist/CartonasFaraPoza';
import CartonasDinWatchlist from '../CartonasElementDinWatchlist/CartonasDinWatchlist';
import CartonasWatchedRecomandariRandom from '../CartonasWatchedRecomandariRandom/CartonasWatchedRecomandariRandom';
import CartonasWatchedSerial from '../CartonasWatchedRecomandariRandom/CartonasWatchedSerial';
import { MovieContext } from '../../Context/MovieContext';
import './LinieW.css';
function LinieW({title,item_type,catre}) {
    const [user]=useAuthState(auth);
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    const { posts,isLoading,watched } = useContext(MovieContext);

  const listaFromWatchlist = posts.map((film,index)=>{
    if(film.data.poza.slice(urlPoza.length)!=="null")
    {
      if(film.data.media_type==="movie")
     { return(
      <CartonasFilm key={index} item={film.data} />
   )}
  else{
    return(
      <CartonasSerial key={index} item={film.data} />
   )
  }
  }
   else{
     return(
      <CartonasFaraPoza key={index} item={film} />
   )
   }
    
})

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

  const setariWatchlist = {
    infinite: true,
    speed: 1000,
    cssEase: 'linear',
    slidesToShow:Math.min(listaFromWatchlist.length, 8),
    slidesToScroll:Math.min(listaFromWatchlist.length, 8),
    initialSlide: 0,
    responsive: [
        {
          breakpoint: 1620,
          settings: {
            slidesToShow:Math.min(listaFromWatchlist.length, 5),
            slidesToScroll:Math.min(listaFromWatchlist.length, 5),
          }
        },
        {
          breakpoint: 1376,
          settings: {
            slidesToShow:Math.min(listaFromWatchlist.length, 4),
            slidesToScroll:Math.min(listaFromWatchlist.length,4),
          
          }
        },
        {
          breakpoint: 1112,
          settings: {
            slidesToShow:Math.min(listaFromWatchlist.length, 3),
            slidesToScroll:Math.min(listaFromWatchlist.length, 3),
          }
        },
        {
            breakpoint: 843,
            settings: {
              slidesToShow:Math.min(listaFromWatchlist.length, 2),
    slidesToScroll:Math.min(listaFromWatchlist.length, 2),
            }
          }
      ]
    };


    return (
      <div className="col-sm-12" style={{marginTop:'80px' ,marginBottom:'60px'}}>
                 
        
      {item_type === "watchlist" && (
        <div className="col-sm-12" >
          <Titlu titlu={title} pagina={catre} arrow/>
          
          
          {listaFromWatchlist.length === 0 ?
          (  
          <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>
              <h2 style={{color:'gray'}}> No movies or tv series in your list! Add some!</h2>
          </div>
          ) : (
            <>
              {listaFromWatchlist.length < 8 ? ( 
             <div style={{display:'flex'}} > 
                   
             <div className="allElements"> 
             {listaFromWatchlist}</div>
             </div>) : ( <Slider {...setariCartonase}>
              {listaFromWatchlist}
          </Slider>)}
             </>
         
          ) }
          
          </div>
      )}


      
  </div>
    )
}

export default LinieW

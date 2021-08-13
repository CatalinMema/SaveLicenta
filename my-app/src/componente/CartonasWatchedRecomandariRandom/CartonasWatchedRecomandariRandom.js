import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from '../../axios';
import Spinner from "react-spinkit";
import CartonasFilmDinWatched from './CartonasFilmDinWatched';
import CartonasFilm from '../CartonasFilm/CartonasFilm';
function CartonasWatchedRecomandariRandom({item}) {
    const [filmeRecomandari,setFilmeRecomandari]=useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    useEffect(()=>{
      async function fetchData(){
        const request = await axios.get(`/movie/${item.data.id}/recommendations?api_key=${cheie_API}`);
        setFilmeRecomandari(request.data.results);
        return request;
        
    }
    fetchData();
    },[item.data.id])
    const listaFilmeTopRated = filmeRecomandari.map((film,index)=>{
        return(    
            <CartonasFilm key={`${index}_${item.data.id}`} item={film}/>   
        )
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

        useEffect(() => {
          setIsLoading(true);
  
        }, [item.data.id]);
      useEffect(() => {
          const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
          }, 1600);
          return () => clearTimeout(loadingTimeout);
        }, [item.data.id]);
  
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

    return (
        <div >
            <h5 style={{color:'gray',marginTop:'10px',marginBottom:'10px',marginLeft:'30px'}}> Because you watched: {item.data.titlu}</h5>
           {listaFilmeTopRated.length<8? (
            <div style={{display:'flex'}} > 
                   
                   <div className="allElements"> 
                   {listaFilmeTopRated}</div>
                   </div>

           ) : (  <Slider {...setariCartonase}>{listaFilmeTopRated}</Slider> )}
         
        
       
        </div>
    )
}

export default CartonasWatchedRecomandariRandom

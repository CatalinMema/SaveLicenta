import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CartonasFilmDinWatched from './CartonasFilmDinWatched';
import CartonasSerial from '../CartonasSerial/CartonasSerial';
function CartonasWatchedSerial({item}) {
    const [serialeRecomandari,setserialeRecomandari]=useState([]);
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    useEffect(()=>{
      async function fetchData(){
        const request = await axios.get(`/tv/${item.data.id}/recommendations?api_key=${cheie_API}`);
        setserialeRecomandari(request.data.results);
        return request;
        
    }
    fetchData();
    },[item.data.id])
    const listaFilmeTopRated = serialeRecomandari.map((film,index)=>{
        return(   
            <CartonasSerial key={`${index}_${item.data.id}`} item={film}/>
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
    return (
        <div>
          <h5 style={{color:'gray',marginTop:'10px',marginBottom:'10px',marginLeft:'30px'}}> Because you watched: {item.data.titlu}</h5>
               <Slider {...setariCartonase}>{listaFilmeTopRated}</Slider> 
        </div>
    )
}

export default CartonasWatchedSerial

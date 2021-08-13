import React, { useEffect, useState } from 'react'
import { getSerialeThisWeek } from '../../Requests';
import CartonasPentruEpisod from '../CartonasPentruEpisod/CartonasPentruEpisod';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Titlu from '../Titlu/Titlu';
function LinieEpisoade() {
    const[serialeLastWeek,setSerialeLastWeek]= useState([])
    useEffect(()=>{
        async function aducSerialeLastWeek(){
            setSerialeLastWeek( await getSerialeThisWeek());
        }
        aducSerialeLastWeek();
    },[])
    const setariEpisoade = {
        infinite: true,
        speed: 1000,
        cssEase: 'linear',
        slidesToShow: 3,
        slidesToScroll:3,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1476,
              settings: {
                slidesToShow: 2,
                slidesToScroll:2,
              
              }
            },
             
            {
                breakpoint: 943,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll:1,
                }
              }
          ]
        }; 
    return (
        <div className="col-sm-12" >
            <Titlu titlu="Episodes to be aired this week" />
            
            <Slider {...setariEpisoade}>
            {serialeLastWeek.map((serial,index)=>{
                return(
                   <CartonasPentruEpisod key={index} item={serial} />
                )
            })}</Slider>
        </div>
    )
}

export default LinieEpisoade

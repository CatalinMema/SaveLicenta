import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaStar } from 'react-icons/fa';
function CartonasDinWatched({item}) {
    const [filmeRecomandari,setFilmeRecomandari] = useState([]);
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    const url_date=`/movie/${item.data.id}/recommendations?api_key=${cheie_API}`;
    useEffect(()=>{
      async function adudDate(){
        const cerere = await axios.get(url_date);
        setFilmeRecomandari(cerere.data.results);
        return cerere;
        
    }
    adudDate();
    
    }, [item.data.id,url_date]);

    const listaFromWatchlist = filmeRecomandari.map((film,index)=>{
        return(
            <div className="carton_watchlist">
              <div className="imgposter_watchlist">
                    <img 
                    onClick={e =>  window.location.href=`/movie/${item.data.id}`} 
                    src={film.poster_path} alt={film.title}/> 
              </div>
                               
            <div className="detalii_watchlist"> <div className="evaluare_watchlist">
                <FaStar size={23} style={{color:'yellow',marginRight:'2px'}}/>
                <span style={{color:'white'}}>
                  {film.vote_average}
                </span>
            </div>
            <h2>{film.title} </h2>
            </div>
        </div>
            
        )
    })
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
  

    
    return (
        <Slider {...setariCartonase}>{listaFromWatchlist}</Slider> 
      
    )
}

export default CartonasDinWatched

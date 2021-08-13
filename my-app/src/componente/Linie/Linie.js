import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CartonasFilm from '../CartonasFilm/CartonasFilm';
import CartonasSerial from '../CartonasSerial/CartonasSerial';
import { Link } from 'react-router-dom';
import './Linie.css';
import CartonasActor from '../CartonasActor/CartonasActor';
import Titlu from '../Titlu/Titlu';
import Spinner from "react-spinkit";
function Linie({title,url_datePreluare,item_type,catre}) {
    const[informatii,setinformatii]=useState([]);
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        async function aducDataDin(){
          setIsLoading(true);
            const request = await axios.get(url_datePreluare);
            setinformatii(request.data.results);
            return request;
        }
        aducDataDin();
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        return () => clearTimeout(loadingTimeout);
        
    },[]);
   
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
        const setariCartonaseActori = {
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
        const setariTrending = {
            infinite: true,
            speed: 1000,
            cssEase: 'linear',
            centerMode: true,
            centerPadding: 0,
            slidesToShow: 1,
            slidesToScroll:1,
            initialSlide: 0,
            
          };
          
          const listTrendingallWeek= informatii.map((item,index)=>{
            return(
              <div key={index} className="trendingPart"> 
                  <img className="poza_itemposterTrending"src={urlPoza+item.backdrop_path} alt={item.title} />
                  
                  <div className="titlu_Trending" > 
                  <h2 style={{color:'white'}}>
                  {item.title ? item.title : item.original_name ? item.original_name : item.original_title ? item.original_title : item.name} 
                  </h2>
                  </div>
                          <div className="NumeSiButoane" >
                          {item.media_type==="movie"? 
                          (
                            
                            <button 
                            onClick={e =>  window.location.href=`/movie/${item.id}`}
                            className="PlayButton">More details...</button>
                      
                          ):
                          (
                           
                          <button
                           onClick={e =>  window.location.href=`/tv/${item.id}`} className="PlayButton">More details...</button>
                            )  
                          }
                       </div>
                 
                  <img className="img_posterTrending" src={urlPoza+item.poster_path} alt={item.title} />
              </div>
             
            )
        })

      if(informatii){
    return (
        <div style={{marginTop:'80px'}}>
                 

            {item_type === "trending" && (
                <div className="col-sm-12" >
                <Titlu titlu={title} pagina={catre} arrow />
                {!isLoading ? ( <Slider {...setariTrending}>
                    {listTrendingallWeek}
                </Slider>) : (<div className="loadingCartonasFilm">
            <div className="continutLoadingCartonasFilm">
              <Spinner
              name="ball-spin-fade-loader"
              color="#F2AA4cFF"
              fadeIn="none" />
            </div>
          </div>) }
               
                </div>
            )}

            {item_type === "movie" && (
                 <div className="col-sm-12" >
                 <Titlu titlu={title}  pagina={catre} arrow/>
                <Slider {...setariCartonase}>
                    {informatii.map((movie,index)=>(
                        <CartonasFilm key={index} item={movie} />
                    ))}
                </Slider>
                  </div>
            )}
            {item_type === "topMovies" && (
                 <div className="col-sm-12" >
                 <Titlu titlu={title} />
                <Slider {...setariCartonase}>
                    {informatii.map((movie,index)=>(
                        <CartonasFilm key={index} item={movie} />
                    ))}
                </Slider>
                </div>
            )}

            {item_type === "tv" && (
                <div className="col-sm-12" >
                 <Titlu titlu={title} pagina={catre} arrow/>
                <Slider {...setariCartonase}>
                    {informatii.map((movie,index)=>(
                        <CartonasSerial key={index} item={movie} />
                    ))}
                </Slider>
                </div>
            )}
            
            {item_type === "actor" && (
                <div className="col-sm-12" >
                 <Titlu titlu={title} pagina={catre} arrow/>
                <Slider {...setariCartonaseActori}>
                    {informatii.map((movie,index)=>{
                      if(movie.profile_path){
                      return(
                        <CartonasActor key={index} actor={movie} />
                      )}
                   
                     }
                     
                     )}
                </Slider>
                </div>
            )}
        </div>
    )} else{
      return (
        <div className="loadingCartonasFilm">
            <div className="continutLoadingCartonasFilm">
              <Spinner
              name="ball-spin-fade-loader"
              color="red"
              fadeIn="none" />
            </div>
          </div>
      )
    }
}

export default Linie

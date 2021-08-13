import React, { useEffect, useState } from 'react'
import { TrendingThisWeek,datefilmePopulare, datePopularSeries, dateFilmeTopRated,dateActoriPopulari } from '../../Requests';
import './design.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import CartonasFilm from '../CartonasFilm/CartonasFilm';
import CartonasSerial from '../CartonasSerial/CartonasSerial';
import CartonasActor from '../CartonasActor/CartonasActor';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import CartonasDinWatchlist from '../CartonasElementDinWatchlist/CartonasDinWatchlist';
import { MdKeyboardArrowRight } from 'react-icons/md';
import CartonasFaraPoza from '../CartonasElementDinWatchlist/CartonasFaraPoza';
import CartonasWatchedRecomandariRandom from '../CartonasWatchedRecomandariRandom/CartonasWatchedRecomandariRandom';
import CartonasWatchedSerial from '../CartonasWatchedRecomandariRandom/CartonasWatchedSerial';
function PaginaDeStart() {
  const [user]=useAuthState(auth);
    const[ filmeTrendingThisWeek,setFilmeTrendingThisWeek]= useState([]);
    const[ filmePopulare,setFilmePopulare]= useState([]);
    const [serialePopulare1,setSerialePopulare1]=useState([]);
    const [serialePopulare2,setSerialePopulare2]=useState([]);
    const [topRatedMovies,setTopRatedMovies] = useState([]);
    const [actoriPopulari1,setActoriPopulari1]=useState([]);
    //const [actoriPopulari2,setActoriPopulari2]=useState([]);

    const [watchlistMovies,setWatchlistMovies] = useState([]); 

    const [watchedMovies,setWatchedMovies] = useState([]); 

  
    useEffect(()=>{
          async function aducInfo() {
            setFilmeTrendingThisWeek(await TrendingThisWeek());
            setFilmePopulare(await datefilmePopulare());
            setSerialePopulare1(await datePopularSeries(1));
            setSerialePopulare2(await datePopularSeries(2));

            setTopRatedMovies(await dateFilmeTopRated(1));

            setActoriPopulari1(await dateActoriPopulari(1));
           

            db.collection(`lista${user.email}`).orderBy("timestamp","asc").onSnapshot(snapshot =>(
              setWatchlistMovies(snapshot.docs.map(doc=>(
                  {
                    id_doc:doc.id,
                      data:doc.data(),
                      
                  }
              )))))

              db.collection(`urmarite${user.email}`).orderBy("timestamp","asc").onSnapshot(snapshot =>(
                setWatchedMovies(snapshot.docs.map(doc=>(
                    {
                       
                        data:doc.data(),
                        
                    }
                )))))
                
        }
        aducInfo();
    }, [user.email]);
    
 

    const setariTrending = {
      infinite: true,
      speed: 1000,
      cssEase: 'linear',
      centerMode: true,
      centerPadding: 0,
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
            slidesToScroll:1
          }
        }
      ]
    };
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


      const setariWatchlist = {
        infinite: true,
        speed: 1000,
        cssEase: 'linear',
        slidesToShow: 6,
        slidesToScroll:1,
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

      const listTrendingallWeek= filmeTrendingThisWeek.map((item,index)=>{
        return(
          <div key={index} className="FirstSection"> 
              <img className="imgbjPoza"src={item.backdrop_path} alt={item.title} />
              
              <div className="titlu" > 
              <span style={{color:'white'}}>
              {item.title ? item.title : item.original_name ? item.original_name : item.original_title ? item.original_title : item.name} 
              </span>
              <div> 
                      {item.media_type==="movie"? 
                      (
                        <Link to={`/movie/${item.id}`}> 
                        <button className="PlayButton">More details...</button>
                        </Link>
                      ):
                      (
                        <Link to={`/tv/${item.id}`}>
                      <button className="PlayButton">More details...</button>
                        </Link>)  
                      }
                    </div>
              </div>
              <img className="imgPoster2" src={item.poster_path} alt={item.title} />
          </div>
         
        )
    })
    const urlPoza = 'https://image.tmdb.org/t/p/original';
    const listaFromWatchlist = watchlistMovies.map((film,index)=>{
      if(film.data.poza.slice(urlPoza.length)!=="null")
      {return(
        <CartonasDinWatchlist key={index} item={film} />
     )}
     else{
       return(
        <CartonasFaraPoza key={index} item={film} />
     )
     }
      
  })
 

    const listaFilmePopulare = filmePopulare.map((film,index)=>{
      return(
          <CartonasFilm key={index} item={film}/>
      )
  })
    //const listaSeriale=serialePopulare1.concat(serialePopulare2);
    const listaSerialePopulare=serialePopulare1.map((serial,index)=>{
      return(
         <CartonasSerial key={index} item={serial}/>   
     )
 })
 const watcheLista= watchedMovies.splice(Math.floor(Math.random() * watchedMovies.length),1).map((film,index) =>{
  if(film.data.media_type==="movie"){ return (
    <CartonasWatchedRecomandariRandom key={index} item={film}/>   
   )} 
   else{
     return (
      <CartonasWatchedSerial key={index} item={film} />
     )
   }
 
 })
 const listaFilmeTopRated = topRatedMovies.map((film,index)=>{
  return(   
    <CartonasFilm key={index} item={film}/>
  )
})

 
const listaactoriPopulari=actoriPopulari1.map((actor,index)=>{
    return(
           <CartonasActor key={index} actor={actor} />
    )
})


    return (
     
      <div className="forh2">
       <Link className="link" to={`/trendingThisWeek/page_number_${1}`}>
        <div className="watchlistFrom" style={{marginTop:'80px'}} >
        <h2 className="textWatch"><span style={{ color:"#F2AA4cFF"}}> | </span> Trending this week</h2>
        
        <MdKeyboardArrowRight 
        className="ArrowWatchlist" 
        size={45}
        /> 
        
        </div></Link>
        <div className="col-sm-8"style={{marginLeft:'auto',marginRight:'auto',marginTop:'50px'}} >
          <Slider {...setariTrending}>{listTrendingallWeek}</Slider> 
          </div>
          <Link className="link" to={`/movies/page_number_${1}`}>
        <div className="watchlistFrom"  >
        <h2 className="textWatch"><span style={{ color:"#F2AA4cFF"}}> | </span> Popular Movies </h2>
        
        <MdKeyboardArrowRight 
        className="ArrowWatchlist" 
        size={45}
        /> 
        
        </div></Link>
          
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
       
          <Slider {...setariCartonase}>{listaFilmePopulare}</Slider> 
        </div>
        
        <Link className="link" to={`/series/page_number_${1}`}>
        <div className="watchlistFrom"  >
        <h2 className="textWatch"><span style={{ color:"#F2AA4cFF"}}> | </span> Popular Series </h2>
        
        <MdKeyboardArrowRight 
        className="ArrowWatchlist" 
        size={45}
        /> 
        
        </div></Link>
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
       
          <Slider {...setariCartonase}>{listaSerialePopulare}</Slider> 
        </div>
        <h2 style={{color:'white'}}><span style={{ color:"#F2AA4cFF"}}>|</span> Top Picks</h2>
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
       
          <Slider {...setariCartonase}>{listaFilmeTopRated}</Slider> 
        </div>
        <Link className="link" to="/watchlist">
        <div className="watchlistFrom"  >
        <h2 className="textWatch"><span style={{ color:"#F2AA4cFF"}}> | </span> From your Watchlist </h2>
        
        <MdKeyboardArrowRight 
        className="ArrowWatchlist" 
        size={45}
        /> 
        
        </div></Link>
        {listaFromWatchlist.length === 0 ? (
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>
       <h2 style={{color:'gray'}}> No movies or tv series in your list! Add some!</h2>
         </div>) : (
           <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
        
           Aici am sters
             
           </div>
         )}


<div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
       
     {watcheLista}
     </div>


     <Link className="link" to={`/actors/page_number_${1}`}>
        <div className="watchlistFrom"  >
        <h2 className="textWatch"><span style={{ color:"#F2AA4cFF"}}> | </span> Actors </h2>
        
        <MdKeyboardArrowRight 
        className="ArrowWatchlist" 
        size={45}
        /> 
        
        </div></Link>
        <div className="col-sm-12" style={{marginTop:'40px',marginLeft:'auto',marginRight:'auto'}}>
       
          <Slider {...setariCartonase}>{listaactoriPopulari}</Slider> 
        </div>

     </div>
      
    )
}

export default PaginaDeStart

import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './CartonasDinWatchlist.css';
import Spinner from "react-spinkit";
function CartonasDinWatchlist({item}) {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);

      }, [item]);
    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 1600);
        return () => clearTimeout(loadingTimeout);
      }, [item]);

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
        <div className="carton_watchlist">
            <div className="imgposter_watchlist">
                {item.data.media_type === "movie" ? (
                    <img 
                        onClick={e =>  window.location.href=`/movie/${item.data.id}`} 
                        src={item.data.poza} alt={item.data.titlu}></img>  
                    ) : (
                    <img 
                        onClick={e =>  window.location.href=`/tv/${item.data.id}`} 
                        src={item.data.poza} alt={item.data.titlu}></img>  
                    )}  
            </div>
                           
        <div className="detalii_watchlist"> <div className="evaluare_watchlist">
            <FaStar size={23} style={{color:'yellow',marginRight:'2px',background:'transparent'}}/><span style={{color:'white',background:'transparent'}}>{item.data.vote_average}</span>
        </div>
        <h2>{item.data.titlu} </h2>
        </div>
    </div>
    )
}

export default CartonasDinWatchlist

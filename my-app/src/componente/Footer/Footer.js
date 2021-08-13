import React from 'react'
import { useHistory } from 'react-router';

import Logo from '../../imagini/logoTmdb.png'
import './Footer.css';
function Footer() {
    const history=useHistory();
    return (
        <div className="footer">
            <div>
               <div className="fast1">
                <a   onClick={()=>{history.push(`/movies`)}}> 
                           
                    Movies 
                </a>
                <a onClick={()=>{history.push(`/series`)}}> 
                          
                   Series
                </a>
                <a onClick={e =>  window.location.href=`/trendingThisWeek`} >
                    Trending
                </a>
                <a onClick={e =>  window.location.href=`/watchlist`}>
                    Watchlist
                </a>
                </div>
                <div className="fast2">
                <a onClick={e =>  
                    window.location.href=`/watched`}>
                   Watched
                </a>
                <a  onClick={e =>  window.location.href=`/actors`}>
                   Actors
                </a>
                <a  onClick={e =>  window.location.href=`/Favorites_Episodes`}>
                   Episodes
                </a>
                </div>
            </div>
            <div className="tmdb">
                <p>Data and images taken from</p>
         <img src={Logo} /></div>
            
         </div>
      
        
    )
}

export default Footer

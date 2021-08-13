import React, { useEffect, useState } from 'react'
import requests from '../../Requests'
import Footer from '../Footer/Footer';
import Linie from '../Linie/Linie'
import LinieW from '../LinieW/LinieW'
import './PaginaPrincipala.css';
import LinieEpisoade from '../LinieEpisoade/LinieEpisoade';
import LinieRecomandari from '../LinieRecomandari/LinieRecomandari';
function PaginaPrincipala() {
    return (
        <div style={{marginTop:'90px'}}>
            <div className="col-sm-7" style={{marginRight:'auto',marginLeft:'auto'}}>
            <Linie title='Trending this week'
                    url_datePreluare={requests.fetchTrending} 
                    item_type="trending"
                    catre={`/trendingThisWeek`} />
            </div>
            <Linie title='Popular Movies'
                url_datePreluare={requests.popularMovieUrl} 
                item_type="movie"
                catre={`/movies`} />
            <Linie title='Popular Series'
                url_datePreluare={requests.popularTvSeriesurl} 
                item_type="tv"
                catre={`/series`}/>
            <Linie title='Top Picks'
                url_datePreluare={requests.topRatedMovies} 
                item_type="topMovies"/>
            <LinieW title="From your watchlist"
                item_type="watchlist"
                catre="/watchlist"/>
            <LinieEpisoade />
            <LinieRecomandari />
            <Linie title='Popular Actors'
                url_datePreluare={requests.actors} 
                item_type="actor"
                catre={`/actors_list`}/>
                <div style={{marginTop:'50px'}} />
          <Footer />
        </div>
        
    )
}

export default PaginaPrincipala

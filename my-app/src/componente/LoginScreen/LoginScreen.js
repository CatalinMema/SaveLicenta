import React, { useEffect, useState } from 'react'
import { SiBbciplayer } from 'react-icons/si';
import { auth, provider } from '../../firebase';
import axios from '../../axios';
import './login.css';
import Functii from './midSection';
function LoginScreen() {
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    const [movie,setMovie]=useState([]);
    const url_date=`/trending/all/day?api_key=${cheie_API}`;
    useEffect(() => {
        async function fetchData(){
          const request = await axios.get(url_date);
          setMovie(request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ]);
          return request;
          
      }
      fetchData();
      
      }, []);
      
      const urlPoza = 'https://image.tmdb.org/t/p/original';
    const signIn = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error)=>alert(error.message));

    }

  /*
    return (

        <div>
             <div className="loginScreen"
            style={{height:'70vh'}}
     
        >
            
            {movie.backdrop_path ? ( <img className="pozz" src={urlPoza+movie.backdrop_path} alt='nume'/>) : (
                null
            )}
           
            <div className="login_background">
            <SiBbciplayer style={{
                color:"#F2AA4cFF",background:'transparent'}} size={50} className="loginScreen_imageLogo" />
            <button className="login_button" onClick={signIn}>
                Sign In
            </button>
           
            </div>
            
        </div>
        <Functii />
        <div style={{height:'200px'}}/>
        </div>
       
    )*/
   
    return (
        <div className="col-sm-13" >
        <header
        className="banner"
        style={{
            backgroundSize:"cover",
            backgroundImage:`url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition:"center center",
        }}
        >
        <div className="continutBanner">
        <div className="login_background">
            <SiBbciplayer style={{
                color:"#F2AA4cFF",background:'transparent'}} size={50} className="loginScreen_imageLogo" />
            <button className="login_button" onClick={signIn}>
                Sign In
            </button>
            </div>
            <h1 className="titluBanner">{movie?.title || movie?.name || movie?.original_title || movie?.original_name}</h1>
            <h1 className="descriereBanner"> {movie?.overview}</h1>
        </div>
            <div className="fadeBanner"/>
        </header>

        <Functii />
        <div style={{height:'200px'}}/>
        </div>
    )
}
export default LoginScreen

import React, { useContext, useEffect, useState } from 'react'
import './BaraLateral.css';
import {
    MdRecentActors,
    MdHome,
    MdPlaylistPlay,MdPlaylistAddCheck, MdTv, MdLocalMovies, MdLiveTv
 } from 'react-icons/md';
 import {BiExit} from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {  Dropdown } from 'react-bootstrap';
import { aducGenuri, aducGenuriSeriale } from '../../Requests';
import { MovieContext } from '../../Context/MovieContext';
const BaraLateral = ({bara, realizareComutareBara}) => {
    const [user] = useAuthState(auth);
    const [genFilm,setGenFilm]=useState([]);
    const [genSerial,setGenSerial]=useState([]);
    useEffect(()=>{
        const aducInfo = async () =>{
            setGenFilm(await aducGenuri());
            setGenSerial(await aducGenuriSeriale());
        }
        aducInfo();
    }, [user.email]);
    const history=useHistory();
    const { setCurrentPage,setvaloarePagina,idGen, setidGenFilm,currentPage,setidGenSerial} = useContext(MovieContext);
    
    const ListaGenuri = genFilm.map((gen,index)=>{
        if(gen.id!==99){
        return(
            <Dropdown.Item 
            onClick={()=>{history.push(`/genre/movie/${gen.nume}/${gen.id}`);
            setCurrentPage(1);
            setvaloarePagina("");
            setidGenFilm(gen.id);
            realizareComutareBara(false);
        }} key={index} >{gen.nume}</Dropdown.Item>
            
           
        )};
    });  

    const ListaGenuriSerial = genSerial.map((gen,index)=>{
  
        return(
            <Dropdown.Item onClick={()=>{history.push(`/genre/tv/${gen.nume}/${gen.id}`);
            setidGenSerial(gen.id)
            setCurrentPage(1);
            setvaloarePagina("");
            realizareComutareBara(false);
        
        }}key={index}>{gen.nume}</Dropdown.Item>
              
           
        );
    });  
   
    return (
      <div>
            <nav className={bara ?"lateral deschis":"lateral"}
                >
                
             <li   onClick={()=>{history.push(`/`);
            realizareComutareBara(false);}}>
           
                <MdHome size={23} />
               <span>Home</span> 
           
                </li>
          
                <li className="dropMoviesLateral">
                <MdLocalMovies size={23} />
                    <Dropdown >
                        <span  className="btn_allMoviesLateral" 
                        onClick={()=>{history.push(`/movies`);
                        setCurrentPage(1);
                        setvaloarePagina("");
                        realizareComutareBara(false);
                    }}
                         
                            >Movies</span>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        {ListaGenuri}
                        </Dropdown.Menu>
                    </Dropdown>
                 </li>
                 <li className="dropMoviesLateral">
                 <MdLiveTv size={23} />
                    <Dropdown >
                        <span  className="btn_allMoviesLateral" 
                         onClick={()=>{history.push(`/series`);
                        setCurrentPage(1);
                        setvaloarePagina("");
                        realizareComutareBara(false);}}>Series</span>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        {ListaGenuriSerial}
                        </Dropdown.Menu>
                    </Dropdown>
                 </li>
                
                <li 
                onClick={()=>{history.push(`/actors`);
                realizareComutareBara(false);
            }}
                 >
               
                <MdRecentActors size={23} />
                <span>Actors</span>
                
                </li>

                <li 
                onClick={()=>{history.push(`/watchlist`);
                realizareComutareBara(false);}}>
                    <MdPlaylistPlay size={23} />
                    <span>Watchlist</span> 
               
                </li>

                <li  
                 onClick={()=>{history.push(`/watched`);
                 realizareComutareBara(false);}}>
            <MdPlaylistAddCheck size={23} />
            <span>Watched</span>
                </li>
                <li  onClick={()=>{history.push(`/Favorites_Episodes`);
            realizareComutareBara(false);}}>  
               
            <MdTv size={23} />
            <span>Episodes</span>
                </li>



                <hr/>
 
                <li  >
                    <BiExit size={23} />
                    <span onClick={(e)=> 
                {
                    
                    auth.signOut();
                window.location.href=`/`;}
                } >Log Out</span>
                </li>
               
                <hr />
         
        </nav>
        </div>
    )
}

export default BaraLateral

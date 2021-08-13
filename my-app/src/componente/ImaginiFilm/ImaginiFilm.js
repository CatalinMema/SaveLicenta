import React, { useEffect, useState } from 'react'
import { aducdetaliiFilm, aducImaginiFilm } from '../../Requests';
import Footer from '../Footer/Footer';
import Titlu from '../Titlu/Titlu';
import './ImaginiFilm.css';
function ImaginiFilm(props) {
    let id_film= props.match.params.id;
    const[imagini,setImagini]=useState([])
    const[detaliiFilm,setdetaliiFilm]=useState([]);
    useEffect(()=>{
        async function aducDate() {
              setImagini(await aducImaginiFilm(id_film));
              setdetaliiFilm(await aducdetaliiFilm(id_film));
          };
          aducDate();
      },[id_film])
      const urlPoza='https://image.tmdb.org/t/p/w300';
    
    return (
        <div>
        <div className="col-sm-12 toataPaginaImaginiFilm" >
        <div style={{display:'inline',marginLeft:'20px',marginTop:'50px',color:'white'}}>
        <Titlu titlu={detaliiFilm.title || detaliiFilm.original_title} pagina={`/movie/${id_film}`} arrow />
        <h3>Images</h3>
        </div>
             <div className="toateImaginileFilm">
          {
          imagini &&
          imagini.map((movie, index) => {
            
            return ( 
                <div key={index}>
                <img className="imaginiFilm" src={`${urlPoza}${movie.file_path}`} />
                </div>
                )
            
           })
       }

          </div>
          <div  style={{marginTop:'100px'}}/>
         
        </div>
        <div style={{marginTop:'100px'}} />
<Footer /> </div>
    )
}

export default ImaginiFilm

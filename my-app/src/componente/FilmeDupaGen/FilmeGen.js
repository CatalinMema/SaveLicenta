import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CartonasFilm from '../CartonasFilm/CartonasFilm';
import './FilmeGen.css';
import axios from '../../axios';
import Footer from '../Footer/Footer';
import { MovieContext } from '../../Context/MovieContext';
function FilmeGen(props) {
  let nume=props.match.params.nume;
  const { filmeDupaGen,newPage,
    valoareText,
    setarePagina,
    valoarePagina,currentPage } = useContext(MovieContext);
if( !filmeDupaGen){
  return (
    <div className="loadingApp">
      <div className="continutLoadingApp">
        
      </div>
    </div>
  );
}
    return (
      <div>
      <div className="col-sm-12 paginaFIlme" >
            <h1 style={{color:'white'}}>{nume}</h1>
           
            <div className="baraPentruPagina">
       <input type="text" placeholder="Write page number"
                    value={valoarePagina}
                    onChange={valoareText}
                    maxLength="4"
                   />
                    <button className="btn_next2" onClick={setarePagina}>Go to page {valoarePagina}</button>
                   
                    </div>
                    
        <div className="movie_gen">
            
           {
          filmeDupaGen &&
          filmeDupaGen.map((movie, index) => {
            if(movie.poster_path){
            return ( <CartonasFilm item={movie} key={index}/>)
            }
           })
       }
       
        </div>
        {filmeDupaGen.length===0 ? (<div style={{marginTop:'70px',textAlign:'center'}}>
                  <h4 style={{color:'white'}}>No results . Please type a valid page number</h4>  
    </div>): 
        (<>
         <div style={{height:'200px',marginTop:'50px',textAlign:'center'}}>
       
       <button className="btn_next"
              style={{
                cursor: currentPage >=2 ? "pointer" : "not-allowed",
                background: currentPage >=2 ? "#182336" : "#000000",
              }}
              onClick={() => newPage("previous")}
            > 
              Prev Page
            </button>
            <button className="btn_next" onClick={() => newPage("next")}>Next Page</button>
            <div>
            <h6 style={{color:'gray',float:'right'}}>Page number {currentPage}</h6>
            </div>
       </div>
        
         </>)}
       
        </div>
         <div style={{marginTop:'100px'}} />
         <Footer />   </div>
    )
}

export default FilmeGen

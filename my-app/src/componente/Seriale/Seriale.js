import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CartonasSerial from '../CartonasSerial/CartonasSerial';
import axios from '../../axios';
import './serial.css';
import Footer from '../Footer/Footer';
import { MovieContext } from '../../Context/MovieContext';
function Seriale() {
  const { seriale,newPage,
    valoareText,
    setarePagina,
    valoarePagina,currentPage } = useContext(MovieContext);
    
    
    return (
      <div>
      <div className="col-sm-12 paginaFIlme" >

<div className="baraPentruPagina">
       <input type="text" placeholder="Write page number"
                    value={valoarePagina}
                    onChange={valoareText}
                    maxLength="4"
                   />
                    <button className="btn_next2" onClick={setarePagina}>Go to page {valoarePagina}</button></div>
    
          <div className="allSeries">
           {
          seriale &&
          seriale.map((movie, index) => {
            if(movie.poster_path){
            return ( <CartonasSerial item={movie} key={index}/>)
            }
           })
       }
    </div>
    {seriale.length===0 ? ( <div style={{marginTop:'70px',textAlign:'center'}}>
      <h4 style={{color:'white'}}>No results . Please type a valid page number</h4> </div>
       ): 
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
        <div style={{marginTop:'100px'}}>
            <h6 style={{color:'gray',float:'right'}}>Page number {currentPage}</h6>
            </div>
       </div>
    
         </>)}
        </div><div style={{marginTop:'100px'}} />
         <Footer />   </div>
    )
}

export default Seriale

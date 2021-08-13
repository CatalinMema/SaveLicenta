import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { MovieContext } from '../../Context/MovieContext';
import { TrendingThisWeekFull } from '../../Requests';
import CartonasFilm from '../CartonasFilm/CartonasFilm';
import CartonasSerial from '../CartonasSerial/CartonasSerial';
import Footer from '../Footer/Footer';
import './TrendingAllWeek.css'
function TrendingAllWeek(props) {
     
     // const [currentPage, setCurrentPage] = useState(nr_pag);
     const { trendingAllWeek,newPage,
      valoareText,
      setarePagina,
      valoarePagina,currentPage } = useContext(MovieContext);
 // console.log(trendingAllWeek);
         
      
      return (
        <div>
        <div className="col-sm-12 paginaFIlme" > 

        {trendingAllWeek.length === 0 ? (<div style={{marginTop:'70px'}}> 
      
      <div className="baraPentruPagina">
       <input type="text" placeholder="Write page number"
                    value={valoarePagina}
                    onChange={valoareText}
                    maxLength="4"
                   />
                    <button className="btn_next2" onClick={setarePagina}>Go to page {valoarePagina}</button>
                    
                    </div>
                    <div style={{marginTop:'70px',textAlign:'center'}}>
                <h4 style={{color:'white'}}>No results . Please type a valid page number</h4>  
  </div>   </div>) : (
 <div style={{marginTop:'70px'}}> 
 <div className="baraPentruPagina">
       <input type="text" placeholder="Write page number"
                    value={valoarePagina}
                    onChange={valoareText}
                    maxLength="4"
                   />
                    <button className="btn_next2" onClick={setarePagina}>Go to page {valoarePagina}</button></div>
    
            <div className="alltrendingAllWeek">
            {
            trendingAllWeek &&
            trendingAllWeek.map((movie, index) => {
                if(movie.media_type==="movie"){
                    return (<CartonasFilm key={index} item={movie} />)
                    
                }
                else  if(movie.media_type==="tv"){
                    return (<CartonasSerial key={index} item={movie} />)
                }
                
              
            })
         }
  
            </div>
             
         <div style={{height:'200px',marginTop:'50px',textAlign:'center'}}>
         
         <button className="btn_next"
                style={{
                  cursor: currentPage >= 2 ? "pointer" : "not-allowed",
                  background: currentPage >= 2 ? "#182336" : "#000000",
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
     
 </div>


  )}
     
          </div>
          <div style={{marginTop:'100px'}} />
          <Footer />   </div>
      )
  }
export default TrendingAllWeek

import React, { useContext } from 'react'
import CartonasActor from '../CartonasActor/CartonasActor';
import './actori.css';
import { MovieContext } from '../../Context/MovieContext';
import Footer from '../Footer/Footer';
function Actori() {
    
    const { newPage,
      valoareText,
      setarePagina,
      valoarePagina,currentPage,ActoriListaFull,  } = useContext(MovieContext);
     
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
    
          <div className="allActors">
            {
            ActoriListaFull &&
            ActoriListaFull.map((actor, index) =>  {
            if(actor.profile_path){
              return ( <CartonasActor actor={actor} key={index}/>)
            }
            })
            }
          </div>
         {ActoriListaFull.length===0 ? ( <div style={{marginTop:'70px',textAlign:'center'}}>
                  <h4 style={{color:'white'}}>No results . Please type a valid page number</h4>  
    </div>) : (<div style={{height:'200px',marginTop:'50px',textAlign:'center'}}>
     
     <button className="btn_next"
     style={{
       cursor: currentPage >= 2 ? "pointer" : "not-allowed",
       background: currentPage >= 2 ? "#182336" : "#000000",
     }}
     onClick={() => newPage("previous")}
     > 
     Previous Page
     </button>
     <button className="btn_next" onClick={() => newPage("next")}>Next Page</button>
     <div>
     <h6 style={{color:'gray',float:'right'}}>Page number {currentPage}</h6>
     </div>
   </div>)}
          

      </div> 
      <div style={{marginTop:'100px'}} />
      <Footer />  </div>
    )
}

export default Actori

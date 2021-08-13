import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { aducdetaliiSerial, aducImaginiSerial } from '../../Requests';
import Footer from '../Footer/Footer';
import Titlu from '../Titlu/Titlu';
import './ImaginiSerial.css';
function ImaginiSerial(props) {
    let id_Serial= props.match.params.id;
    const[imagini,setImagini]=useState([])
    const [detaliiSerial,setDetaliiSerial] = useState([]);
    useEffect(()=>{
        async function aducDate() {
              setImagini(await aducImaginiSerial(id_Serial));
              setDetaliiSerial(await aducdetaliiSerial(id_Serial));
          };
          aducDate();
      },[id_Serial])

      const history=useHistory();
      const urlPoza='https://image.tmdb.org/t/p/w400';
      const urlPozaPoster='https://image.tmdb.org/t/p/w400';
      
    return (
        <div className="col-sm-12 toataPaginaImagini" style={{marginTop:'70px'}}>
             <div  className="SerialPoster">
        
            <img className="hoverElement" onClick={()=>{history.push(`/tv/${id_Serial}`)}} src={`${urlPozaPoster}${detaliiSerial?.poster_path}`}/>
         
       
        <div style={{display:'inline',marginLeft:'20px',marginTop:'50px',color:'white'}}>
        <Titlu titlu={detaliiSerial.name} pagina={`/tv/${id_Serial}`} arrow />
        <h3>Images</h3>
        </div></div>
             <div className="toateImaginileSerial">
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
          <Footer />
        </div>
    )
}

export default ImaginiSerial

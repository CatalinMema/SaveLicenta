import React, { useEffect, useState } from 'react'
import { adicEpisoade, aducdetaliiSerial, imaginiEpisodSerial, numar_Sezoane } from '../../Requests';
import {  Dropdown } from 'react-bootstrap';
import './ImaginiEpisodeSerial.css';
import Titlu from '../Titlu/Titlu';
import Footer from '../Footer/Footer';
function ImaginiEpisodeSerial(props) {
    const urlPoza='https://image.tmdb.org/t/p/w400';
    let id_serial = props.match.params.id;
    let sezonCurent = props.match.params.nr_season;
    let episodecurent=props.match.params.episode;
    const [imaginiEpisod,setImaginiEpisode] = useState([]);
    const [nr_sezoane,setnr_sezoane] = useState([]);
    const [nrEpisoade,setnrEpisoade]= useState([]);
    const [detaliiSerial,setDetaliiSerial] = useState([]);
    useEffect(()=>{
        async function aducDate() {
             setImaginiEpisode(await imaginiEpisodSerial(id_serial,sezonCurent,episodecurent));
             setnr_sezoane(await numar_Sezoane(id_serial));
             setnrEpisoade(await adicEpisoade(id_serial,sezonCurent));
             setDetaliiSerial(await aducdetaliiSerial(id_serial));
            };
          aducDate();
      },[id_serial,episodecurent,sezonCurent])
 
      const imaginiLista= imaginiEpisod?.map((imagine,index)=>{
          if(imagine.file_path){
        return (
          <div key={index}>
            <img className="imaginiFilm" src={`${urlPoza}${imagine.file_path}`} 
            />
          </div>
        )}
      })
      const listaSezoane = nr_sezoane.map((nr,index)=>{
        if(index!==0){
        return(
          <Dropdown.Item onClick={e =>  window.location.href=`/tv/images/${id_serial}/season=${nr.season_number}/episode=${1}`} key={index}  key={index} >{nr.season_number}</Dropdown.Item>
           
        )}
    })
    const listaEpisoade = nrEpisoade.map((nr,index)=>{
        
        return(
          <Dropdown.Item onClick={e =>  window.location.href=`/tv/images/${id_serial}/season=${nr.season_number}/episode=${nr.episode_number}`} key={index}  key={index} >{nr.episode_number}</Dropdown.Item>
           
        )
    })
    
    
    return (
      <div>
        <div className="col-sm-12 toataPaginaImagini" >
          <div style={{marginTop:'50px'}}>
            <Titlu titlu={detaliiSerial.name} pagina={`/tv/${id_serial}`} arrow />
            </div>
            <div style={{display:'flex',marginTop:'-50px'}}>
            <Dropdown >
                        <button  className="btn_allMovies"  
                            >Season   {sezonCurent}</button>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        
                        {listaSezoane}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown style={{marginLeft:'20px'}}>
                        <button  className="btn_allMovies"  
                            >Episode   {episodecurent}</button>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        
                        {listaEpisoade}
                        </Dropdown.Menu>
                    </Dropdown>
            </div>
         
        <div className="toateImaginileEpisod">
            {imaginiLista}

     </div>
     <div  style={{marginTop:'100px'}}/>
         
   </div>
   <div style={{marginTop:'100px'}} />
    <Footer /></div>
    )
}

export default ImaginiEpisodeSerial

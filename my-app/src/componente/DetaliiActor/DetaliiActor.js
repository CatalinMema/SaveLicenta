import React, { useEffect, useState } from 'react'
import { BsPersonFill } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {AducImagActor, aducdetaliiActor ,aducdetaliiActorRoluri, aducdetaliiActorRoluriSerial} from '../../Requests';
import './DetaliiActor.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextComentariu from '../Comentarii/TextComentariu/TextComentariu';
import CartonasActor from '../CartonasActor/CartonasActor';
const DetaliiActor = (props) => {
    let id_actor=props.match.params.id;
    

    const [aratafilme,setAratafilme]=useState(false);
    const [arataserial,setArataserial]=useState(false);

    const [detalii, setDetalii] = useState([]); 
    const [roluri,setRoluri] = useState([]);
    const [roluriSerial,setRoluriSerial]=useState([]);
    const [imagini,setImagini]=useState([]);
    useEffect(()=>{
        async function aducDate() {
            setDetalii(await aducdetaliiActor(id_actor));
            setRoluri(await aducdetaliiActorRoluri(id_actor));
            setRoluriSerial(await aducdetaliiActorRoluriSerial(id_actor));
            setImagini(await AducImagActor(id_actor));
        };
        aducDate();
    },[id_actor])
    
    const urlImagine='https://image.tmdb.org/t/p/original/'

   console.log(detalii);
   
    
    /*const settings = {
        infinite: true,
        speed: 1000,
        cssEase: 'linear',
        slidesToShow: 3,
        slidesToScroll:3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1131,
            settings: {
              slidesToShow: 3,
              slidesToScroll:3,
            }
          },
          {
            breakpoint: 681,
            settings: {
              slidesToShow: 2,
              slidesToScroll:2
            
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };*/

      const listRoluri1 = roluri.map((item,index)=>{
        //console.log(item.poster);
       if(item.character?.substring(0,urlImagine.length)!=="null")
       {return(
           <div style={{display:'flex',justifyContent:'space-between',marginBlock:'7px',alignItems:'center'}} key={index}> 
           <div style={{display:'flex',alignItems:'center'}}>
           <img className="imgRolFilme" src={`${item.poster_path}`} alt={`${item.name}`||`${item.title}`} />
           <h4 className="filme">
               <Link to={`/movie/${item.id}`} className="linkFilm"> {item.title} </Link>
              <span>({item.release_date? (item.release_date.substring(0,4)) : '-'})</span>
             
            </h4> </div>
                
               <p>{item.character}</p>
                          
          
           </div>
         
       )
   }
   })

   const listaImagini = imagini.map((poza,index)=>{
     return (
        
         <img key={index} className="imgAct" src={`${urlImagine}${poza.file_path}`} />
        
     )
   })
  // console.log(roluriSerial)
   const listRoluriSeriale = roluriSerial.map((item,index)=>{
    //console.log(item.poster);
   if(item.poster_path.substring(0,urlImagine.length)!=="null")
   {return(
    <div style={{display:'flex',justifyContent:'space-between',marginBlock:'7px',alignItems:'center'}} key={index}> 
    <div style={{display:'flex',alignItems:'center'}}>
    <img className="imgRolFilme" src={`${item.poster_path || item.backdrop_path}`}  alt=""/>
    <h4 className="filme">
        <Link to={`/tv/${item.id}`} className="linkFilm"> {item.name || item.original_name} </Link>
       <span>({item.first_air_date? (item.first_air_date.substring(0,4)) : '-'})</span>
      
     </h4> </div>
         
        <p>{item.character}</p>
                   
   
    </div>
     
   )
}
})
const setariDistributie = {
        
  infinite: true,
  speed: 1000,
  slidesToShow: 6 ,
  slidesToScroll:6,
  initialSlide: 0,
  responsive: [
     {
      breakpoint: 1131,
      settings: {
        slidesToShow: 3,
        slidesToScroll:3,
      }
    },
    {
      breakpoint: 681,
      settings: {
        slidesToShow: 2,
        slidesToScroll:2
      
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll:1,
      }
    }
  ]
};
    return (
        <div className="col-sm-12 PaginaDetalii">
        <hr/>
      <div className="persoana">
         <div className="stanga">
             {detalii.profile_path ? ( <CartonasActor actor={detalii} /> ) : (<div  className="cartonPers"><BsPersonFill size={190}/>
              
              </div>)}
         
            {/*  <h4>{detalii.name}</h4> */}
               

         </div>
         <div className="dreapta">
         {detalii.biography ? (  <div className="info">
         
         <h3>Description</h3>
         <div className="col-sm-12">
              <div className="col-sm-12">
                 
                 <p>{detalii.biography}</p>
              </div>
              
         </div>
     </div>) : (<div className="info">
         
         
         <div className="info_data">
              <div className="data">
                 
              </div>
              
         </div>
     </div>) }
    
  
  <div className="projects">

      <h3>Movies <FaAngleDown className="sageata" onClick={()=>setAratafilme(value=>!value)}/>   </h3>
      <div className="projects_data">
           <div className="data">
         
           {aratafilme?<>{listRoluri1}</>:null}
             
           </div>
           
        
      </div>
  </div>
  {listRoluriSeriale.length!==0 ? (
     <div className="projects">
   
     <h3>Series <FaAngleDown className="sageata" onClick={()=>setArataserial(value=>!value)}/>   </h3>
     <div className="projects_data">
          <div className="data">
        
          {arataserial?<>{listRoluriSeriale}</>:null}
            
          </div>
          
       
     </div>
 </div>
  ) : (null)}
 
         </div>
      </div><div style={{height:'105px'}}></div> 
      
      <TextComentariu  id_item={id_actor} media_type='actor'/>
      </div>
      );



}

export default DetaliiActor

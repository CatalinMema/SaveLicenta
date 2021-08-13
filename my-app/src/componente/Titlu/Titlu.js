import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useHistory } from 'react-router';
import './titlu.css';
function Titlu({titlu,pagina,arrow}) {
  const history=useHistory();
    return (
      <div className="col-sm-12">
        {pagina ? (<div   onClick={()=>{history.push(`${pagina}`)}} className="titlu_c"  >
        
        <h3
        
          className="titluLinie"><span style={{ color:"#F2AA4cFF"}}> | </span> {titlu} </h3>
          
        
         {arrow ? ( 
         <MdKeyboardArrowRight 
         className="sageata" 
         size={45}
         /> 
         ) : (null)}
        
         
         </div> ) : (
         <div className="titlu_c2"  >
         
         <h2
           
           className="titluLinie"><span style={{ color:"#F2AA4cFF"}}> | </span> {titlu} </h2>
           
         
          {arrow ? ( 
          <MdKeyboardArrowRight 
          className="sageata" 
          size={45}
          /> 
          ) : (null)}
         
          
          </div>) }
        </div>
       
    )
}

export default Titlu
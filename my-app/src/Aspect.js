import React, { useState } from 'react'
import BaraLateral from './componente/Lateral/BaraLateral';
import ParteaDeSus from './componente/ParteaDeSus/ParteaDeSus';

const Aspect = ({children}) => {
    const [bara,comutaBara] = useState(false);
    const realizareComutareBara = () => comutaBara(value=>!value)
    return (
        <div style={{background:'#141414',height:'fit-content'}}>
     
        <ParteaDeSus realizareComutareBara={realizareComutareBara} /> 
        <div className="app_container">
          <BaraLateral 
          bara={bara} 
          realizareComutareBara={realizareComutareBara}
          />
           
          <div className="col-sm-9" >
            {children}
          </div>
          
          </div>
        <hr />
    
      </div>
    )
}

export default Aspect

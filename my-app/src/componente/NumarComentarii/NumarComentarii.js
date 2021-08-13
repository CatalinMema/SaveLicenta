import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';

function NumarComentarii({adresaemail}) {
    const[comentariiUser,setComentarii]=useState();
    useEffect(() => {
        db.collection("comentarii").doc(`${adresaemail}`).collection(`com_${adresaemail}`).orderBy("timestamp","desc").onSnapshot(documente =>(
            setComentarii(documente.docs.map(doc=>(
                {
                    id_doc:doc.id,
                    data:doc.data(),
                })))))
    }, [])
    return (
      
             <span
             className="hoverElement"
             onClick={e =>  window.location.href=`/comentarii/${adresaemail}`}
             style={{background:'transparent',color:'black'}}>
            {comentariiUser?.length} {comentariiUser?.length === 1 ? "Comment" : "Comments"}
            </span>
       
    )
}

export default NumarComentarii

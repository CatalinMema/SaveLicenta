import React, { useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa';
import { auth, db } from '../../firebase';
import ComentariuPostat from '../Comentarii/ComentariuPostat/ComentariuPostat';
import firebase from 'firebase';
import './ComentariiPerUser.css';
import { RiAdminFill } from 'react-icons/ri';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';
function ComentariiPostateDeUtilizatori(props) {
    let adresaDeEmail = props.match.params.emaisl;
    const[comentariiUser,setComentarii]=useState();
    const [user]=useAuthState(auth);
    const elimina = (doc_id,name,description,message,id,media_type) => {
        db.collection("comentarii").doc(`${adresaDeEmail}`).collection(`com_${adresaDeEmail}`).doc(doc_id).delete();
        db.collection("Comentarii_Titlu").doc(`${id}_${media_type}`).collection("comentarii")
    .where("message", "==", message)
    .where("description", "==", description)
    .where("name", "==", name)
    .get()
    .then(querySnapshot => {
        querySnapshot.docs[0]?.ref.delete();
    });
    }
    
    
    useEffect(() => {
        db.collection("comentarii").doc(`${adresaDeEmail}`).collection(`com_${adresaDeEmail}`).orderBy("timestamp","desc").onSnapshot(documente =>(
            setComentarii(documente.docs.map(doc=>(
                {
                    id_doc:doc.id,
                    data:doc.data(),
                })))))
    }, [])
    const history=useHistory();
   // console.log(comentariiUser)
   // console.log(posts)
    return (
        <div className="comentUser">
             <div className="adminAntet">
                <div onClick={(e)=> 
                {
                    e.preventDefault();
                    history.push(`/`);}
                } className="butonLogOut">  
                <RiAdminFill size={30} />  Admin Page
                </div>  
                <div onClick={(e)=> 
                {
                    e.preventDefault();
                    auth.signOut();
                window.location.href=`/`;}
                }  className="butonLogOut hoverElement">  
                Log Out
                </div>  
                </div>
                <div className="paginaUseri">
        
          <div className="TitluPagUser">
          <h3  >User email: {adresaDeEmail}</h3>
  
            <span className="nr_comentarii">
            {comentariiUser?.length} {comentariiUser?.length === 1 ? "Comment" : "Comments"}
            </span>
            </div> 
            <div className="col-sm-10 comentariiUser">
            {comentariiUser?.length===0 ? (null) : (<h5> User's comments:</h5>) }   
            {comentariiUser?.map(({ id_doc, data : { name ,description , message,photoUrl,timestamp,id,media_type}},index) => (
                <div className="col-sm-10 listaComs" key={index}>
                <ComentariuPostat
                key={index}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
                timestamp={timestamp}
                />
                <button 
                 className="elimina"
                 onClick={()=>elimina(id_doc,name,description,message,id,media_type)}
                 >
                <FaWindowClose/>
                </button></div>
            ))}
            </div>
             
        </div> </div>
    )
}

export default ComentariiPostateDeUtilizatori

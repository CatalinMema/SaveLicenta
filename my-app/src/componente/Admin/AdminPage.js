import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaWindowClose } from 'react-icons/fa';
import { auth, db } from '../../firebase';
import ComentariiPostateDeUtilizatori from '../ComentariiPostateDeUtilizatori/ComentariiPostateDeUtilizatori';
import './AdminPage.css';
import {RiAdminFill} from 'react-icons/ri'
import NumarComentarii from '../NumarComentarii/NumarComentarii';
import { useHistory } from 'react-router-dom';
function AdminPage() {
    const [user]=useAuthState(auth);
    const elimina = (doc_id) => {
       // db.collection("users").doc(doc_id).delete();
        /*db.collection("comentarii").doc(doc_id)
        .collection(`com_${doc_id}`)
        .where("description","==",doc_id).get()
        .then(querySnapshot1 => {
            querySnapshot1.forEach((doc)=>{
                doc.ref.delete();
            })
        })*/
        db.collection("lista").doc(doc_id).collection(`lista_${doc_id}`).where("email","==",doc_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc)=>{
               doc.ref.delete();
            })
        })
        db.collection("urmarite").doc(doc_id).collection(`urmarite_${doc_id}`).where("email","==",doc_id).get()
        .then(querySnapshot2 => {
            querySnapshot2.forEach((doc)=>{
               doc.ref.delete();
            })
        })
        db.collection("actori").doc(doc_id).collection(`actori_${doc_id}`).where("email","==",doc_id).get()
        .then(querySnapshot3 => {
            querySnapshot3.forEach((doc)=>{
               doc.ref.delete();
            })
        })

        db.collection("episoade").doc(doc_id).collection(`episoadeFavorite_${doc_id}`).where("email","==",doc_id).get()
        .then(querySnapshot4 => {
            querySnapshot4.forEach((doc)=>{
               doc.ref.delete();
            })
        })
    
    }
    //console.log(db.collection("lista").doc("closegane10@gmail.com").collection("lista_closegane10@gmail.com").where("nume","==","c9 m8"));
    const[utilziatori,setUtile]=useState();

   /* const aducUseri=async()=>{
      const responce=db.collection("users");
      const data=await responce.get();
      setUtile(data.docs.map(doc=>(
        {
          id_doc:doc.id,
          data:doc.data(),   
        }
    ))) 
    }*/
    useEffect(() => {
        db.collection("users").orderBy("timestamp","desc").onSnapshot(documente =>(
            setUtile(documente.docs.map(doc=>(
                {
                    id_doc:doc.id,
                    data:doc.data(),
                })))))
    }, [])

    const history=useHistory();
    return (
        <div style={{color:'white'}}>
           
             <div className="adminAntet">
                <div className="butonLogOut">  
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
                <h3 className="usersH3">Users</h3>
 {utilziatori ? (
            <div className="col-sm-12 utilizatoriBoard">
                
                 <div className="backWhite allActors2" 
                 style={{borderBottom:'2px solid black'}}>
                 
                           
                    <p className="LastS">Identifier</p> 
               
                    
                          
                   <p className="LastN">Last signed In</p>
                   
                 
                  <p >  User name</p>
       
                   <p>Remove User Data</p> 
                
                    
                   <p>Reviews and Opinions</p> 
                 
                </div>
              {utilziatori.map(({ id_doc,data : { photo ,name,id,timestamp,email }},index) => (
                       
                 <div key={index}  className="allActors2">
                     
                    
                     <p className="hoverElement backWhite LastS"
                     onClick={e =>  history.push(`/comentarii/${email}`)}
                     >{email}</p>  
                      <p className="backWhite LastN">{new Date(timestamp?.toDate()).toUTCString()} </p> 
                    
               <p className="hoverElement backWhite" onClick={e =>  window.location.href=`/comentarii/${email}`}>{name}  </p> 
             
             
                <button 
                 className="elimina"
                onClick={()=>elimina(email)}>
                <FaWindowClose/>
                </button>  
                
               
                 <NumarComentarii 
                 adresaemail={email} />  
            </div>
              ))}
            </div>
          ) : (
            <h2 className="niciun_actor">No actors in your list! Add some!</h2>
          )}

          

      </div> 
    )
}

export default AdminPage

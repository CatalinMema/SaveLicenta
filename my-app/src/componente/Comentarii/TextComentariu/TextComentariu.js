import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase';
import ComentariuPostat from '../ComentariuPostat/ComentariuPostat';
import './TextComentariu.css';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const TextComentariu = ({id_item,media_type}) => {
    const[user]=useAuthState(auth);
  //  console.log(user)
    const [input,setInput]= useState('')
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        db.collection("Comentarii_Titlu").doc(`${id_item}_${media_type}`).collection("comentarii").orderBy("timestamp","desc").onSnapshot(snapshot =>(
            setPosts(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    data:doc.data(),
                }
            )))
        ))
    }, [id_item],media_type) 

    const sendPost = (e) => {
        e.preventDefault();
       
        db.collection("Comentarii_Titlu").doc(`${id_item}_${media_type}`).collection("comentarii").add({
            id:id_item,
            media_type:media_type,
            name: user.displayName,
            description: user.email,
            message: input, 
            photoUrl: user.photoURL || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        db.collection("comentarii").doc(`${user.email}`).collection(`com_${user.email}`).add({
            id:id_item,
            media_type:media_type,
            name: user.displayName,
            description: user.email,
            message: input, 
            photoUrl: user.photoURL || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
        
    }
    let dezactivat= input ? false:true;
    return (
        
        <div className="feed">
            <div className="feed_inputContainer">
                {media_type==="actor" ? (
                     <div className="feed__input">
                     <form>
                        <textarea className="form-control" rows="3" placeholder="Add your opinion..." value={input} onChange={e => setInput(e.target.value)} type="text"/>
                     </form>
                     <button
                     style={{marginBottom:'20px'}}
                    disabled={dezactivat} 
                    onClick={sendPost} type='submit' className="btn_Send">Add your opinion</button>
                 </div>
                ) : (
                    <div className="feed__input">
                    <form>
                       <textarea className="form-control" rows="3" placeholder="Add your review..." value={input} onChange={e => setInput(e.target.value)} type="text"/>
                    </form>
                    <button
                    style={{marginBottom:'20px'}}
                   disabled={dezactivat} 
                   onClick={sendPost} type='submit' className="btn_Send">Add your review</button>
                </div>
                )}
               
                
            </div>
            <div className="comentarii">
            {posts.map(({ id, data : { name ,description , message,photoUrl,timestamp}}) => (
                <ComentariuPostat
                key={id}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
                timestamp={timestamp}
                />
            ))}
            </div>
        </div>
    )
}

export default TextComentariu

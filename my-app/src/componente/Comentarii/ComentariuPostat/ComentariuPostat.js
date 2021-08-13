import React from 'react'
import './ComentariuPostat.css';
const ComentariuPostat = ({name,description,message,photoUrl,timestamp}) => {
    return (
        <div className="post">
            <div className="post__header">
                <img src={photoUrl} className="imagineProfil" alt={name}/>
            
            <div className="post_info">
                <h2> {name} <span>{new Date(timestamp?.toDate()).toUTCString()} </span></h2>
                <p> {description}</p>   
                <p></p>
            </div>
            </div>
            <div className="post_body">
            <p> {message} </p>
            </div>
        </div>
    )
}

export default ComentariuPostat

import React, { useState } from 'react'
import './style.css';
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
const Acordeon = () => {

    const [selectat,setSelectat]=useState(null);
    const toggle = (i) => {
        if(selectat===i){
            return setSelectat(null);

        }
        setSelectat(i);
    }

    return (
        <div className="wrapper">
            <div className="accordion">
            <h1 style={{paddingBottom:'20px'}}>Despre</h1>
            {Data.map((item,i) =>(
                <div key={i} className="item">
                    <div className="title" onClick={()=> toggle(i)}>
                       <h2>{item.question}</h2>
                       
                       <span >{selectat === i ? <AiOutlineMinus style={{background:'#F2AA4cFF'}} size={30}/>:<AiOutlinePlus style={{background:'#F2AA4cFF'}} size={30}/>}</span>
                       </div>
                    <div className={
                        selectat === i ? 'content show' : 'content'
                    }>
                    {item.answer}
                       </div>
                    </div>
            ))}

            </div>
        </div>
    )
}

export default Acordeon;


const Data =[    {
    question:"What is this?",
    answer:"This site is a source of entertainment information, designed to help fans explore the world of movies and shows and decide what to watch."
},
{
    question:"What can you do?",
    answer:" Share your knowledge and opinions with with other fans"
}

];


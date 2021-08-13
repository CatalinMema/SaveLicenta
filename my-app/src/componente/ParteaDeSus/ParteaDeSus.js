import React , {useContext, useEffect, useState} from 'react'
import { FaBars } from "react-icons/fa";
import {AiFillCloseSquare, AiOutlineClose, AiOutlineSearch} from "react-icons/ai";
import {SiBbciplayer} from "react-icons/si";
import './sus.css';
import RezultatCautare from './RezultatCautare';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import {  Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { aducGenuri, aducGenuriSeriale } from '../../Requests';
import { MovieContext } from '../../Context/MovieContext';
const ParteaDeSus = ({realizareComutareBara}) => {
    const [user] = useAuthState(auth);
    const[textCautare,setTextCautare] = useState("");
    const [rezultate,setRezultate]=useState([]);
    const [genFilm,setGenFilm]=useState([]);
    const [genSerial,setGenSerial]=useState([]);
    const { setCurrentPage,setvaloarePagina,idGen, setidGenFilm,currentPage,setidGenSerial} = useContext(MovieContext);
    const modificareText = e => {
        e.preventDefault();

        setTextCautare(e.target.value);

        fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=fded240a4f53f2f753526ddbc888bc73&language=en-US&page=1&include_adult=false&query=${e.target.value}`
          ).then(res => res.json())
          .then((data) =>{
              if(!data.errors){
                 //console.log(data);
                  setRezultate(data.results);
              }
              else{
                  setRezultate([])
              }
          });
    };

    useEffect(()=>{
        const aducInfo = async () =>{
            setGenFilm(await aducGenuri());
            setGenSerial(await aducGenuriSeriale());
        }
        aducInfo();
    }, [user.email]);

    function iesire (e){
        e.preventDefault();
        auth.signOut();
        window.location.href='/';
    }

    const ListaGenuri = genFilm.map((gen,index)=>{
        if(gen.id!==99){
        return(
            <Dropdown.Item 
            onClick={()=>{history.push(`/genre/movie/${gen.nume}/${gen.id}`);
            setCurrentPage(1);
            setvaloarePagina("");
            setidGenFilm(gen.id)
        }} key={index} >{gen.nume}</Dropdown.Item>
            
           
        )};
    });  

    const ListaGenuriSerial = genSerial.map((gen,index)=>{
  
        return(
            <Dropdown.Item onClick={()=>{history.push(`/genre/tv/${gen.nume}/${gen.id}`);
            setidGenSerial(gen.id)
            setCurrentPage(1);
            setvaloarePagina("");
        
        }}key={index}>{gen.nume}</Dropdown.Item>
              
           
        );
    });  
   const eliminaText = e => {
    e.preventDefault();
    setTextCautare("");
    setRezultate([])
     
};
   const history=useHistory();
    return (
        <div>
            <div className="antet">
                <FaBars
                onClick={()=>realizareComutareBara()}
                className="antet__meniu" 
                size={26} 
                color="white"
                />
  <Link className="link" to={`/`}>  
                <SiBbciplayer style={{
                backgroundColor:"#141414",
                color:"#F2AA4cFF"}}
                className="antet__logo"
                />
      </Link>
               <div className="searchBar">
                   
                    <input type="text" placeholder="Search for a movie, series or actor"
                    value={textCautare}
                    onChange={modificareText}
                    maxLength={30}
                    />
                    {textCautare.length > 0 ? ( <button 
                         onClick={eliminaText}
                         style={{marginLeft:'-30px',background:'transparent',color:'black',outline:'none',border:'none'}}>
                             <AiOutlineClose size={20} style={{background:'transparent', color:'white'}} />
                             </button>) : (null)}
                        
                </div>
                <div className="dropMovies">
                    <Dropdown >
                        <button  className="btn_allMovies" 
                        onClick={()=>{history.push(`/movies`);
                        setCurrentPage(1);
                        setvaloarePagina("");
                    }}
                         
                            >Movies</button>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        {ListaGenuri}
                        </Dropdown.Menu>
                    </Dropdown>
                 </div>
                 <div className="dropMovies">
                    <Dropdown >
                        <button  className="btn_allMovies" 
                         onClick={()=>{history.push(`/series`);
                        setCurrentPage(1);
                        setvaloarePagina("");}}>Series</button>

                        <Dropdown.Toggle style={{background:'transparent',outline:'none',border:'none',color:'white'}}  />

                        <Dropdown.Menu >
                        {ListaGenuriSerial}
                        </Dropdown.Menu>
                    </Dropdown>
                 </div>
                
               
        
                {/*<FaUserGraduate 
                    style={{
                    backgroundColor:"#141414",
                    width: "45px",
                    height: "45px",
                    color:"white",
                    }} 
                className="avatar"/>*/}
                
                 <div className="userPart" style={{textAlign:'center',color:'white',cursor:'pointer',display:'flex'}}
                onClick={iesire}
                > 
                
                {user.photoURL? (<img
               
                src={user.photoURL} alt="" style={{
                    
                    width: "35px",
                    height: "35px",
                    borderRadius:'20%'
                    }}
                   
                    />): (null)}
                    <h5 style={{
                        alignSelf:'flex-end'
                    }}>{user.displayName}</h5>
                 </div>
        </div>   
        {rezultate.length > 0 && (
            <div className="rezultate" >
              {rezultate.map((movie,index) => (
                <li style={{
                    listStyle:'none',
                    borderBottom:'2px solid white'
                }} key={index}>
                 <RezultatCautare item={movie}/>
                </li>
              ))}
            </div>
          )}
        </div>
    )
}

export default ParteaDeSus

import React, { useState, createContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import axios from '../axios';
export const MovieContext = createContext();

export const StareInformatii = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const[user]=useAuthState(auth);
    const [posts,setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [watched,setwatched] = useState([]);
    const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
    const url_date=`/movie/popular?api_key=${cheie_API}&page=${currentPage}`;
     const [movies, setMovies] = useState([]);
       useEffect(() => {
         async function aducData(){
          try {
            const request = await axios.get(url_date);
            setMovies(request.data.results);
            return request;
          } catch (error) {
            console.clear();
            setMovies([]);
          }  
       }
       aducData();
       }, [url_date,currentPage]);


      
  const url_dateSeriale=`/tv/popular?api_key=${cheie_API}&page=${currentPage}`;
    const [seriale, setSeriale] = useState([]);
    
     
    useEffect(() => {
      async function aducData(){
        try {
          const request = await axios.get(url_dateSeriale);
        setSeriale(request.data.results);
        
        return request;
        } catch (error) {
          console.clear();
          setSeriale([]);
          return error.response;
        }
        
        
    }
    aducData();
    
    }, [url_dateSeriale,currentPage]);

    const urlTrending=`https://api.themoviedb.org/3/trending/all/week?api_key=${cheie_API}&page=${currentPage}`;

      const [trendingAllWeek, setTrandingAllWeek] = useState([]);
      useEffect(() => {
        async function aducDateTrending(){
      try {
        const request = await axios.get(urlTrending);
        setTrandingAllWeek(request.data.results);
        
        return request;
      } catch (error) {
        console.clear();
        setTrandingAllWeek([]);
        return error.response;
      }
         
             
        };
        aducDateTrending();
      
      }, [currentPage,urlTrending]);

       const [filmeDupaGen,setFilmeDupaGen] = useState([]);
        const[idGenFilm,setidGenFilm]=useState(28);
       const url_dataFilmeGen=`/discover/movie?api_key=${cheie_API}&with_genres=${idGenFilm}&page=${currentPage}`;
      
       useEffect(() => {
        async function dateFilmeDupaGen(){
        try {
          const request = await axios.get(url_dataFilmeGen);
          setFilmeDupaGen(request.data.results);
          
          return request;
        } catch (error) {
          console.clear();
          setFilmeDupaGen([]);
        return error.response;
        }
          
  
          
      }
      dateFilmeDupaGen();
      
      }, [url_dataFilmeGen,currentPage,idGenFilm]);
      
      const [ActoriListaFull, setActoriListaFull] = useState([]);
      
      const url_dateActoriListaFull=`/person/popular?api_key=${cheie_API}&page=${currentPage}`;
      useEffect(() => {
        async function aducDate(){
          try {
            const cerere = await axios.get(url_dateActoriListaFull);
            setActoriListaFull(cerere.data.results);
            return cerere;
          } catch (error) {
            setActoriListaFull([]);
          }
         
        }
      aducDate();
      }, [url_dateActoriListaFull,currentPage]);
      const [serialeDupaGen,setSerialeDupaGen] = useState([]);
      const[idGenSerial,setidGenSerial]=useState(28);
     
      const url_dateSerialeGen=`/discover/tv?api_key=${cheie_API}&with_genres=${idGenSerial}&page=${currentPage}`;

      useEffect(() => {
        async function aducData(){
          try {
            const request = await axios.get(url_dateSerialeGen);
          setSerialeDupaGen(request.data.results);
         
          return request;
          } catch (error) {
            console.clear();
            setSerialeDupaGen([]);
          return error.response;
          }
          
          
      }
      aducData();
      
      }, [url_dateSerialeGen,currentPage,idGenSerial]);

      

      const [actori,setActori] = useState([]);
      const [episodFavorit,setepisodFavorit] = useState([]);
      const [episodFav,setepisodFav] = useState([]);
    useEffect(()=>{
      setIsLoading(true);
      db.collection(`lista`).doc(`${user.email}`).collection(`lista_${user.email}`).orderBy("timestamp","desc").onSnapshot(documente =>(
            setPosts(documente.docs.map(doc=>(
                {
                    id_doc:doc.id,
                    data:doc.data(),
                })))))
          db.collection(`urmarite`).doc(`${user.email}`).collection(`urmarite_${user.email}`).orderBy("timestamp","desc").onSnapshot(documente =>(
          setwatched(documente.docs.map(doc=>(
              {
                id_doc:doc.id,
                  data:doc.data(),
                   })))))
                   db.collection("actori").doc(`${user.email}`).collection(`actori_${user.email}`).orderBy("timestamp","desc").onSnapshot(documente =>(
        setActori(documente.docs.map(doc=>(
            {
                id_doc:doc.id,
                data:doc.data(),
            })))))
            db.collection("episoade").doc(`${user.email}`).collection(`episoadeFavorite_${user.email}`).orderBy("timestamp","desc").onSnapshot(documente =>(
      setepisodFavorit(documente.docs.map(doc=>(
            {
                id_doc:doc.id,
                data:doc.data(),
            })))))
            db.collection("episoade").doc(`${user.email}`).collection(`episoadeFavorite_${user.email}`).orderBy("timestamp","desc").onSnapshot(documente =>(
      setepisodFav(documente.docs.map(doc=>(
            {
                id_doc:doc.id,
                data:doc.data(),
            })))))
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 2400);
        return () => clearTimeout(loadingTimeout);
      
    }, [user.email,movies]) 
    const[valoarePagina,setvaloarePagina] = useState("");
   
 
  const valoareText = e => {
    
    setvaloarePagina(parseInt(e.target.value));
     
};
  const setarePagina = e => {
    
    if (Number(valoarePagina)) {
        setCurrentPage(valoarePagina); 
        
  }
    else{
      setvaloarePagina("")
    }
};

const newPage = (direction) => {
    if (direction === "next") {
      
      setCurrentPage(currentPage + 1);
      
    } else if (direction === "previous" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <MovieContext.Provider
      value={{
       posts,
       setPosts,
       isLoading,
       setIsLoading,
       watched,
       setwatched,
       user,
       movies,
       setMovies,
       newPage,
       currentPage,
       setCurrentPage,
       valoarePagina,
       setvaloarePagina,
       valoareText,
       setarePagina,
       filmeDupaGen,
       setFilmeDupaGen,
       idGenFilm,setidGenFilm,
       seriale,
       setSeriale,
       serialeDupaGen,setSerialeDupaGen,
      idGenSerial,setidGenSerial,
      actori,setActori,episodFavorit,setepisodFavorit,
      episodFav,setepisodFav,
      trendingAllWeek,ActoriListaFull, setActoriListaFull
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
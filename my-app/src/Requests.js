import axios from 'axios';
const cheie_API ="fded240a4f53f2f753526ddbc888bc73";
const urlPoza = 'https://image.tmdb.org/t/p/original';
const url_de_baza='https://api.themoviedb.org/3';
const trendingDay=`${url_de_baza}/trending/all/day?api_key=${cheie_API}`;

const urlGenuri = `${url_de_baza}/genre/movie/list`;
const urlGenuriSeriale = `${url_de_baza}/genre/tv/list`;
const personPopularurl=`${url_de_baza}/person/popular?api_key=${cheie_API}`;
const trendingAllWeek=`${url_de_baza}/trending/all/week?api_key=${cheie_API}`;
const topRatedMoviesurl=`${url_de_baza}/movie/top_rated?api_key=${cheie_API}`;
const popularTvSeriesurl=`${url_de_baza}/tv/popular?api_key=${cheie_API}`;
const popularMovieUrl=`${url_de_baza}/movie/popular?api_key=${cheie_API}`
const requests = {
   fetchTrending: `/trending/all/week?api_key=${cheie_API}`,
   popularMovieUrl:`/movie/popular?api_key=${cheie_API}`,
   popularTvSeriesurl:`/tv/popular?api_key=${cheie_API}`,
   topRatedMovies:`/movie/top_rated?api_key=${cheie_API}`,
   actors:`/person/popular?api_key=${cheie_API}`,
   genuri:`/genre/movie/list?api_key=${cheie_API}`
}
export default requests;

export const serialForDetaliiSerial= async(tv_id) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}?api_key=${cheie_API}`);
       //console.log(data);
        return data;
        
    } catch (error) {
        
    }
}
export const aducdetaliiSerial= async(tv_id) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}?api_key=${cheie_API}`);
       //console.log(data);
        return data;
        
    } catch (error) {
        
    }
}
export const aducdetaliiSerialSezoane= async(tv_id) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}?api_key=${cheie_API}`);
       //console.log(data);
        return data.seasons;
        
    } catch (error) {
        
    }
}

export const next_episode_to_air= async(tv_id) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}?api_key=${cheie_API}`);
       //console.log(data);
        return data.next_episode_to_air;
        
    } catch (error) {
        
    }
}
export const last_episode_to_air= async(tv_id) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}?api_key=${cheie_API}`);
       //console.log(data);
        return data.last_episode_to_air;
        
    } catch (error) {
        
    }
}

export const aducVideoTv = async (tv_id) => {
    try {
        const {data} = await axios.get(`${url_de_baza}/tv/${tv_id}/videos?api_key=${cheie_API}`);
   //console.log(data.results);
        return data.results;
    } catch (error) {
        console.log(error.message)
    }
}
export const distributieSerial = async (tv_id) =>{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}/credits?api_key=${cheie_API}`);
        const datePreluate = data.cast.map((actor) => ({
            id:actor.id,
            id_persoana: actor.cast_id,
            character: actor.character,
            name: actor.name,
            profile_path:urlPoza+actor.profile_path,
        }))
        //console.log(data);
        return datePreluate;
    } catch (error) {
        
    }
}

export const similarSeries = async (tv_id) =>{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}/similar?api_key=${cheie_API}`);
        const modifiedData = data.results.map((serial) => ({
            id:serial.id,
            backdrop_path:urlPoza+serial.backdrop_path,
            name:serial.name,
            original_name:serial.original_name,
            poster_path:urlPoza+serial.poster_path,
            overview:serial.overview,
            vote_average:serial.vote_average,
            release_date:serial.release_date,     
            media_type:'tv',
        }))
       // console.log(modifiedData);
        return modifiedData;
    } catch (error) {
        
    }
}


export const aducdetaliiFilm = async(movie_id) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/movie/${movie_id}?api_key=${cheie_API}`);
       //console.log(data);
        return data;
        
    } catch (error) {
        
    }
}

export const aducVideoFilm = async (movie_id) => {
    try {
        const {data} = await axios.get(`${url_de_baza}/movie/${movie_id}/videos?api_key=${cheie_API}`);
  //console.log(data.results);
        return data.results;
    } catch (error) {
        console.log(error.message)
    }
}

export const distributieFilm = async (movie_id) =>{
    try {
        const { data } = await axios.get(`${url_de_baza}/movie/${movie_id}/credits?api_key=${cheie_API}`);
        const modifiedData = data.cast.map((actor) => ({
            id:actor.id,
            id_persoana: actor.cast_id,
            character: actor.character,
            name: actor.name,
            profile_path: urlPoza + actor.profile_path,
        }))
        //console.log(data);
        return modifiedData;
    } catch (error) {
        
    }
}

export const similarMovies = async (movie_id) =>{
    try {
        const { data } = await axios.get(`${url_de_baza}/movie/${movie_id}/similar?api_key=${cheie_API}`);
        const modifiedData = data.results.map((film) => ({
            id:film.id,
            backdrop_path:urlPoza+film.backdrop_path,
            title:film.title,
            original_title:film.original_title,
            poster_path:urlPoza+film.poster_path,
            deoverviewscriere:film.overview,
            vote_average:film.vote_average,
            release_date:film.release_date,    
            media_type:'movie', 
        }))
        //console.log(modifiedData);
        return modifiedData;
    } catch (error) {
        
    }
}

export const aducdetaliiActorRoluri = async (actor_id) =>{
    try {
        const {data} = await axios.get(`${url_de_baza}/person/${actor_id}/movie_credits?api_key=${cheie_API}`);

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data.cast.map((rol) => ({
            id: rol.id,
            backdrop_path: posterUrl + rol.backdrop_path,
            poster_path: posterUrl + rol.poster_path,
            title:rol.title,
            character:rol.character,
            release_date:rol.release_date,
        }))
       //console.log(data);
        return modifiedData;
       
    } catch (error) {
        
    }
}
export const aducdetaliiActor = async (id_person) =>{
    try {
        const {data} = await axios.get(`${url_de_baza}/person/${id_person}?api_key=${cheie_API}`);
       // console.log(data);
        return data;

    } catch (error) {
        
    }
}

export const aducdetaliiActorRoluriSerial = async (actor_id) =>{
    try {
        const {data} = await axios.get(`${url_de_baza}/person/${actor_id}/tv_credits?api_key=${cheie_API}`);

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data.cast.map((rol) => ({
            id: rol.id,
            backdrop_path: posterUrl + rol.backdrop_path,
            poster_path: posterUrl + rol.poster_path,
            title:rol.title,
            character:rol.character,
            release_date:rol.release_date,
            name:rol.name,
            original_name:rol.original_name,
            first_air_date:rol.first_air_date,
        }))
      // console.log(data);
        return modifiedData;
       
    } catch (error) {
        
    }
}

export const aducGenuri = async () => {
    try {
        const { data } = await axios.get(`${urlGenuri}?api_key=${cheie_API}`);
        const dateAfisare = data.genres.map((g)=>({
            id:g.id,
            nume:g.name
        }))
 //console.log(dateAfisare);
        return dateAfisare;
    } catch (error) {
        
    }
}


export const aducGenuriSeriale = async () => {
    try {
        const { data } = await axios.get(`${urlGenuriSeriale}?api_key=${cheie_API}`);
        const dateAfisare = data.genres.map((g)=>({
            id:g.id,
            nume:g.name
        }))
 //console.log(dateAfisare);
        return dateAfisare;
    } catch (error) {
        
    }
}

export const TrendingThisWeek = async () => {
    try{
        const { data } = await axios.get(`${trendingDay}`);
        const date_de_folosit = data.results.map((item)=>({
            id:item.id,
            title:item.title,
            backdrop_path:urlPoza+item.backdrop_path,
            media_type:item.media_type,
            original_title:item.original_title,
            poster_path:urlPoza+item.poster_path,
            name:item.name,
            original_name:item.original_name,
            
        }))
       // console.log(data);
        return date_de_folosit;
    }
    catch (error){
        //console.log(error.message);
    }
}


export const TrendingThisWeekFull = async (nr_page) => {
    try{
        const { data } = await axios.get(`${trendingAllWeek}&page=${nr_page}`);
        const date_de_folosit = data.results.map((item)=>({
            id:item.id,
            title:item.title,
            backdrop_path:urlPoza+item.backdrop_path,
            media_type:item.media_type,
            original_title:item.original_title,
            poster_path:urlPoza+item.poster_path,
            name:item.name,
            original_name:item.original_name,
            profile_path:urlPoza+item.profile_path,
            vote_average:item.vote_average
            
        }))
       // console.log(data);
        return date_de_folosit;
    }
    catch (error){
        //console.log(error.message);
    }
}

export const dateActoriPopulari = async (nr_pagina) => {
    try {
        const {data} = await axios.get(`${personPopularurl}&page=${nr_pagina}`);
       
        const date_de_folosit = data.results.map((actor)=>({
            id:actor.id,
            known_for:actor.known_for,
            name:actor.name,
            profile_path:urlPoza+actor.profile_path,

            
        }))
        //console.log(data);
        return date_de_folosit;
    } catch (error) {
        //console.log(error.message);
    }
}

export const dateFilmeTopRated= async (nr_pag) => {
    try {
        const {data} = await axios.get(`${topRatedMoviesurl}&page=${nr_pag}`);
       
        const date_de_folosit = data.results.map((film)=>({
            id:film.id,
            backdrop_path:urlPoza+film.backdrop_path,
            title:film.title,
            original_title:film.original_title,
            poster_path:urlPoza+film.poster_path,
            overview:film.overview,
            vote_average:film.vote_average,
            release_date:film.release_date,
            origin_country:film.origin_country ,
            media_type:'movie',
           
        }))
       // console.log(date_de_folosit);
        return date_de_folosit;
    } catch (error) {
        console.log(error.message);
    }
}
export const datePopularSeries= async (nr_pag) => {
    try {
        const {data} = await axios.get(`${popularTvSeriesurl}&language=en-US&page=${nr_pag}`);
       
        const date_de_folosit = data.results.map((film)=>({
            id:film.id,
            backdrop_path:urlPoza+film.backdrop_path,
            name:film.name,
            original_name:film.original_name,
            poster_path:urlPoza+film.poster_path,
            overview:film.overview,
            vote_average:film.vote_average,
            release_date:film.release_date,
            media_type:'tv' 
           
        }))
        //console.log(data);
        return date_de_folosit;
    } catch (error) {
    // console.log(error.message);
    }
}
export const datefilmePopulare = async () => {
    try {
        const {data} = await axios.get(`${popularMovieUrl}`);
       
        const date_de_folosit = data.results.map((film)=>({
            id:film.id,
            backdrop_path:urlPoza+film.backdrop_path,
            title:film.title,
            original_title:film.original_title,
            original_name:film.original_name,
            poster_path:urlPoza+film.poster_path,
            overview:film.overview,
            vote_average:film.vote_average,
            release_date:film.release_date,
            genre_ids:film.genre_ids[1],
            media_type:'movie'
        }))
        //console.log(data);
        return date_de_folosit;
    } catch (error) {
        //console.log(error.message);
    }
}


export const aducImaginiFilm =async (id_film) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id_film}/images?api_key=${cheie_API}`)
        return data.backdrops;
    } catch (error) {
        
    }
}

export const aducImaginiSerial =async (id_Serial) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id_Serial}/images?api_key=${cheie_API}`)
        return data.backdrops;
    } catch (error) {
        
    }
}

export const AducImagActor =async (id_actor) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id_actor}/images?api_key=${cheie_API}`)
        return data.profiles;
    } catch (error) {
        
    }
}


export const aducSezon =async (tv_id,id_sezon) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/season/${id_sezon}?api_key=${cheie_API}`)
        return data;
        
    } catch (error) {
        
    }
}


export const adicEpisoade =async (tv_id,id_sezon) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/season/${id_sezon}?api_key=${cheie_API}`)
        return data.episodes;
        
    } catch (error) {
        
    }
}

export const numar_Sezoane= async(tv_id) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}?api_key=${cheie_API}`);
       //console.log(data);
        return data.seasons;
        
    } catch (error) {
        
    }
}


export const detaliiEpisod= async(tv_id,season_number,episode_number) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}/season/${season_number}/episode/${episode_number}?api_key=${cheie_API}`);
       //console.log(data);
        return data;
        
    } catch (error) {
        
    }
}

export const imaginiEpisodSerial= async(tv_id,season_number,episode_number) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}/season/${season_number}/episode/${episode_number}/images?api_key=${cheie_API}`);
       //console.log(data);
        return data.stills;
        
    } catch (error) {
        
    }
}

export const videoEpisodSerial= async(tv_id,season_number,episode_number) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}/season/${season_number}/episode/${episode_number}/videos?api_key=${cheie_API}`);
       //console.log(data);
        return data.results;
        
    } catch (error) {
        
    }
}

export const castEpisodSerial= async(tv_id,season_number,episode_number) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}/season/${season_number}/episode/${episode_number}/credits?api_key=${cheie_API}`);
       //console.log(data);
        return data.cast;
        
    } catch (error) {
        
    }
}
export const crewEpisodSerial= async(tv_id,season_number,episode_number) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}/season/${season_number}/episode/${episode_number}/credits?api_key=${cheie_API}`);
       //console.log(data);
        return data.crew;
        
    } catch (error) {
        
    }
}

export const guest_starsEpisodSerial= async(tv_id,season_number,episode_number) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/${tv_id}/season/${season_number}/episode/${episode_number}/credits?api_key=${cheie_API}`);
       //console.log(data);
        return data.guest_stars;
        
    } catch (error) {
        
    }
}

export const getUserRevies= async(movie_id) =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/movie/${movie_id}/reviews?api_key=${cheie_API}`);
       //console.log(data);
        return data.results;
        
    } catch (error) {
        
    }
}

export const getSerialeThisWeek= async() =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/tv/on_the_air?api_key=${cheie_API}`);
       //console.log(data);
        return data.results;
        
    } catch (error) {
        
    }
}

export const upcoming= async() =>
{
    try {
        const { data } = await axios.get(`${url_de_baza}/movie/upcoming?api_key=${cheie_API}`);
       //console.log(data);
        return data.results;
        
    } catch (error) {
        
    }
}
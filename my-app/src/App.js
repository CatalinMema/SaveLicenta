import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Aspect from './Aspect';
import DetaliiFilm from './componente/DetaliiFilm/DetaliiFilm';
import DetaliiSerial from './componente/DetaliiSerial/DetaliiSerial';
import DetaliiActor from './componente/DetaliiActor/DetaliiActor';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import Watchlist from './componente/Watchlist/Watchlist';
import FavActors from './componente/FavoritesActors/FavActors';
import Watched from './componente/Watched/Watched';
import Filme from './componente/Filme/Filme';
import Seriale from './componente/Seriale/Seriale';
import FilmeGen from './componente/FilmeDupaGen/FilmeGen';
import SerialeGen from './componente/SerialeDupaGen/SerialeGen';
import LoginScreen from './componente/LoginScreen/LoginScreen';
import Actori from './componente/Actori/Actori';
import TrendingAllWeek from './componente/TrendingAllWeek/TrendingAllWeek';
import PaginaPrincipala from './componente/PaginaPrincipala/PaginaPrincipala';
import CastCrew from './componente/CastCrew/CastCrew';
import CastCrewTv from './componente/CastCrewTv/CastCrewTv';
import ImaginiFilm from './componente/ImaginiFilm/ImaginiFilm';
import ImaginiSerial from './componente/ImaginiSerial/ImaginiSerial';
import Sezoane from './componente/Sezoane/Sezoane';
import EpisodSerial from './componente/EpisodSerial/EpisodSerial';
import ImaginiEpisodeSerial from './componente/ImaginiEpisodSerial/ImaginiEpisodeSerial';
import FavEpisodes from './componente/FavEpisodes/FavEpisodes';
import { StareInformatii } from './Context/MovieContext';
import firebase from 'firebase';
import { useEffect, useState } from 'react';
import AdminPage from './componente/Admin/AdminPage';
import ComentariiPostateDeUtilizatori from './componente/ComentariiPostateDeUtilizatori/ComentariiPostateDeUtilizatori';
function App() {
  
  const [user,loading]=useAuthState(auth);
   
  if(loading){
    return (
      <div className="loadingApp">
        <div className="continutLoadingApp">
          
        </div>
      </div>
    );
  }
  if(user && user.email!=="catalin.mema@titeica.com")
  {
    db.collection("users").doc(`${user.email}`).set({
      userId: user.uid,
      name:user.displayName,
      email:user.email,
      photo:user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      
  });
  }
  if(user && user.email==="catalin.mema@titeica.com")
  {
    return(
      <Router>
      <Route path='/' exact>
        <AdminPage />
        </Route>
        <Route exact path="/comentarii/:emaisl" component={ComentariiPostateDeUtilizatori}/>
     </Router>
    )
  }
  return (
    <div className="App">
      <Router>
      <Switch>
        {!user ? (
          <Route  >
            <Redirect to='/'/>
           <LoginScreen />
          </Route>
        ):(
        <>
        <StareInformatii>
          <Aspect>
          <Route path='/' exact>
            <PaginaPrincipala />
          </Route>
          <Route exact path="/movie/:id" component={DetaliiFilm}/>
          <Route exact path="/tv/:id" component={DetaliiSerial}/>
          <Route  path="/actor/:id" exact component={DetaliiActor}/>
          <Route  path="/genre/movie/:nume/:id" exact component={FilmeGen}/>
          <Route  path="/genre/tv/:nume/:id" exact component={SerialeGen}/>
          <Route exact path="/movie/cast_crew/:id" component={CastCrew}/>
          <Route exact path="/tv/cast_crew/:id" component={CastCrewTv}/>
          <Route exact path="/watchlist">
            <Watchlist email={user.email} />
          </Route>
          <Route exact path="/actors">
            <FavActors email={user.email} />
          </Route>
          <Route exact path="/watched">
            <Watched  email={user.email}/>
          </Route>
          <Route exact path="/Favorites_Episodes">
            <FavEpisodes  email={user.email}/>
          </Route>
          <Route exact path="/movies" component={Filme}/>
          <Route exact path="/series/" component={Seriale}/>
          <Route exact path="/actors_list" component={Actori}/>
          <Route exact path="/trendingThisWeek" component={TrendingAllWeek}/>
          <Route exact path="/movie/images/:id" component={ImaginiFilm}/>
          <Route exact path="/tv/images/:id" component={ImaginiSerial}/>
        <Route exact path="/tv/seasons/:id/season=:nr_sezon" component={Sezoane}/>
        <Route exact path="/tv/seasons/:id/season=:nr_season/episode=:episode" component={EpisodSerial}/>
        <Route exact path="/tv/images/:id/season=:nr_season/episode=:episode" component={ImaginiEpisodeSerial}/>    
     </Aspect>
     </StareInformatii>
    </>
      )}
      </Switch>
  </Router></div>
  );
}

export default App;

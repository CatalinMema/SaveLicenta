import React from 'react'
import './style.css';
const date=[
  {
    "id": 1,
    "Titlu": "Explore the world of movies and shows",
    "Descriere": "Decide what to watch",
    "imagine": "imagini/joker1.jpg",
    "alt": "a",
    "directie": "row"
  },
  {
    "id": 2,
    "Titlu": "Find the best movie or series",
    "Descriere": "This site includes movies, TV series and cast members",
    "imagine": "imagini/moneyHeist.jpg",
    "alt": "b",
    "directie": "row-reverse"
  },
  {
    "id": 3,
    "Titlu": "Share your knowledge and opinions with other users",
    "Descriere": "Write your thoughts on movies, series, episodes or actors",
    "imagine": "imagini/got.jpg",
    "alt": "b",
    "directie": "row"
  }
]
function Functii  ()  {
    return (
        <div>
                <div className="element_fct">
                <div className="detalii_fct">
                <div className="coloana_fct">
                <h1 className="titlu_fct">{date[0].Titlu}</h1>
                <h2 className="descriere_fct">{date[0].Descriere}</h2>
                </div>
                <div className="coloana_fct">
                <img className="imagine_film" 
          style={{
            border:"5px solid black",
            maxWidth: "100%",
          height: "auto",
                    borderRadius: "8%",
                    }} src={date[0].imagine} alt={date[0].alt} />
            </div>
                   
        </div>
        </div>
                
    

         
                <div className="element_fct">
                <div className="detalii1_fct">
                <div className="coloana_fct">
                <h1 className="titlu_fct">{date[1].Titlu}</h1>
                <h2 className="descriere_fct">{date[1].Descriere}</h2>
                </div>
                <div className="coloana_fct">
                <img className="imagine_film" 
          style={{
            border:"5px solid black",
            maxWidth: "100%",
          height: "auto",
                    borderRadius: "8%",
                    }} src={date[1].imagine} alt={date[1].alt} />
            </div>
                   
        </div>
        </div>
                
       
    
                <div className="element_fct">
                <div className="detalii_fct">
                <div className="coloana_fct">
                <h1 className="titlu_fct">{date[2].Titlu}</h1>
                <h2 className="descriere_fct">{date[2].Descriere}</h2>
                </div>
                <div className="coloana_fct">
                <img className="imagine_film" 
          style={{
            border:"5px solid black",
            maxWidth: "100%",
          height: "auto",
                    borderRadius: "8%",
                    }} src={date[2].imagine} alt={date[2].alt} />
            </div>
                   
        </div>
        </div>
                
  

        </div>
    )
}

export default Functii;


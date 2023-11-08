import React, { useEffect } from 'react'
import Axios from 'axios';
import { apiKey } from '../App';
import { faFilm as filmIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home() {

  return (
    <React.Fragment>
        <div className="row align-items-center bg-light" style={{height:"690px"}}>
            <div className="col d-grid justify-content-center" style={{opacity:"0.2", fontWeight:"800", fontSize:"1.1rem"}}>
                <FontAwesomeIcon style={{fontSize:"10rem"}} icon={filmIcon} />
                <p className="text-center">Nothing to show</p>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Home


/*
Poster
: 
"https://m.media-amazon.com/images/M/MV5BZjA3OTUxNTktN2FlNC00NGUyLWI1NDktY2FlZTc5MDlmOGFhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
Title
: 
"Ali"
Type
: 
"movie"
Year
: 
"2001"
imdbID
: 
"tt0248667"
      */
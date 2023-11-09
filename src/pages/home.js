import React, { useEffect } from 'react'
import Axios from 'axios';
import { apiKey } from '../App';
import { faFilm as filmIcon, faClose as closeIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

function Home() {

    const listSelector = useSelector((state) => state.search)

  return (
    <React.Fragment>
        <div className="fulid-container">

            {(listSelector.list.length === 0 && listSelector.haveResult === true ) && <div className="d-grid justify-content-center" style={{opacity:"0.2", fontWeight:"800", fontSize:"2vh"}}>
                <FontAwesomeIcon className="no-data-icon" style={{fontSize:"15vh"}} icon={filmIcon} />
                <p className="text-center">Nothing to show</p>
            </div>}

            {(listSelector.list.length > 0) && <React.Fragment>
                {listSelector.list.map((data, index) => {
                    return (
                        <div>
                            <figure>
                                <img src={data.Poster} />
                            </figure>
                            <h1>{data.Title}</h1>
                            <p>Type: {data.Type}</p>
                            <p>Year: {data.Year}</p>
                            <p>imdbID: {data.imdbID}</p>
                            <br/><br/>
                        </div>
                    )
                })}
            </React.Fragment>}

            {(listSelector.haveResult === false) && <div className="d-grid justify-content-center" style={{opacity:"0.2", fontWeight:"800", fontSize:"2vh"}}>
                <FontAwesomeIcon className="no-data-icon" style={{fontSize:"15vh"}} icon={closeIcon} />
                <p className="text-center">Not Found !</p>
            </div>}

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
import React, { useEffect, useState } from 'react'
import { apiKey } from '../App';
import OwlCarousel from 'react-owl-carousel';
import Axios from 'axios';
import { faListUl as listIcon, faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const crouselOptions = {
    margin: 20,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    nav: false,
    dots: false,
    loop: true,
    autoplay: true,
    autoplaySpeed: 4000,
    autoplayTimeout: 3000,
};

function Nav() {

    const [movieList, setMovieList] = useState([
        {Poster: 'https://m.media-amazon.com/images/M/MV5BMjA5NzUwODExM15BMl5BanBnXkFtZTgwNjM0MzE4NjE@._V1_SX300.jpg'},
        {Poster: "https://m.media-amazon.com/images/M/MV5BODJiNmU0YzgtMGU1MS00M2YzLWI1NDctOGQwYWRiODZkM2YwXkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg"},
        {Poster: "https://m.media-amazon.com/images/M/MV5BZmQ3Mzg3YjgtNTA1Zi00ODgyLTkyZGUtYTE5NDA5ZmI4NjI1L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg"},
        {Poster: 'https://m.media-amazon.com/images/M/MV5BMTU0NDc5NjgzNl5BMl5BanBnXkFtZTcwNzc0NDIzMw@@._V1_SX300.jpg'},
        {Poster: 'https://m.media-amazon.com/images/M/MV5BZDg0MWNmNjktMGEwZC00ZDlmLWI1MTUtMDBmNjQzMWM2NjBjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'},
        {Poster: 'https://m.media-amazon.com/images/M/MV5BZTk5YmEwOTMtZjIzOC00MjFhLWFhN2ItNDgzZDhhYjVjOWRjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'},
        {Poster: 'https://m.media-amazon.com/images/M/MV5BMTJhYjI1N2ItM2E4MC00ZmYzLTk2YzYtNTE5YTM1MDU0NjRiXkEyXkFqcGdeQXVyMTMxNjYyMTgw._V1_SX300.jpg'},
        {Poster: "https://m.media-amazon.com/images/M/MV5BNjY3NjE3YTgtMWVmMS00YmQ0LWIxMzMtMmEyM2VlZTc0M2M0XkEyXkFqcGdeQXVyNjczMzgwMDg@._V1_SX300.jpg"},
        {Poster: "https://m.media-amazon.com/images/M/MV5BMGZkNjMxYWItYzRjZC00MzA2LWE0YWYtYjIzMmU2MTJiNmEyXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg"},
        {Poster: 'https://m.media-amazon.com/images/M/MV5BMTg4OTk0NDc3MV5BMl5BanBnXkFtZTcwOTU0ODc0MQ@@._V1_SX300.jpg'},
    ]);
    
    useEffect(()=>{
        /* Axios.get(`http://www.omdbapi.com/?s=${"ali"}&apikey=${apiKey}`).then((res) => {
            setMovieList(res.data.Search);
            console.log(res.data.Search);
        }) */
      }, [])

      

    return (
        <React.Fragment>
            
            <div className="the-nav">
            
                <div className="nav-cover row d-none d-md-block m-0">
                    <div className="row align-items-end h-50 m-0">
                        <div className="col-6">
                            <h1 className="text-start ms-lg-5 no-select">Looking for a movie ?</h1>
                        </div>

                        <div className="col-6 d-inline-flex justify-content-end">
                            <div className="d-inline-flex align-items-center mouse-pointer hover-anim me-lg-5">
                                <h3 className="me-3" style={{width:"fit-content"}}>Watchlist</h3>
                                <FontAwesomeIcon style={{width:"fit-content", fontSize:"1.5rem"}} icon={listIcon} />
                            </div>
                        </div>
                        
                    </div>

                    <div className="d-flex h-50 align-items-center justify-content-center">
                        <div class="d-flex h-25 w-50 search-bar align-items-center">
                            <FontAwesomeIcon className='ms-2' style={{fontSize:"1.3rem"}} icon={searchIcon} />
                            <input class="form-control me-2" type="search" placeholder="Search a movie" aria-label="Search"/>
                            <button className="search-btn">Search</button>
                        </div>
                    </div>
                </div>

                <div className='nav-bg'>
                    <OwlCarousel className="owl-theme" {...crouselOptions} >
                        {movieList.map((data, index) => {
                            return (
                                <figure>
                                    <img src={data.Poster} />
                                </figure>
                            )
                        })}
                    </OwlCarousel>
                </div>
                
            </div>
            
            
        </React.Fragment>
    )
}

export default Nav

import React, { useEffect, useRef, useState } from 'react'
import { apiKey } from '../App';
import OwlCarousel from 'react-owl-carousel';
import Axios from 'axios';
import { faHeart as heartIcon , faSearch as searchIcon, faHome as homeIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { clearList, setList, setResult } from './store';
import { useNavigate } from 'react-router-dom';

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

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const [seed, setSeed] = useState(1);

    function refreshNavBgMovies() {
        setSeed(Math.random());
    }

    const [movieList, setMovieList] = useState([]);

    const randomNames = ["grow", "holiday", "hacker", "day", "night", "movie"]

    useEffect(()=>{
         Axios.get(`https://www.omdbapi.com/?s=${randomNames[getRandomInt(5)]}&apikey=${apiKey}`).then((res) => {
            setMovieList(res.data.Search);
            refreshNavBgMovies();
        })
      }, [])

      const searchRef = useRef();
      const searchRefLittle = useRef();
      const dispatch = useDispatch();
      const navigateTo = useNavigate();

      function searchSubmit(event) {
        event.preventDefault();
        let nowRef = NaN;
        if ( searchRefLittle.current.value.length > 0 ) {
            nowRef = searchRefLittle;
        } else if ( searchRef.current.value.length > 0 )  {
            nowRef = searchRef;
        } else {
            dispatch(setList({list: [], page:1, totalResult: 0, value: ""}));
            dispatch(setResult({result: true}));
            return false
        }
        Axios.get(`https://www.omdbapi.com/?s=${nowRef.current.value}&apikey=${apiKey}`).then((res) => {
            if (res.data.Response === "True") {
                dispatch(setList({list: res.data.Search, page:1, totalResult: res.data.totalResults, value: nowRef.current.value}));
                dispatch(setResult({result: true}));
            } else {
                dispatch(clearList());
                dispatch(setResult({result: false}));
            }
        })
      }

    return (
        <React.Fragment>
            
            <div className="the-nav">
            
                <div className="nav-cover d-md-none m-0">

                    <div className="row align-items-center h-75 m-0">
                        <div className="col-12 d-inline-flex justify-content-center pt-5">
                            <h1 className="text-start ms-lg-5 no-select">Looking for a movie ?</h1>
                        </div>
                        <div className="col-12 d-inline-flex justify-content-center pb-3">
                            <div onClick={()=>{navigateTo("/Movie-Land")}} style={{direction:"rtl"}} className="d-inline-flex me-5 align-items-center mouse-pointer hover-anim">
                                <FontAwesomeIcon style={{fontSize:"1.5rem"}} icon={homeIcon} />
                                <h3 className="me-3">Main</h3>
                            </div>
                            <div onClick={()=>{navigateTo("/Movie-Land/favorites")}} className="d-inline-flex align-items-center mouse-pointer hover-anim me-lg-5">
                                <h3 className="me-3">Favorites</h3>
                                <FontAwesomeIcon style={{fontSize:"1.5rem"}} icon={heartIcon} />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex h-25 align-items-center justify-content-center pb-2">
                        <form onSubmit={searchSubmit} className="d-flex h-75 w-75 search-bar align-items-center">
                            <FontAwesomeIcon className='ms-2' style={{fontSize:"1.3rem"}} icon={searchIcon} />
                            <input ref={searchRef} className="form-control me-2" type="search" placeholder="Search a movie" aria-label="Search"/>
                            <button className="search-btn">Search</button>
                        </form>
                    </div>

                </div>

                <div className="nav-cover row d-none d-md-block m-0">

                    <div className="row align-items-end h-50 m-0">
                        <div className="col-6">
                            <h1 className="text-start pb-2 ms-lg-5 no-select">Looking for a movie ?</h1>
                        </div>
                        <div className="col-6 d-grid justify-content-end">
                            <div onClick={()=>{navigateTo("/Movie-Land/favorites")}} className="d-inline-flex align-items-center mouse-pointer hover-anim me-lg-5">
                                <h3 className="me-3" style={{width:"fit-content"}}>Favorites</h3>
                                <FontAwesomeIcon style={{width:"fit-content", fontSize:"1.5rem"}} icon={heartIcon} />
                            </div>
                            <div onClick={()=>{navigateTo("/Movie-Land")}} style={{direction:"rtl"}} className="d-inline-flex align-items-center mouse-pointer hover-anim me-lg-5">
                                <FontAwesomeIcon style={{width:"fit-content", fontSize:"1.5rem"}} icon={homeIcon} />
                                <h3 className="me-3" style={{width:"fit-content"}}>Main</h3>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex h-50 align-items-center justify-content-center">
                        <form onSubmit={searchSubmit} className="d-flex h-25 w-50 search-bar align-items-center">
                            <FontAwesomeIcon className='ms-2' style={{fontSize:"1.3rem"}} icon={searchIcon} />
                            <input ref={searchRefLittle} className="form-control me-2" type="search" placeholder="Search a movie" aria-label="Search"/>
                            <button className="search-btn">Search</button>
                        </form>
                    </div>

                </div>

                <div key={seed} className='nav-bg'>
                    <OwlCarousel className="owl-theme" {...crouselOptions} >
                        {movieList.map((data, index) => {
                            return (
                                <figure key={index}>
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

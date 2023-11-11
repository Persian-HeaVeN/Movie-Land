import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { apiKey } from '../App';
import { faFilm as filmIcon, faClose as closeIcon, faHeart as heartIcon, faHeartCirclePlus as heartPlusIcon, faHeartCircleMinus as heartMinusIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "react-bootstrap/Pagination"
import { setList, setResult } from '../components/store';
import Modal from "react-bootstrap/Modal"
import { isFavorite, removeFavorite, setFavorite } from '../components/favorites';


function Home() {

    const listSelector = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const [detailModal, setDetailModal] = useState({show: false});

    const controller = new AbortController();

    function showMovieModal(imdbID) {

        document.querySelector("#loader-modal").style.display = "flex"

        Axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`, {signal: controller.signal}).then((res) => {
            setDetailModal({...detailModal, show:true, datas: res.data})
            document.querySelector("#loader-modal").style.display = "none"
            document.querySelector("#cancel-btn").style.display = "none";
        }).catch(function (thrown) {
            console.log(thrown.message);
        });

        setTimeout(() => {
            if ( document.querySelector("#loader-modal").style.display === "flex" ) {
                document.querySelector("#cancel-btn").style.display = "block"
            }
        }, 5000);

    }
    
    function cancelRequest() {
        controller.abort();
        document.querySelector("#loader-modal").style.display = "none";
        document.querySelector("#cancel-btn").style.display = "none";
    }

    function pageChange(newPage) {
        Axios.get(`https://www.omdbapi.com/?s=${listSelector.value}&apikey=${apiKey}&page=${parseInt(newPage)}`).then((res) => {
            dispatch(setList({page: parseInt(newPage), value: listSelector.value, list: res.data.Search, totalResult: res.data.totalResults}));
            dispatch(setResult({result: true}));
        })
    }

    function CustomPagination() {
        if ( listSelector.totalResult <= 10 ) {

            return (
                <React.Fragment>
                    <Pagination.First disabled />
                    <Pagination.Prev disabled />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Next disabled />
                    <Pagination.Last disabled />
                </React.Fragment>
            )
        } else if ( listSelector.totalResult <= 50 ) {

            const pagItems = [];

            for (let index = 1; index <= Math.ceil(listSelector.totalResult/10); index++) {
                pagItems.push(<Pagination.Item key={index} onClick={()=> {pageChange(index)}} active={ listSelector.page == index && true } >{index}</Pagination.Item>)
            }

            return (
                <React.Fragment>
                    <Pagination.First onClick={()=> {pageChange(1)}} />
                    <Pagination.Prev onClick={()=> {pageChange(listSelector.page - 1)}} disabled={listSelector.page === 1 && true} />
                    
                    {pagItems}

                    <Pagination.Next onClick={()=> {pageChange(listSelector.page + 1)}} disabled={ Math.ceil(listSelector.totalResult/10) === listSelector.page && true } />
                    <Pagination.Last onClick={()=> {pageChange(Math.ceil(listSelector.totalResult/10))}} />
                </React.Fragment>
            )
        } else {

            const firstItems = [];
            const lastItems = [];

            for (let index = 1; index <= 3; index++) {
                firstItems.push(<Pagination.Item key={index} onClick={()=> {pageChange(index)}} active={ listSelector.page == index && true } >{index}</Pagination.Item>)
            }

            for (let index = 1; index <= Math.ceil(listSelector.totalResult/10); index++) {
                if ( index > Math.ceil(listSelector.totalResult/10) - 3 ) {
                    lastItems.push(<Pagination.Item key={index} onClick={()=> {pageChange(index)}} active={ listSelector.page == index && true } >{index}</Pagination.Item>)
                }
            }

            return (
                <React.Fragment>
                    <Pagination.First onClick={()=> {pageChange(1)}} />
                    <Pagination.Prev onClick={()=> {pageChange(listSelector.page - 1)}} disabled={listSelector.page === 1 && true} />
                    
                    {firstItems}
                    <Pagination.Ellipsis disabled />
                    { ( listSelector.page > 3 && listSelector.page <= Math.ceil(listSelector.totalResult/10) - 3 ) && <Pagination.Item active>{listSelector.page}</Pagination.Item>}
                    <Pagination.Ellipsis disabled />
                    {lastItems}

                    <Pagination.Next onClick={()=> {pageChange(listSelector.page + 1)}} disabled={ Math.ceil(listSelector.totalResult/10) === listSelector.page && true } />
                    <Pagination.Last onClick={()=> {pageChange(Math.ceil(listSelector.totalResult/10))}} />
                </React.Fragment>
            )

        }
    }

    const [seed, setSeed] = useState(1);

    function refreshFavoriteIcon() {
        setSeed(Math.random());
    }

    /*
        Actors: "Cauã Reymond, Humberto Martins, Sophie Charlotte"
        Awards: "1 win & 16 nominations"
        BoxOffice: "N/A"
        Country: "Brazil"
        DVD: "N/A"
        Director: "Homero Olivetto"
        Genre: "Action, Adventure, Drama"
        Language: "Portuguese"
        Metascore: "N/A"
        Plot: "In an arid and poor region of Brazil, bikers search for a miracle to make it rain and save the land, risking their lives."
        Poster: "https://m.media-amazon.com/images/M/MV5BMjU3MTA0NzcwMV5BMl5BanBnXkFtZTgwNzA1MzYwNzE@._V1_SX300.jpg"
        Production: "N/A"
        Rated: "N/A"
        Ratings:  [{…}]
        Released: "21 Jan 2016"
        Response: "True"
        Runtime: "87 min"
        Title: "Reza a Lenda"
        Type: "movie"
        Website: "N/A"
        Writer: "Homero Olivetto, Patrícia Andrade, Newton Cannito"
        Year: "2016"
        imdbID: "tt5026038"
        imdbRating: "5.3"
        imdbVotes: "595"
    */

  return (
    <React.Fragment>

        <div id="loader-modal" className="loading-modal justify-content-center align-items-center">
            <div className="d-grid gap-3">
                <span className="custom-spiner mx-auto"></span>
                <button onClick={cancelRequest} id="cancel-btn">Cancel</button>
            </div>
        </div>

        {detailModal.datas && <Modal size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={detailModal.show} onHide={() => {setDetailModal({show:false})}} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    {detailModal.datas.Title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-grid d-lg-flex align-items-center">
                <img className="detail-img" src={detailModal.datas.Poster} />
                <div className="detail-texts ">
                    <div style={{float:"right", lineHeight:"0"}}>
                        <p className="text-center" style={{color:"red"}}> <big>{detailModal.datas.imdbRating}</big> / <small>10</small> </p>
                        <p style={{borderBottom:"1px solid #cccccc"}}></p>
                        <p>{detailModal.datas.imdbVotes} Votes</p>
                        <p style={{paddingTop:"5px", textAlign:"center"}}><strong>IMDB</strong></p>
                    </div>
                    <p> <strong>Country:</strong> {detailModal.datas.Country} </p>
                    <p> <strong>Language:</strong> {detailModal.datas.Language} </p>
                    <p> <strong>Director:</strong> {detailModal.datas.Director} </p>
                    <p> <strong>Release date:</strong> {detailModal.datas.Released} </p>
                    <p> <strong>Time:</strong> {detailModal.datas.Runtime} </p>
                    <p> <strong>Genre:</strong> {detailModal.datas.Genre} </p>
                    <p> <strong>BoxOffice:</strong> {detailModal.datas.BoxOffice} </p>
                    <p> <strong>Actors:</strong> {detailModal.datas.Actors} </p>
                    <p> <strong>Plot:</strong> {detailModal.datas.Plot}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <FontAwesomeIcon key={seed} onClick={()=>{ isFavorite(detailModal.datas.imdbID) === true ? removeFavorite(detailModal.datas.imdbID) : setFavorite(detailModal.datas) ; refreshFavoriteIcon() }} style={{fontSize:"2rem", color:"red"}} className="mx-auto hover-anim" icon={ isFavorite(detailModal.datas.imdbID) === true ? heartMinusIcon : heartPlusIcon } />
            </Modal.Footer>
        </Modal>}

        <div className="fulid-container pt-5 px-5" style={{backgroundColor:"#cccccc"}}>

            {(listSelector.list.length === 0 && listSelector.haveResult === true ) && <div className="d-grid justify-content-center no-data-icon" style={{opacity:"0.2", fontWeight:"800", fontSize:"2vh"}}>
                <FontAwesomeIcon style={{fontSize:"15vh", margin:"auto"}} icon={filmIcon} />
                <p className="text-center">Nothing to show</p>
            </div>}

            {(listSelector.list.length > 0) && <div className="container-fulid pb-3">

                <div className="row justify-content-center">
                    {listSelector.list.map((data, index) => {
                        return (
                            <div style={{width:"15rem"}} className="card movie-card justify-content-center" key={index}>
                                <img className="card-img-top movie-image" src={data.Poster} />
                                <div className="card-body">
                                    <h5 style={{fontWeight:"800"}} className="card-title text-center warp-hide-text">{data.Title}</h5>
                                    <p className="card-text" style={{width:"fit-content", float:"left"}}>{data.Year}</p>
                                    <p style={{width:"fit-content", float:"right"}}>{data.Type}</p>
                                    <div className="clearfix"></div>
                                    <button onClick={()=> {showMovieModal(data.imdbID)}} className="detail-btn">See full details</button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Pagination size={ window.innerWidth <= 500 ? "sm" : "" } className="justify-content-center">
                    <CustomPagination>
                        
                    </CustomPagination>
                </Pagination>
                
            </div>}

            {(listSelector.haveResult === false) && <div className="d-grid justify-content-center no-data-icon" style={{opacity:"0.2", fontWeight:"800", fontSize:"2vh"}}>
                <FontAwesomeIcon style={{fontSize:"15vh", margin:"auto"}} icon={closeIcon} />
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
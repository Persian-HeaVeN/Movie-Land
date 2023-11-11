
import React, { useState } from 'react'
import { getFavorites, removeFavorite } from '../components/favorites'
import { faFilm as filmIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { apiKey } from '../App';
import Modal from "react-bootstrap/Modal"

export function Favorites() {

    const [detailModal, setDetailModal] = useState({show: false});
    const favoriteList = getFavorites();
    const controller = new AbortController();

    const [seed, setSeed] = useState(1);

    function refreshFavoriteList() {
        setSeed(Math.random());
    }

    function cancelRequest() {
        controller.abort();
        document.querySelector("#loader-modal").style.display = "none";
        document.querySelector("#cancel-btn").style.display = "none";
    }

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
            </Modal>}

            <div className="fulid-container pt-5 px-5">

                {(favoriteList.length === 0) && <div className="d-grid justify-content-center no-data-icon" style={{opacity:"0.2", fontWeight:"800", fontSize:"2vh"}}>
                    <FontAwesomeIcon style={{fontSize:"15vh", margin:"auto"}} icon={filmIcon} />
                    <p className="text-center">You have no favorites</p>
                </div>}

                {(favoriteList.length > 0) && <div className="container-fulid pb-3">

                    <div key={seed} className="row justify-content-center">
                        {favoriteList.map((data, index) => {
                            return (
                                <div style={{width:"15rem"}} className="card movie-card justify-content-center" key={index}>
                                    <img className="card-img-top movie-image" src={data.Poster} />
                                    <div className="card-body">
                                        <h5 style={{fontWeight:"800"}} className="card-title text-center warp-hide-text">{data.Title}</h5>
                                        <p className="card-text" style={{width:"fit-content", float:"left"}}>{data.Year}</p>
                                        <p style={{width:"fit-content", float:"right"}}>{data.Type}</p>
                                        <div className="clearfix"></div>
                                        <button onClick={()=> {showMovieModal(data.imdbID)}} className="detail-btn mb-2">See full details</button>
                                        <button onClick={()=> {removeFavorite(data.imdbID); refreshFavoriteList()}} className="detail-btn">Remove</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>}

            </div>

        </React.Fragment>
    )
}

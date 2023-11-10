import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { apiKey } from '../App';
import { faFilm as filmIcon, faClose as closeIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "react-bootstrap/Pagination"
import { setList, setResult } from '../components/store';
import Modal from "react-bootstrap/Modal"


function Home() {

    const listSelector = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const [detailModal, setDetailModal] = useState({show: false});

    function CustomModal(props) {
        
    }

    function getMovieDetail(imdbID) {
        Axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`).then((res) => {
            console.log(res.data);
        })
    }

    //getMovieDetail("tt5026038")

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
    
    function pageChange(newPage) {
        Axios.get(`http://www.omdbapi.com/?s=${listSelector.value}&apikey=${apiKey}&page=${parseInt(newPage)}`).then((res) => {
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

  return (
    <React.Fragment>

        <Modal size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={detailModal.show} onHide={() => {setDetailModal({...detailModal, show:false})}} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in.
                </p>
            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
        </Modal>

        <div className="fulid-container pt-5 px-5" style={{backgroundColor:"#cccccc"}}>

            {(listSelector.list.length === 0 && listSelector.haveResult === true ) && <div className="d-grid justify-content-center no-data-icon" style={{opacity:"0.2", fontWeight:"800", fontSize:"2vh"}}>
                <FontAwesomeIcon style={{fontSize:"15vh"}} icon={filmIcon} />
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
                                    <button className="detail-btn">See full details</button>
                                </div>
                                {/* <p>imdbID: {data.imdbID}</p> */}
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
                <FontAwesomeIcon style={{fontSize:"15vh"}} icon={closeIcon} />
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
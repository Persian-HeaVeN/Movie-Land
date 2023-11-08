import React, { useEffect, useState } from 'react'
import Axios from "axios";

const apiKey = "38a6fdde";

function App() {

  useEffect(()=>{
    Axios.get(`http://www.omdbapi.com/?i=${"tt0248667"}&apikey=${apiKey}`).then((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <div>
      App
    </div>
  )
}

export default App


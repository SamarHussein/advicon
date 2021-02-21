const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();



let search;
const url= 'http://www.omdbapi.com/';
// post route 
router.post('/', async (req, res, next)=> {

  if(typeof req.body=== 'undefined'){
    res.status(400).json({ error: 'missing parameter search', data: null }); 
    return;
  }

  search = req.body;
  res.status(200).json({ error: null, data: search }); 

});

// GET home page
router.get('/', async (req, res, next)=> {
  try{
    const response = await axios.get( url,
    {
      params: {
          apikey: process.env.API_KEY,
          s: search.s
      }
    });
        const movieList = response.data.Search.map( movie => {
          const {Year, Title, imdbID, Poster, Type} = movie;
          const timeSpan = `${2021 - parseInt(Year)} years`;
        
          return { id: imdbID, Title, Poster, timeSpan} 
        })
        res.send(movieList)
  }catch(e) {
    console.log(e)
  }
});


module.exports = router;

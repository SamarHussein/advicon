const express = require('express');
const router = express.Router();
const axios = require('axios');
//const optimizelyClientInstance = require('./optimizely');


/* optimizelyClientInstance.onReady().then(() => {
  var enabled = optimizelyClientInstance.isFeatureEnabled('hasAccess', 'user123');
  console.log('enables is ',enabled)
  if (enabled) {
    console.log('Feature is ON!');
    //res.send(movieList)
  } else {
    console.log('Feature is off.');
    res.send('HAs no access')
  } 
});  */

let id;
const url = 'http://www.omdbapi.com/';

//post route for movie  /api/movie
router.post('/', async (req, res, next)=> {
  if(typeof req.body=== 'undefined'){
    res.status(400).json({ error: 'missing parameter search', data: null }); 
    return;
  }

  id = req.body;
  res.status(200).json({ error: null, data: id }); 

});

// GET route for a movie  /api/movie
router.get(`/`, async (req, res, next) =>{
  try {
    const response = await axios.get(url, {
        params: {
            apikey: process.env.API_KEY,
            i: id.i
        }
      });
      const movie = response.data
      res.send(movie)
  }catch(e) {
    console.log(e)
  }
});

module.exports = router;


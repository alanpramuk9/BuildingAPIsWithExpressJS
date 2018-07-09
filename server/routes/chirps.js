const express = require('express');
const chirpsStore = require('../chirpstore');

let router = express.Router();

//retrive chirp
router.get('/:id?', (req, res) => {
    let id = req.params.id
    if(id) {
        res.json(chirpsStore.GetChirp(id));
    } else {    
        res.send(chirpsStore.GetChirps());
    }
});

//save chirp
router.post('/', (req,res) => {
    console.log(req.body);
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.delete('/:id?', (req, res) => {
    //delete resource
    let id = req.params.id
    chirpsStore.DeleteChirp(id);
    res.sendStatus(200);
})  

router.put('/:id', (req, res) => {
    console.log('updating some stuff');
    console.log(req.body);
    let id = req.params.id;
    let chirp = req.body;
    chirpsStore.UpdateChirp(id, chirp);
    res.send('success').status(200);
})





module.exports = router;
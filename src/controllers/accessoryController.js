const router = require('express').Router();
const accessoryService = require('./../services/accessoryService.js');

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', (req, res) => {
    let { name, description, imageUrl } = req.body;
    console.log(name, description, imageUrl);
    accessoryService.create(name, description, imageUrl)
        .then(() => {
            res.redirect('/');
        });
})

module.exports = router;
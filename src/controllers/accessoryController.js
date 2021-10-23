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
        })
        .catch(error => {
            let errors = Object.keys(error.errors).map(v => error.errors[v].message);
            res.status(400).render('accessory/create', { error: errors });
        });
})

module.exports = router;
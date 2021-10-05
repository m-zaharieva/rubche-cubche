const express = require('express');
const router = express.Router();

const getCreateCudePage = (req, res) => {
    res.render('create');
}

const createCube = (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;
    

}

router.get('/create', getCreateCudePage);
router.post('/create', createCube);

module.exports = router;




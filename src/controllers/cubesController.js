const express = require('express');
const router = express.Router();

const getCreateCudePage = (req, res) => {
    res.render('create');
}

router.get('/create', getCreateCudePage);

module.exports = router;




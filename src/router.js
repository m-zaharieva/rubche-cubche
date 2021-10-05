const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.write('Home Page Here');
    res.end();
});

module.exports = router;


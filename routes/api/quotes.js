// require dependencies
const express = require('express');
// define router
const router = express.Router();

// @route  GET api/quotes/test
// @desc   Testing quotes route
// @access Public
router.get('/test', (req, res) => {
    res.send('Quotes routes are working!');
});

// export router
module.exports = router;
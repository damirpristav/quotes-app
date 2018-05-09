// require dependencies
const express = require('express');
// define router
const router = express.Router();

// @route  GET api/users/test
// @desc   Testing users route
// @access Public
router.get('/test', (req, res) => {
    res.send('Users routes are working!');
});

// export router
module.exports = router;


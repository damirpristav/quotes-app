// require dependencies
const express = require('express');
// define router
const router = express.Router();

// @route  GET api/profile/test
// @desc   Testing profile route
// @access Public
router.get('/test', (req, res) => {
    res.send('Profile routes are working!');
});

// export router
module.exports = router;